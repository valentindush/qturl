"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import axios from "@/lib/axios"
import { type User, getUser, logout as authLogout } from "@/lib/auth"

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, username: string, password: string) => Promise<void>
    logout: () => void
    setTokensFromOAuth: (accessToken: string, refreshToken: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    // Use useCallback to memoize these functions so they don't change on every render
    const login = useCallback(async (email: string, password: string) => {
        try {
            const response = await axios.post("/auth/login", { email, password })
            const { accessToken, refreshToken } = response.data

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)

            const currentUser = getUser()
            setUser(currentUser)

            router.push("/dashboard")
        } catch (error) {
            throw error
        }
    }, [router]);

    const register = useCallback(async (email: string, username: string, password: string) => {
        try {
            await axios.post("/auth/register", { email, username, password })
            router.push("/auth/verify")
        } catch (error) {
            throw error
        }
    }, [router]);

    const handleLogout = useCallback(() => {
        authLogout()
        setUser(null)
        router.push("/login")
    }, [router]);

    const setTokensFromOAuth = useCallback((accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)

        const currentUser = getUser()
        setUser(currentUser)

        router.push("/dashboard")
    }, [router]);

    // Separate initial auth check into its own effect with no dependencies
    useEffect(() => {
        const checkAuth = () => {
            try {
                const currentUser = getUser()
                setUser(currentUser)
            } catch (error) {
                console.error("Error getting user:", error)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, []);

    // Create a stable context value that won't change on every render
    const contextValue = {
        user,
        loading,
        login,
        register,
        logout: handleLogout,
        setTokensFromOAuth,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
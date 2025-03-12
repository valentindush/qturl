"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "@/lib/axios"
import { type User, getUser, logout } from "@/lib/auth"

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

    useEffect(() => {
        // Check if user is logged in on initial load
        const checkAuth = () => {
            const currentUser = getUser()
            setUser(currentUser)
            setLoading(false)
        }

        checkAuth()
    }, [])

    const login = async (email: string, password: string) => {
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
    }

    const register = async (email: string, username: string, password: string) => {
        try {
            await axios.post("/auth/register", { email, username, password })
            router.push("/auth/verify")
        } catch (error) {
            throw error
        }
    }

    const setTokensFromOAuth = (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)

        const currentUser = getUser()
        setUser(currentUser)

        router.push("/dashboard")
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                setTokensFromOAuth,
            }}
        >
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


import { jwtDecode } from "jwt-decode"

export interface User {
    id: string
    username: string
    email: string
}

export interface DecodedToken {
    userId: string
    username: string
    email: string
    exp: number
}

export const getUser = (): User | null => {
    if (typeof window === "undefined") {
        return null
    }

    const accessToken = localStorage.getItem("accessToken")
    if (!accessToken) {
        return null
    }

    try {
        const decoded = jwtDecode<DecodedToken>(accessToken)

        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime) {
            return null
        }

        return {
            id: decoded.userId,
            username: decoded.username,
            email: decoded.email,
        }
    } catch (error) {
        return null
    }
}

export const isAuthenticated = (): boolean => {
    return getUser() !== null
}

export const logout = () => {
    if (typeof window === "undefined") {
        return
    }

    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    window.location.href = "/auth/login"
}
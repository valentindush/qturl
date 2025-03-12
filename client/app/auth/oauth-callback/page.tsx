"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

export default function OAuthCallbackPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { setTokensFromOAuth } = useAuth()

    const accessToken = searchParams.get("accessToken")
    const refreshToken = searchParams.get("refreshToken")

    useEffect(() => {
        if (accessToken && refreshToken) {
            setTokensFromOAuth(accessToken, refreshToken)
        } else {
            // If tokens are missing, redirect to login
            router.push("/auth/login")
        }
    }, [accessToken, refreshToken, setTokensFromOAuth, router])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg">Completing authentication...</p>
        </div>
    )
}
"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import axios from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function VerifyEmailPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get("token")

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState("Verifying your email...")

    useEffect(() => {
        if (token) {
            verifyEmail(token)
        } else {
            setStatus("error")
            setMessage("No verification token provided. Please check your email for the verification link.")
        }
    }, [token])

    const verifyEmail = async (token: string) => {
        try {
            await axios.get(`/auth/verify?token=${token}`)
            setStatus("success")
            setMessage("Your email has been verified successfully!")
        } catch (error) {
            setStatus("error")
            setMessage("Failed to verify your email. The token may be invalid or expired.")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
                    <CardDescription>Verify your email address to complete registration</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
                    {status === "loading" && <Loader2 className="h-16 w-16 animate-spin text-primary" />}
                    {status === "success" && <CheckCircle className="h-16 w-16 text-green-500" />}
                    {status === "error" && <XCircle className="h-16 w-16 text-red-500" />}

                    <Alert className={status === "error" ? "bg-red-50 dark:bg-red-900/20" : "bg-green-50 dark:bg-green-900/20"}>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={() => router.push("/auth/login")} disabled={status === "loading"}>
                        {status === "success" ? "Go to Login" : "Back to Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
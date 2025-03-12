"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

// Schema for request password reset
const requestResetSchema = z.object({
    email: z.string().email("Please enter a valid email"),
})

// Schema for reset password with token
const resetPasswordSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

type RequestResetFormValues = z.infer<typeof requestResetSchema>
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get("token")

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    // Form for requesting password reset
    const requestResetForm = useForm<RequestResetFormValues>({
        resolver: zodResolver(requestResetSchema),
    })

    // Form for resetting password with token
    const resetPasswordForm = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
    })

    // Handle request password reset
    const onRequestReset = async (data: RequestResetFormValues) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await axios.post("/auth/request-reset", { email: data.email })

            setSuccess('Password reset link has been sent to your email  { email: data.email }')
            setSuccess('Password reset link has been sent to your email. Please check your inbox.')
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to request password reset. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    // Handle reset password with token
    const onResetPassword = async (data: ResetPasswordFormValues) => {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await axios.post("/auth/reset-password", {
                token,
                password: data.password,
            })
            setSuccess("Your password has been reset successfully!")

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push("/auth/login")
            }, 2000)
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to reset password. The token may be invalid or expired.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">{token ? "Reset Your Password" : "Forgot Password"}</CardTitle>
                    <CardDescription>
                        {token ? "Enter your new password below" : "Enter your email and we will send you a reset link"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {success && (
                        <Alert className="mb-4 bg-green-50 dark:bg-green-900/20">
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}

                    {token ? (
                        // Reset password form
                        <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input id="password" type="password" {...resetPasswordForm.register("password")} disabled={isLoading} />
                                {resetPasswordForm.formState.errors.password && (
                                    <p className="text-sm text-red-500">{resetPasswordForm.formState.errors.password.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    {...resetPasswordForm.register("confirmPassword")}
                                    disabled={isLoading}
                                />
                                {resetPasswordForm.formState.errors.confirmPassword && (
                                    <p className="text-sm text-red-500">{resetPasswordForm.formState.errors.confirmPassword.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                        </form>
                    ) : (
                        // Request reset form
                        <form onSubmit={requestResetForm.handleSubmit(onRequestReset)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    {...requestResetForm.register("email")}
                                    disabled={isLoading}
                                />
                                {requestResetForm.formState.errors.email && (
                                    <p className="text-sm text-red-500">{requestResetForm.formState.errors.email.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                    </>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
                <CardFooter>
                    <Button variant="link" className="w-full" onClick={() => router.push("/auth/login")} disabled={isLoading}>
                        Back to Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}


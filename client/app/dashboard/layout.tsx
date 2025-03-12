import type React from "react"
import AuthGuard from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
            </div>
        </AuthGuard>
    )
}
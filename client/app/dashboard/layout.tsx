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
            <div className="">
                <Navbar />
                <main className="px-12">{children}</main>
            </div>
        </AuthGuard>
    )
}
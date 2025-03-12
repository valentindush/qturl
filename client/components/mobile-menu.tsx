"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

    const toggleSubmenu = (menu: string) => {
        setOpenSubmenu(openSubmenu === menu ? null : menu)
    }

    return (
        <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center text-white" aria-label="Toggle menu">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {isOpen && (
                <div className="absolute left-0 right-0 top-[72px] z-50 bg-[#0f1c2e] p-4">
                    <div className="space-y-4">
                        <div>
                            <button
                                onClick={() => toggleSubmenu("platform")}
                                className="flex w-full items-center justify-between py-2 text-white"
                            >
                                Platform
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${openSubmenu === "platform" ? "rotate-180" : ""}`}
                                />
                            </button>
                            {openSubmenu === "platform" && (
                                <div className="mt-2 space-y-2 pl-4">
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        URL Shortener
                                    </Link>
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        QR Code Generator
                                    </Link>
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        2D Barcodes
                                    </Link>
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        Analytics
                                    </Link>
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        Pages
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            <button
                                onClick={() => toggleSubmenu("solutions")}
                                className="flex w-full items-center justify-between py-2 text-white"
                            >
                                Solutions
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${openSubmenu === "solutions" ? "rotate-180" : ""}`}
                                />
                            </button>
                            {openSubmenu === "solutions" && (
                                <div className="mt-2 space-y-2 pl-4">
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        Enterprise
                                    </Link>
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        Small Business
                                    </Link>
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        Creators
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link href="#" className="block py-2 text-white">
                            Pricing
                        </Link>
                        <div>
                            <button
                                onClick={() => toggleSubmenu("resources")}
                                className="flex w-full items-center justify-between py-2 text-white"
                            >
                                Resources
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${openSubmenu === "resources" ? "rotate-180" : ""}`}
                                />
                            </button>
                            {openSubmenu === "resources" && (
                                <div className="mt-2 space-y-2 pl-4">
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        Resource Library
                                    </Link>
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        Blog
                                    </Link>
                                    <Link href="#" className="block py-2 text-sm text-gray-300 hover:text-white">
                                        Help Center
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="border-t border-gray-700 pt-4">
                            <Link href="#" className="block py-2 text-white">
                                Log in
                            </Link>
                            <Link
                                href="#"
                                className="mt-2 block rounded bg-white px-4 py-2 text-center text-sm font-medium text-[#0f1c2e]"
                            >
                                Sign up Free
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
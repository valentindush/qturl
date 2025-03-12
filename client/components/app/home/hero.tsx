import { ArrowRight, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {

    return (
        <main className="flex-grow bg-[#0f1c2e] px-4 pb-16 pt-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute left-0 top-1/4 h-24 w-24 opacity-20">
                <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt=""
                    width={100}
                    height={100}
                    className="h-full w-full"
                />
            </div>
            <div className="absolute right-0 bottom-1/4 h-32 w-32 opacity-20">
                <Image
                    src="/placeholder.svg?height=130&width=130"
                    alt=""
                    width={130}
                    height={130}
                    className="h-full w-full"
                />
            </div>
            <div className="absolute left-1/4 bottom-0 h-16 w-16 opacity-20">
                <Image src="/placeholder.svg?height=60&width=60" alt="" width={60} height={60} className="h-full w-full" />
            </div>

            <div className="container mx-auto max-w-5xl">
                {/* Heading */}
                <h1 className="mb-6 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                    Build stronger digital connections
                </h1>
                <p className="mx-auto mb-12 max-w-4xl text-center text-lg text-white md:text-xl">
                    Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right
                    information. Build, edit, and track everything inside the Bitly Connections Platform.
                </p>

                {/* Tabs and Form */}
                <div className="mx-auto max-w-2xl">
                    <div className="mb-4 flex justify-center space-x-2">
                        <button className="flex items-center rounded-lg bg-white px-6 py-3 font-medium text-[#0f1c2e]">
                            <LinkIcon className="mr-2 h-5 w-5" />
                            Short link
                        </button>
                        <button className="flex items-center rounded-lg bg-transparent px-6 py-3 font-medium text-white hover:bg-white/10">
                            <div className="mr-2 h-5 w-5">
                                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <rect x="9" y="9" width="6" height="6" fill="currentColor" />
                                </svg>
                            </div>
                            QR Code
                        </button>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white p-8">
                        <h2 className="mb-2 text-2xl font-bold text-[#0f1c2e]">Shorten a long link</h2>
                        <p className="mb-6 text-gray-700">No credit card required.</p>

                        <form>
                            <div className="mb-6">
                                <label htmlFor="long-url" className="mb-2 block font-medium text-gray-700">
                                    Paste your long link here
                                </label>
                                <input
                                    type="url"
                                    id="long-url"
                                    placeholder="https://example.com/my-long-url"
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <Link
                                href={"auth/signup"}
                                className="flex items-center rounded-lg bg-[#2a5bd7] px-6 py-3 font-medium text-white hover:bg-blue-700"
                            >
                                Get your link for free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
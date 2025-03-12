import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Globe, ChevronDown, LinkIcon, ArrowRight } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import TopBar from "@/components/app/home/topbar"
import NavHeader from "@/components/app/home/header"
import Hero from "@/components/app/home/hero"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top banner */}
      <TopBar />

      {/* Navigation */}
      <NavHeader />
      {/* Hero Section */}
      <Hero />
    </div>
  )
}
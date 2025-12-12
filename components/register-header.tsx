"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

export function RegisterHeader() {
  return (
    <header className="relative z-50">
      <div className="bg-[#1a237e] rounded-b-[40px] lg:rounded-b-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.jpg"
                alt="STA Logo"
                width={120}
                height={50}
                className="h-10 lg:h-12 w-auto rounded-lg"
              />
              <span className="md:hidden text-white font-bold text-xs">Play Pedagogy Award</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/#award" className="font-medium text-white transition-colors hover:text-[#c5e063]">
                Award
              </Link>
              <Link href="/#faqs" className="font-medium text-white transition-colors hover:text-[#c5e063]">
                FAQs
              </Link>
              <Link href="/news" className="font-medium text-white transition-colors hover:text-[#c5e063]">
                News
              </Link>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#1a237e] font-medium rounded-full px-6 bg-transparent"
              >
                Login
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

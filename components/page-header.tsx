"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

export function PageHeader() {
  return (
    <header className="relative z-50">
      <div className="bg-[#1a237e] rounded-b-[40px] lg:rounded-b-[60px]">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/asset/logo-main.png"
                alt="STA Logo"
                width={140}
                height={60}
                className="h-12 lg:h-14 w-auto"
              />
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
              <Link href="/coming-soon">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1a237e] font-medium rounded-full px-6 bg-transparent"
                >
                  Login
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

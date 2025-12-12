"use client"

import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Image
                src="/asset/logo-main.png"
                alt="STA Logo"
                width={140}
                height={60}
                className="h-12 lg:h-14 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#award" className="font-medium text-white transition-colors hover:text-[#c5e063]">
              Award
            </Link>
            <Link href="#faqs" className="font-medium text-white transition-colors hover:text-[#c5e063]">
              FAQs
            </Link>
            <Link href="/news" className="font-medium text-white transition-colors hover:text-[#c5e063]">
              News
            </Link>
            <Link href="/coming-soon" className="font-medium text-white transition-colors hover:text-[#c5e063]">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

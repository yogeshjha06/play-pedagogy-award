"use client"

import Link from "next/link"
import { Award, HelpCircle, Newspaper, LogIn, MessageCircle } from "lucide-react"

const navItems = [
  { icon: Award, label: "Award", href: "/#award" },
  { icon: HelpCircle, label: "FAQs", href: "/#faqs" },
  { icon: Newspaper, label: "News", href: "/news" },
  { icon: LogIn, label: "Login", href: "/coming-soon" },
]

export function MobileNav({ onChatClick }: { onChatClick: () => void }) {
  return (
    <nav className="fixed bottom-4 left-4 right-4 bg-white border-t border-gray-200 shadow-lg md:hidden z-40 rounded-2xl">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-gray-600 hover:text-[#1a237e] transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={onChatClick}
          className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-gray-600 hover:text-[#1a237e] transition-colors"
          aria-label="Open Gargi Chat"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-medium">AI Chat</span>
        </button>
      </div>
    </nav>
  )
}

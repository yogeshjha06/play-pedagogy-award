"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RegistrationsTab } from "./tabs/registrations-tab"
import { FAQsTab } from "./tabs/faqs-tab"
import { NewsTab } from "./tabs/news-tab"
import { UsersTab } from "./tabs/users-tab"
import { MessagesTab } from "./tabs/messages-tab"
import { GargiTab } from "./tabs/gargi-tab"
import { ClipboardList, HelpCircle, Newspaper, Users, MessageSquare, LogOut, User, MessageCircle } from "lucide-react"
import Image from "next/image"

interface AdminDashboardProps {
  adminId: string | null
  onLogout: () => void
}

export function AdminDashboard({ adminId, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("registrations")

  const tabs = [
    { id: "registrations", label: "Registrations", icon: ClipboardList },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "news", label: "News & Podcasts", icon: Newspaper },
    { id: "users", label: "User Logins", icon: Users },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "gargi", label: "Gargi AI", icon: MessageCircle },
  ]

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a237e] text-white flex flex-col h-screen overflow-hidden">
        <div className="p-6 border-b border-white/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.jpg" alt="Logo" width={40} height={40} className="rounded-lg" />
            <h1 className="text-lg font-bold">Admin Panel</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                  activeTab === tab.id
                    ? "bg-[#c5e063] text-[#1a237e]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/20 flex-shrink-0">
          <div className="flex items-center gap-3 mb-4 bg-white/10 rounded-lg p-3">
            <User className="w-5 h-5 text-[#c5e063]" />
            <div>
              <p className="text-xs text-gray-400">Logged in as</p>
              <p className="text-sm font-semibold text-white">yogesh</p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 h-full">
          {activeTab === "registrations" && <RegistrationsTab />}
          {activeTab === "faqs" && <FAQsTab />}
          {activeTab === "news" && <NewsTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "messages" && <MessagesTab />}
          {activeTab === "gargi" && <GargiTab />}
        </div>
      </div>
    </div>
  )
}

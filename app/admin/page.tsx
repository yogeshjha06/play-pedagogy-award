"use client"

import { useState } from "react"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminId, setAdminId] = useState<string | null>(null)

  const handleLogin = (id: string) => {
    setAdminId(id)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setAdminId(null)
  }

  return isLoggedIn ? (
    <AdminDashboard adminId={adminId} onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  )
}

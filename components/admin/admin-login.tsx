"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AdminLoginProps {
  onLogin: (adminId: string) => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [mode, setMode] = useState<"login" | "reset">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  // Reset password states
  const [resetUsername, setResetUsername] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetError, setResetError] = useState("")
  const [resetLoading, setResetLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed")
        return
      }

      onLogin(data.adminId)
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetError("")

    if (newPassword !== confirmPassword) {
      setResetError("New passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      setResetError("Password must be at least 6 characters")
      return
    }

    setResetLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: resetUsername,
          oldPassword,
          newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setResetError(data.error || "Reset failed")
        return
      }

      setShowDialog(true)
    } catch (err) {
      setResetError("An error occurred")
    } finally {
      setResetLoading(false)
    }
  }

  const handleDialogOk = () => {
    setShowDialog(false)
    setMode("login")
    setResetUsername("")
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="min-h-screen bg-[#1a237e] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Image src="/asset/logo-main.png" alt="Logo" width={120} height={60} className="h-16 w-auto" />
        </div>

        {mode === "login" ? (
          <>
            <h1 className="text-2xl font-bold text-[#1a237e] mb-6 text-center">Admin Login</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a237e] hover:bg-[#283593] text-white font-semibold py-2 rounded-lg"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <button
              onClick={() => setMode("reset")}
              className="w-full mt-4 text-sm text-[#1a237e] hover:text-[#283593] font-medium"
            >
              Forgot Password?
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-[#1a237e] mb-6 text-center">Reset Password</h1>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <Input
                  type="text"
                  value={resetUsername}
                  onChange={(e) => setResetUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>

              {resetError && <p className="text-red-500 text-sm">{resetError}</p>}

              <Button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-[#1a237e] hover:bg-[#283593] text-white font-semibold py-2 rounded-lg"
              >
                {resetLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

            <button
              onClick={() => setMode("login")}
              className="w-full mt-4 text-sm text-[#1a237e] hover:text-[#283593] font-medium"
            >
              Back to Login
            </button>
          </>
        )}
      </div>

      {/* Success Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#1a237e] mb-2">Password Reset Successful</h2>
              <p className="text-gray-600 mb-6">Your password has been reset successfully.</p>
              <Button
                onClick={handleDialogOk}
                className="w-full bg-[#1a237e] hover:bg-[#283593] text-white font-semibold py-2 rounded-lg"
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

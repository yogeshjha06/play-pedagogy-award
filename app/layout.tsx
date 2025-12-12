import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Play Pedagogy Award | Play Scotland",
  description:
    "Begin your school's play journey with expert mentoring, resources, and a community of educators. A flexible 2-3 year framework designed for real classrooms.",
  generator: "v0.app",
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

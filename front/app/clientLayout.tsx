"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { Outfit } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { AuthProvider } from "@/contexts/AuthContext"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Écouter les changements du mode sombre depuis la page
  useEffect(() => {
    const handleModeChange = (event: CustomEvent) => {
      setIsDarkMode(event.detail.isDarkMode)
    }

    window.addEventListener("darkModeChange", handleModeChange as EventListener)

    return () => {
      window.removeEventListener("darkModeChange", handleModeChange as EventListener)
    }
  }, [])

  return (
    <html lang="fr" className={outfit.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <Header isDarkMode={isDarkMode} />
          <main className="pt-20">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

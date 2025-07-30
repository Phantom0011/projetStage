import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { AuthProvider } from "@/contexts/AuthContext" // ✅ <-- importe ton provider

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Madatlas - Excellence en Cartographie Numérique",
  description:
    "Révolutionner la cartographie numérique à Madagascar à travers l'excellence académique et l'innovation technologique. Formation, recherche et développement territorial.",
  keywords: "cartographie, Madagascar, SIG, géomatique, formation, recherche, université, excellence, innovation",
  authors: [{ name: "Équipe Madatlas", url: "https://madatlas.mg" }],
  creator: "Madatlas",
  publisher: "Université de Madagascar",
  openGraph: {
    title: "Madatlas - Excellence en Cartographie Numérique",
    description:
      "Révolutionner la cartographie numérique à Madagascar à travers l'excellence académique et l'innovation technologique.",
    type: "website",
    locale: "fr_FR",
    url: "https://madatlas.mg",
    siteName: "Madatlas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madatlas - Excellence en Cartographie Numérique",
    description:
      "Révolutionner la cartographie numérique à Madagascar à travers l'excellence académique et l'innovation technologique.",
    creator: "@madatlas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased">
        <AuthProvider> {/* ✅ Ici on encapsule tout */}
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

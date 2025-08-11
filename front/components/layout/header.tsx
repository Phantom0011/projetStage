"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "À Propos", href: "/about" },
    { name: "Équipe", href: "/team" },
    { name: "Actualités", href: "/news" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-sage-100 shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/logo-madatlas.png"
                  alt="Madatlas Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </div>
            <span
              className={`text-2xl font-light transition-colors duration-300 ${
                scrolled ? "text-charcoal-900" : "text-charcoal-900"
              }`}
            >
              Mad<span className="font-bold text-sage-600">atlas</span>
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  scrolled ? "text-charcoal-600 hover:text-sage-600" : "text-charcoal-700 hover:text-sage-600"
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-sage-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center">
            <Button
              className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/join">Nous rejoindre</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden transition-colors duration-300 ${
                  scrolled ? "text-charcoal-900 hover:bg-sage-100" : "text-charcoal-900 hover:bg-sage-100"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] bg-white border-l border-sage-100">
              <motion.div
                className="flex flex-col space-y-8 mt-12"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, staggerChildren: 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <Image
                      src="/images/logoMadatlas.png"
                      alt="Madatlas Logo"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-2xl font-light text-charcoal-900">
                    Mad<span className="font-bold text-sage-600">atlas</span>
                  </span>
                </div>

                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-2xl font-light text-charcoal-700 hover:text-sage-600 transition-all duration-300 py-2 block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="pt-8 border-t border-sage-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    className="w-full bg-sage-600 hover:bg-sage-700 text-white py-4 text-base font-medium shadow-lg"
                    asChild
                  >
                    <Link href="/join" onClick={() => setIsOpen(false)}>
                      Nous rejoindre
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

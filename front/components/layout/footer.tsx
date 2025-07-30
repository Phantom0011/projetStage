"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, ArrowUp, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-sage-50 border-t border-sage-100">
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo et description */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/logo-madatlas.jpg"
                  alt="Madatlas Logo"
                  width={56}
                  height={56}
                  className="rounded-full"
                />
              </div>
              <span className="text-3xl font-light text-charcoal-900">
                Mad<span className="font-bold text-sage-600">atlas</span>
              </span>
            </Link>
            <p className="text-charcoal-600 leading-relaxed max-w-md text-lg">
              Révolutionner la cartographie numérique à Madagascar à travers l'excellence académique et l'innovation
              technologique.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map((social, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="outline"
                  className="border-sage-200 text-sage-600 hover:text-sage-700 hover:border-sage-300 transition-all duration-300 hover:scale-110 bg-transparent"
                  asChild
                >
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-charcoal-900 text-lg mb-6">Navigation</h3>
            <ul className="space-y-4">
              {[
                { name: "À Propos", href: "/about" },
                { name: "Équipe", href: "/team" },
                { name: "Actualités", href: "/news" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-charcoal-600 hover:text-sage-600 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-charcoal-900 text-lg mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-sage-500 mt-0.5" />
                <div className="text-charcoal-600 text-sm leading-relaxed">
                  Université de Madagascar
                  <br />
                  Antananarivo, Madagascar
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-sage-500" />
                <a
                  href="mailto:contact@madatlas.mg"
                  className="text-charcoal-600 hover:text-sage-600 transition-colors text-sm"
                >
                  contact@madatlas.mg
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-sage-500" />
                <span className="text-charcoal-600 text-sm">+261 20 22 123 45</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-sage-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-charcoal-500">© 2024 Madatlas. Tous droits réservés.</div>
            <div className="flex space-x-8 text-sm">
              {[
                { name: "Mentions légales", href: "/legal" },
                { name: "Confidentialité", href: "/privacy" },
                { name: "Conditions", href: "/terms" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-charcoal-500 hover:text-sage-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-8 right-8 bg-sage-600 hover:bg-sage-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </footer>
  )
}

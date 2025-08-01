"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  MapPin,
  Users,
  BookOpen,
  Calendar,
  Target,
  Lightbulb,
  Sparkles,
  Rocket,
  Globe,
  Star,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Ajouter après la déclaration du state isDarkMode
  useEffect(() => {
    // Émettre un événement personnalisé pour informer le layout du changement de mode
    const event = new CustomEvent("darkModeChange", {
      detail: { isDarkMode },
    })
    window.dispatchEvent(event)
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-charcoal-900" : "bg-white"}`}>
      {/* Dark Mode Toggle Button */}
      <motion.div
        className="fixed top-24 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button
          onClick={toggleDarkMode}
          size="icon"
          className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
            isDarkMode
              ? "bg-sage-600 hover:bg-sage-700 text-white"
              : "bg-white hover:bg-sage-50 text-charcoal-900 border border-sage-200"
          }`}
        >
          <motion.div initial={false} animate={{ rotate: isDarkMode ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.div>
        </Button>
      </motion.div>

      {/* Hero Section */}
      <section
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900"
            : "bg-gradient-to-br from-sage-50 via-white to-sage-100"
        }`}
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23059669' fillOpacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute top-1/4 left-1/4 w-2 h-2 rounded-full ${
              isDarkMode ? "bg-sage-400 opacity-40" : "bg-sage-400 opacity-30"
            }`}
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className={`absolute top-1/3 right-1/3 w-1 h-1 rounded-full ${
              isDarkMode ? "bg-coral-400 opacity-50" : "bg-coral-400 opacity-40"
            }`}
            animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className={`absolute bottom-1/3 left-1/2 w-1.5 h-1.5 rounded-full ${
              isDarkMode ? "bg-sage-500 opacity-35" : "bg-sage-500 opacity-25"
            }`}
            animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
          />
        </div>

        {/* Ambient light effects for dark mode */}
        {isDarkMode && (
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coral-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          </div>
        )}

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div
              className="lg:col-span-7 space-y-12"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Badge
                    variant="outline"
                    className={`px-4 py-2 ${
                      isDarkMode
                        ? "border-sage-700 text-sage-300 bg-sage-900/50 backdrop-blur-sm"
                        : "border-sage-200 text-sage-700 bg-sage-50/80 backdrop-blur-sm"
                    }`}
                  >
                    <Star className="w-3 h-3 mr-2" />
                    Innovation Cartographique
                  </Badge>
                </motion.div>

                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h1
                    className={`text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.9] tracking-tight ${
                      isDarkMode ? "text-white" : "text-charcoal-900"
                    }`}
                  >
                    Mad<span className={`font-bold ${isDarkMode ? "text-sage-400" : "text-sage-600"}`}>atlas</span>
                  </h1>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-sage-500 to-coral-400"></div>
                </motion.div>

                <motion.p
                  className={`text-xl lg:text-2xl leading-relaxed max-w-2xl font-light ${
                    isDarkMode ? "text-gray-300" : "text-charcoal-800"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Révolutionner la cartographie numérique à Madagascar à travers l'excellence académique et l'innovation
                  technologique.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button
                  size="lg"
                  className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 text-base font-medium group transition-all duration-300 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <Link href="/about">
                    Découvrir le projet
                    <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`px-8 py-4 text-base font-medium transition-all duration-300 bg-transparent ${
                    isDarkMode
                      ? "border-sage-600 text-sage-300 hover:bg-sage-900/50"
                      : "border-sage-300 text-sage-700 hover:bg-sage-50"
                  }`}
                  asChild
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.25, 0, 1] }}
            >
              <div className="relative">
                <div
                  className={`absolute -inset-4 rounded-3xl blur-2xl opacity-40 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-sage-600/20 to-coral-500/20 opacity-60"
                      : "bg-gradient-to-r from-sage-100 to-sage-200"
                  }`}
                ></div>
                <div
                  className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                    isDarkMode ? "border border-sage-700/30" : "border border-sage-100"
                  }`}
                >
                  <Image
                    src="/images/imageMenu.jpg"
                    alt="Conférence officielle du projet Madatlas - Présentation des partenariats académiques"
                    width={600}
                    height={700}
                    className="w-full h-auto object-cover"
                  />
                  {/* Overlay avec informations */}
                  <div
                    className={`absolute inset-0 ${
                      isDarkMode
                        ? "bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent"
                        : "bg-gradient-to-t from-sage-900/20 via-transparent to-transparent"
                    }`}
                  ></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div
                      className={`backdrop-blur-sm rounded-xl p-4 shadow-lg ${
                        isDarkMode ? "bg-charcoal-800/90 border border-sage-700/30" : "bg-white/90"
                      }`}
                    >
                      <h3 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-charcoal-900"}`}>
                        Partenariats Officiels
                      </h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-charcoal-800"}`}>
                        Collaboration avec les universités internationales
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating stats cards */}
                <div
                  className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl shadow-xl flex items-center justify-center ${
                    isDarkMode ? "bg-charcoal-800 border border-sage-700/30" : "bg-white border border-sage-100"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                        isDarkMode ? "bg-sage-900/50" : "bg-sage-100"
                      }`}
                    >
                      <Globe className={`w-6 h-6 ${isDarkMode ? "text-sage-400" : "text-sage-600"}`} />
                    </div>
                    <div className={`text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-charcoal-800"}`}>
                      Madagascar
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute -top-6 -left-6 w-28 h-28 rounded-2xl shadow-xl flex items-center justify-center ${
                    isDarkMode ? "bg-charcoal-800 border border-sage-700/30" : "bg-white border border-sage-100"
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDarkMode ? "text-sage-400" : "text-sage-600"}`}>SIG</div>
                    <div className={`text-xs ${isDarkMode ? "text-gray-300" : "text-charcoal-800"}`}>Systèmes</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className={`text-xs uppercase tracking-wider ${isDarkMode ? "text-sage-400" : "text-sage-500"}`}>
            Scroll
          </span>
          <motion.div
            className={`w-px h-12 ${
              isDarkMode
                ? "bg-gradient-to-b from-sage-400 to-transparent"
                : "bg-gradient-to-b from-sage-400 to-transparent"
            }`}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className={`py-32 relative ${isDarkMode ? "bg-charcoal-800" : "bg-white"}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <AnimatedSection className="lg:col-span-5">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge
                    variant="outline"
                    className={`${
                      isDarkMode
                        ? "border-sage-700 text-sage-300 bg-sage-900/50"
                        : "border-sage-200 text-sage-700 bg-sage-50"
                    }`}
                  >
                    Notre Mission
                  </Badge>
                  <h2
                    className={`text-5xl lg:text-6xl font-light leading-tight ${
                      isDarkMode ? "text-white" : "text-charcoal-900"
                    }`}
                  >
                    Excellence &<br />
                    <span className={`font-bold ${isDarkMode ? "text-sage-400" : "text-sage-600"}`}>Innovation</span>
                  </h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-sage-500 to-coral-400"></div>
                </div>
                <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-charcoal-800"}`}>
                  Développer l'expertise en cartographie numérique à Madagascar pour répondre aux défis contemporains de
                  l'aménagement du territoire et du développement durable.
                </p>
              </div>
            </AnimatedSection>

            <motion.div
              className="lg:col-span-7 grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: BookOpen,
                  title: "Formation",
                  description: "Cursus spécialisés en cartographie numérique et systèmes d'information géographique.",
                  color: "sage",
                },
                {
                  icon: Lightbulb,
                  title: "Recherche",
                  description: "Projets de recherche appliquée pour les défis territoriaux spécifiques à Madagascar.",
                  color: "coral",
                },
                {
                  icon: Rocket,
                  title: "Innovation",
                  description: "Développement d'outils et technologies adaptés aux besoins locaux et régionaux.",
                  color: "sage",
                },
                {
                  icon: Globe,
                  title: "Impact",
                  description: "Contribution au développement durable et à l'aménagement optimal du territoire.",
                  color: "coral",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card
                    className={`group h-full border-0 shadow-sm hover:shadow-lg transition-all duration-500 ${
                      isDarkMode
                        ? "bg-charcoal-700/50 hover:bg-charcoal-700 border border-sage-700/30"
                        : "bg-sage-50/30 hover:bg-white"
                    }`}
                  >
                    <CardHeader className="pb-4">
                      <div
                        className={`w-12 h-12 mb-4 rounded-xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow duration-300 ${
                          isDarkMode
                            ? item.color === "sage"
                              ? "bg-sage-900/50"
                              : "bg-coral-900/50"
                            : item.color === "sage"
                              ? "bg-sage-100"
                              : "bg-coral-100"
                        }`}
                      >
                        <item.icon
                          className={`h-6 w-6 ${
                            isDarkMode
                              ? item.color === "sage"
                                ? "text-sage-400"
                                : "text-coral-400"
                              : item.color === "sage"
                                ? "text-sage-600"
                                : "text-coral-500"
                          }`}
                        />
                      </div>
                      <CardTitle className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-charcoal-900"}`}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`leading-relaxed text-sm ${isDarkMode ? "text-gray-300" : "text-charcoal-800"}`}>
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Axes de développement */}
      <section className={`py-32 relative ${isDarkMode ? "bg-charcoal-800" : "bg-white"}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className={`${
                  isDarkMode
                    ? "border-sage-700 text-sage-300 bg-sage-900/50"
                    : "border-sage-200 text-sage-700 bg-sage-50"
                }`}
              >
                Nos Axes de Développement
              </Badge>
              <h2
                className={`text-5xl lg:text-6xl font-light leading-tight ${
                  isDarkMode ? "text-white" : "text-charcoal-900"
                }`}
              >
                Quatre Pôles
                <br />
                <span className={`font-bold ${isDarkMode ? "text-sage-400" : "text-sage-600"}`}>d'Excellence</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-sage-500 to-coral-400 mx-auto"></div>
              <p
                className={`text-lg max-w-3xl mx-auto leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-charcoal-800"
                }`}
              >
                Une approche structurée pour maximiser notre impact sur le développement territorial de Madagascar.
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid lg:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Target,
                title: "Formations Spécialisées",
                description: "Programmes académiques d'excellence en cartographie numérique",
                items: [
                  "Licence et Master spécialisés",
                  "Formation continue professionnelle",
                  "Certification internationale",
                ],
                number: "01",
                accent: "sage",
              },
              {
                icon: Users,
                title: "Partenariats Académiques",
                description: "Réseau international de collaboration scientifique",
                items: ["Échanges internationaux", "Recherche collaborative", "Transfert de technologies"],
                number: "02",
                accent: "coral",
              },
              {
                icon: Calendar,
                title: "Événements & Diffusion",
                description: "Promotion et sensibilisation à la cartographie numérique",
                items: ["Conférences scientifiques", "Hackathons innovants", "Ateliers de formation"],
                number: "03",
                accent: "sage",
              },
              {
                icon: MapPin,
                title: "Projets Appliqués",
                description: "Solutions concrètes pour le territoire malgache",
                items: ["Cartographie territoriale", "Gestion des ressources", "Planification urbaine"],
                number: "04",
                accent: "coral",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${
                    isDarkMode
                      ? "bg-charcoal-700/50 border border-sage-700/30 hover:bg-charcoal-700"
                      : "bg-white hover:bg-white"
                  }`}
                >
                  <CardHeader className="relative pb-6">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                          isDarkMode
                            ? item.accent === "sage"
                              ? "bg-sage-900/50"
                              : "bg-coral-900/50"
                            : item.accent === "sage"
                              ? "bg-sage-100"
                              : "bg-coral-100"
                        }`}
                      >
                        <item.icon
                          className={`h-7 w-7 ${
                            isDarkMode
                              ? item.accent === "sage"
                                ? "text-sage-400"
                                : "text-coral-400"
                              : item.accent === "sage"
                                ? "text-sage-600"
                                : "text-coral-500"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-6xl font-light transition-colors duration-300 ${
                          isDarkMode
                            ? "text-sage-900/30 group-hover:text-sage-800/40"
                            : "text-sage-100 group-hover:text-sage-200"
                        }`}
                      >
                        {item.number}
                      </span>
                    </div>
                    <CardTitle
                      className={`text-2xl font-semibold leading-tight ${
                        isDarkMode ? "text-white" : "text-charcoal-900"
                      }`}
                    >
                      {item.title}
                    </CardTitle>
                    <CardDescription
                      className={`text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-charcoal-800"}`}
                    >
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {item.items.map((listItem, listIndex) => (
                        <div key={listIndex} className="flex items-center gap-3">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.accent === "sage" ? "bg-sage-400" : "bg-coral-400"
                            }`}
                          ></div>
                          <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-charcoal-800"}`}>
                            {listItem}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Actualités récentes */}
      <section className={`py-32 ${isDarkMode ? "bg-charcoal-900" : "bg-sage-50"}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <AnimatedSection className="flex justify-between items-end mb-16">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className={`${
                  isDarkMode ? "border-sage-700 text-sage-300 bg-sage-900/50" : "border-sage-200 text-sage-700 bg-white"
                }`}
              >
                Actualités
              </Badge>
              <h2
                className={`text-5xl lg:text-6xl font-light leading-tight ${
                  isDarkMode ? "text-white" : "text-charcoal-900"
                }`}
              >
                Dernières
                <br />
                <span className={`font-bold ${isDarkMode ? "text-sage-400" : "text-sage-600"}`}>Nouvelles</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-sage-500 to-coral-400"></div>
            </div>
            <Button
              variant="outline"
              className={`hidden md:flex bg-transparent ${
                isDarkMode
                  ? "border-sage-700 text-sage-300 hover:bg-sage-900/50"
                  : "border-sage-200 text-sage-700 hover:bg-sage-50"
              }`}
              asChild
            >
              <Link href="/news">Toutes les actualités</Link>
            </Button>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                category: "Formation",
                title: "Lancement du premier module de formation en SIG",
                date: "15 janvier 2024",
                description:
                  "Ouverture des inscriptions pour le premier module de formation en systèmes d'information géographique.",
                accent: "sage",
                image: "/placeholder.svg?height=240&width=400&text=Formation+SIG+-+Étudiants+en+cartographie+numérique",
              },
              {
                category: "Partenariat",
                title: "Accord stratégique avec l'Université de Bordeaux",
                date: "8 janvier 2024",
                description: "Un partenariat pour le développement de la recherche en cartographie numérique.",
                accent: "coral",
                image:
                  "/placeholder.svg?height=240&width=400&text=Partenariat+international+-+Collaboration+académique",
              },
              {
                category: "Événement",
                title: "Premier hackathon cartographique malgache",
                date: "20 décembre 2023",
                description: "Succès du premier hackathon dédié à la cartographie numérique à Madagascar.",
                accent: "sage",
                image: "/placeholder.svg?height=240&width=400&text=Hackathon+cartographie+-+Innovation+collaborative",
              },
            ].map((article, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`group h-full border-0 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden ${
                    isDarkMode ? "bg-charcoal-800/50 border border-sage-700/30 hover:bg-charcoal-800" : "bg-white"
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={400}
                      height={240}
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDarkMode
                          ? "bg-gradient-to-t from-charcoal-900/40 to-transparent"
                          : "bg-gradient-to-t from-black/20 to-transparent"
                      }`}
                    ></div>
                    <Badge
                      className={`absolute top-4 left-4 border-0 backdrop-blur-sm ${
                        article.accent === "sage" ? "bg-sage-600 text-white" : "bg-coral-500 text-white"
                      }`}
                    >
                      {article.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <CardDescription className={`text-sm ${isDarkMode ? "text-gray-400" : "text-charcoal-700"}`}>
                      {article.date}
                    </CardDescription>
                    <CardTitle
                      className={`text-xl font-semibold leading-tight transition-colors ${
                        isDarkMode
                          ? "text-white group-hover:text-sage-400"
                          : "text-charcoal-900 group-hover:text-sage-700"
                      }`}
                    >
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-charcoal-800"}`}>
                      {article.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`py-32 relative overflow-hidden ${
          isDarkMode ? "bg-white border-t border-sage-200" : "bg-charcoal-900"
        }`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coral-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 text-center relative">
          <AnimatedSection className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-8">
              <Badge
                variant="outline"
                className={`backdrop-blur-sm ${
                  isDarkMode
                    ? "border-sage-200 text-sage-700 bg-sage-50/50"
                    : "border-sage-700 text-sage-300 bg-sage-900/50"
                }`}
              >
                <Sparkles className="w-3 h-3 mr-2" />
                Rejoignez l'Excellence
              </Badge>
              <h2
                className={`text-5xl lg:text-6xl font-light leading-tight ${
                  isDarkMode ? "text-charcoal-900" : "text-white"
                }`}
              >
                Façonnez l'Avenir de
                <br />
                <span className={`font-bold ${isDarkMode ? "text-sage-600" : "text-sage-400"}`}>Madagascar</span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-sage-400 to-coral-400 mx-auto"></div>
              <p
                className={`text-xl leading-relaxed max-w-3xl mx-auto ${
                  isDarkMode ? "text-charcoal-700" : "text-gray-300"
                }`}
              >
                Rejoignez une communauté d'experts passionnés et contribuez à la révolution cartographique de
                Madagascar. Ensemble, construisons l'avenir du territoire malgache.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button
                size="lg"
                className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 text-base font-medium group shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/join">
                  Nous rejoindre
                  <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`px-8 py-4 text-base font-medium bg-transparent ${
                  isDarkMode
                    ? "text-charcoal-700 border-sage-600 hover:bg-sage-50"
                    : "text-sage-300 border-sage-600 hover:bg-sage-900/50"
                }`}
                asChild
              >
                <Link href="/contact">Découvrir nos projets</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

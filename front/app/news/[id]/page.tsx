"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { getPost } from "@/lib/auth"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] },
}

interface Post {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image?: string
  featured: boolean
  tags: string[]
  type: string
}

export default function PostPage() {
  const { id } = useParams() // Récupère l'ID depuis l'URL
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(Number(id))
        setPost(fetchedPost)
      } catch (error) {
        console.error("Failed to fetch post:", error)
        setError("Impossible de charger l'article. Veuillez réessayer plus tard.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Article non trouvé</h3>
          <p className="text-gray-600 mb-6">{error || "L'article demandé n'existe pas ou a été supprimé."}</p>
          <Button variant="outline" asChild>
            <Link href="/news">
              Retour aux actualités
              <ArrowLeft className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/news">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">{post.title}</h1>
          </div>
        </div>
      </section>

      {/* Contenu de l'article */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card className="max-w-4xl mx-auto">
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg?height=400&width=800&text=Article+Image"}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-96 object-cover"
                />
                <Badge
                  className={`absolute top-4 left-4 ${
                    post.category === "Formation"
                      ? "bg-blue-600"
                      : post.category === "Partenariat"
                        ? "bg-purple-600"
                        : post.category === "Événement"
                          ? "bg-orange-600"
                          : post.category === "Technologie"
                            ? "bg-green-600"
                            : post.category === "Recherche"
                              ? "bg-red-600"
                              : "bg-gray-600"
                  } text-white`}
                >
                  {post.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
                <CardDescription className="text-lg">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  {post.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(post.tags) && post.tags.length > 0 ? (
                    post.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Aucun tag
                    </Badge>
                  )}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/news">
                    Retour aux actualités
                    <ArrowLeft className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
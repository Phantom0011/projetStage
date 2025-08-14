"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, LogOut, Calendar, User, Clock, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { getPosts, deletePost } from "@/lib/auth"
import Loader from "@/components/loader"

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

export default function AdminPage() {
  const { user, logout, isAdmin, loading: authLoading } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    getPosts()
      .then((fetchedPosts) => {
        setPosts(fetchedPosts)
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error)
      })
      .finally(() => {
        setLoading(false)
        setPostsLoading(false)
      })
  }, [])

  const handleDeletePost = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      return
    }

    try {
      const token = localStorage.getItem("token")
      if (token) {
        await deletePost(id, token)
        setPosts(posts.filter((post) => post.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete post:", error)
      alert("Erreur lors de la suppression de l'article")
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/images/logo-madatlas.jpg"
                    alt="Madatlas Logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-xl font-semibold">Madatlas Admin</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user?.username}</span>
                  <Badge variant="secondary">{user?.role}</Badge>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Dashboard Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posts.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Articles à la Une</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posts.filter((p) => p.featured).length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Formations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posts.filter((p) => p.category === "Formation").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Événements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posts.filter((p) => p.category === "Événement").length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Posts Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestion des Articles</CardTitle>
                  <CardDescription>Gérez les actualités et publications de Madatlas</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href="/admin/posts/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvel Article
                    </Link>
                  </Button>
                  {user?.role === "admin" && (
                    <Button asChild variant="secondary">
                      <Link href="/admin/users/new">
                        <User className="h-4 w-4 mr-2" />
                        Nouvel Utilisateur
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {postsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Chargement des articles...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article</h3>
                  <p className="text-gray-600 mb-4">Commencez par créer votre premier article.</p>
                  <Button asChild>
                    <Link href="/admin/posts/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Créer un article
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                      {post.image && (
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={80}
                          height={60}
                          className="rounded object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                          {post.featured && <Badge variant="secondary">À la une</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.date).toLocaleDateString("fr-FR")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/news/${post.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/posts/${post.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

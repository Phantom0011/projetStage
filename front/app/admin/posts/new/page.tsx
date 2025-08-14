"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { createPost } from "@/lib/auth"
import axios from "axios"
import Loader from "@/components/loader"

export default function NewPostPage() {
  const { user } = useAuth() // retire isAdmin ici
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    author: user?.username || "",
    readTime: "",
    image: "",
    featured: false,
    tags: "",
    type: "news",
  })

  const categories = ["Formation", "Partenariat", "Événement", "Technologie", "Recherche"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Token manquant")
      }

      const postData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        date: new Date().toISOString().split("T")[0],
        category: formData.category || "",
        author: formData.author.trim() || "",
      }

      console.log("Données envoyées au backend :", postData)

      await createPost(postData, token)
      router.push("/admin")
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          try {
            const data = error.response.data;
            console.error("Erreur serveur détaillée :", data);
            setError(
              data.detail
                ? JSON.stringify(data.detail, null, 2)
                : JSON.stringify(data, null, 2)
            );
          } catch {
            setError(error.message || "Erreur lors de la création de l'article");
          }
        } else {
          setError(error.message || "Erreur lors de la création de l'article");
        }
      } else {
        setError(error.message || "Erreur lors de la création de l'article");
      }
    } finally {
      setLoading(false);
    }
  }


  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      {loading && <Loader />}
      <div className={`flex flex-col min-h-screen`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Nouvel Article</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Contenu de l'Article</CardTitle>
                  <CardDescription>Remplissez les informations de votre nouvel article</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="title">Titre *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Titre de l'article"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Résumé *</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleChange("excerpt", e.target.value)}
                        placeholder="Résumé court de l'article"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Contenu *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleChange("content", e.target.value)}
                        placeholder="Contenu complet de l'article"
                        rows={12}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie *</Label>
                        <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="readTime">Temps de lecture</Label>
                        <Input
                          id="readTime"
                          value={formData.readTime}
                          onChange={(e) => handleChange("readTime", e.target.value)}
                          placeholder="ex: 5 min"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">URL de l'image</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => handleChange("image", e.target.value)}
                        placeholder="https://exemple.com/image.jpg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => handleChange("tags", e.target.value)}
                        placeholder="tag1, tag2, tag3"
                      />
                      <p className="text-sm text-gray-500">Séparez les tags par des virgules</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleChange("featured", checked)}
                      />
                      <Label htmlFor="featured">Article à la une</Label>
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          "Publication..."
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Publier l'article
                          </>
                        )}
                      </Button>
                      <Button type="button" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Aperçu
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Auteur</Label>
                    <p className="text-sm text-gray-600">{user?.username}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Date de publication</Label>
                    <p className="text-sm text-gray-600">
                      {new Date().toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Statut</Label>
                    <p className="text-sm text-gray-600">Brouillon</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conseils</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>• Utilisez un titre accrocheur et descriptif</p>
                  <p>• Le résumé doit donner envie de lire l'article</p>
                  <p>• Ajoutez des tags pertinents pour le référencement</p>
                  <p>• Une image améliore l'engagement</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function NewUserPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await axios.post(`${API_URL}/users/`, formData)
      setSuccess(true)
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "user",
      })
      setTimeout(() => router.push("/admin"), 1500)
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        err.message ||
        "Erreur lors de la création de l'utilisateur"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Créer un nouvel utilisateur</CardTitle>
          <CardDescription>
            Remplissez le formulaire pour ajouter un utilisateur au système.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-300">
              Utilisateur créé avec succès !
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-300">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom d'utilisateur *
              </label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe *
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Rôle
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Création..." : "Créer l'utilisateur"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
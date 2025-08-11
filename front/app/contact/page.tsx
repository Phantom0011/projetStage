"use client"

import axios from "axios"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await axios.post(`${API_URL}/contact/`, formData)
      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      })
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
        err.message ||
        "Erreur lors de l'envoi du message"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Nous Contacter</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Une question, une proposition de collaboration ou simplement envie d'en savoir plus ? N'hésitez pas à nous
            contacter, nous serons ravis d'échanger avec vous.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de Contact</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600">
                      Université de Fianarantsoa
                      <br />
                      Département de Géographie
                      <br />
                      Fianarantsaoa 301
                      <br />
                      Madagascar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">
                      contact@madatlas.mg
                      <br />
                      info@madatlas.mg
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">
                      +261 20 22 123 45
                      <br />
                      +261 34 56 789 01
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Horaires</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi: 8h00 - 17h00
                      <br />
                      Samedi: 8h00 - 12h00
                      <br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Types de demandes */}
            <Card>
              <CardHeader>
                <CardTitle>Types de Demandes</CardTitle>
                <CardDescription>Nous traitons différents types de demandes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Étudiants</div>
                  <p className="text-gray-600">Informations sur les formations, inscriptions</p>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Partenaires</div>
                  <p className="text-gray-600">Collaborations académiques et institutionnelles</p>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Entreprises</div>
                  <p className="text-gray-600">Projets appliqués, formations sur mesure</p>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Médias</div>
                  <p className="text-gray-600">Demandes d'interviews, informations presse</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un Message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {success && (
                  <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-300">
                    Votre message a été envoyé avec succès !
                  </div>
                )}
                {error && (
                  <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-300">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Votre nom complet"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="votre.email@exemple.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Étudiant</SelectItem>
                          <SelectItem value="partner">Partenaire académique</SelectItem>
                          <SelectItem value="company">Entreprise</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        placeholder="Sujet de votre message"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Décrivez votre demande en détail..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    <Send className="h-4 w-4 mr-2" />
                    {loading ? "Envoi en cours..." : "Envoyer le Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Localisation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Notre Localisation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Retrouvez-nous sur le campus de l'Université de Fianarantsoa
            </p>
          </div>

          <div className="rounded-lg overflow-hidden h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3713.1716433515435!2d47.10928237428995!3d-21.461780787829188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21e7bf24d5bd256f%3A0x488072ad41f4d8a2!2sUniversit%C3%A9%20d&#39;Andrainjato!5e0!3m2!1sfr!2smg!4v1754924526261!5m2!1sfr!2smg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Université d'Andrainjato"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

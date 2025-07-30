import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, BookOpen, Briefcase, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function JoinPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Nous Rejoindre</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Découvrez les différentes façons de participer au projet Madatlas et de contribuer au développement de la
            cartographie numérique à Madagascar.
          </p>
        </div>
      </section>

      {/* Options pour rejoindre */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comment Nous Rejoindre ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Que vous soyez étudiant, professionnel, institution ou entreprise, il existe plusieurs façons de
              participer à l'aventure Madatlas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle>Étudiants</CardTitle>
                <CardDescription>Intégrez nos formations spécialisées</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Rejoignez nos programmes de licence et master en cartographie numérique.
                </p>
                <Button className="w-full" asChild>
                  <Link href="/formations">Découvrir les formations</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Chercheurs</CardTitle>
                <CardDescription>Collaborez sur nos projets de recherche</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Participez à nos projets de recherche appliquée et publications scientifiques.
                </p>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/research">Projets de recherche</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Partenaires</CardTitle>
                <CardDescription>Établissez des partenariats stratégiques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Universités, institutions et entreprises, développons ensemble l'écosystème.
                </p>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/partnerships">Partenariats</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Bénévoles</CardTitle>
                <CardDescription>Soutenez notre mission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Contribuez à nos événements, communications et actions de sensibilisation.
                </p>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/volunteer">Devenir bénévole</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Processus d'inscription */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Processus d'Inscription</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Suivez ces étapes simples pour rejoindre le projet Madatlas.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Candidature</h3>
                <p className="text-gray-600">
                  Remplissez le formulaire de candidature en ligne avec vos informations et motivations.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Évaluation</h3>
                <p className="text-gray-600">
                  Notre équipe évalue votre profil et vous contacte pour un entretien si nécessaire.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Intégration</h3>
                <p className="text-gray-600">
                  Une fois accepté, vous recevez toutes les informations pour commencer votre parcours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Témoignages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les expériences de ceux qui ont rejoint l'aventure Madatlas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Témoignage"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg">Aina Rakoto</CardTitle>
                    <CardDescription>Étudiante Master SIG</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">
                  "Madatlas m'a permis de découvrir ma passion pour la cartographie numérique. Les formations sont
                  excellentes et l'équipe très accompagnante."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Témoignage"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg">Dr. Hery Andry</CardTitle>
                    <CardDescription>Chercheur associé</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">
                  "Collaborer avec Madatlas a enrichi mes recherches et m'a permis de contribuer concrètement au
                  développement de Madagascar."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="Témoignage"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg">Marie Razana</CardTitle>
                    <CardDescription>Partenaire entreprise</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">
                  "Le partenariat avec Madatlas nous a apporté une expertise précieuse pour nos projets d'aménagement
                  territorial."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Prêt à Nous Rejoindre ?</h2>
            <p className="text-xl text-emerald-100">
              Ne manquez pas cette opportunité unique de participer à la révolution de la cartographie numérique à
              Madagascar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Postuler maintenant <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-emerald-600 bg-transparent"
                asChild
              >
                <Link href="/contact">Poser une question</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

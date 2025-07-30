import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Target, History, Users, Globe, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">À Propos de Madatlas</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Découvrez l'histoire, la mission et la vision du projet Madatlas, une initiative ambitieuse pour développer
            l'expertise en cartographie numérique à Madagascar.
          </p>
        </div>
      </section>

      {/* Mission et Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Notre Mission
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Révolutionner la Cartographie Numérique</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Madatlas vise à développer une expertise de pointe en cartographie numérique à Madagascar, en formant
                  une nouvelle génération de spécialistes capables de répondre aux défis contemporains de l'aménagement
                  du territoire.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-6 w-6 text-emerald-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Formation d'Excellence</h3>
                      <p className="text-gray-600">
                        Développer des programmes de formation innovants et adaptés aux besoins locaux.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Impact Territorial</h3>
                      <p className="text-gray-600">
                        Contribuer au développement durable et à l'aménagement optimal du territoire malgache.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Innovation Technologique</h3>
                      <p className="text-gray-600">
                        Développer des solutions technologiques adaptées aux spécificités malgaches.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Mission Madatlas"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Historique */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Notre Histoire
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Genèse du Projet Madatlas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Retracez les étapes clés qui ont mené à la création de ce projet ambitieux.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <History className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle>2022 - Conception du Projet</CardTitle>
                      <CardDescription>Identification des besoins en cartographie numérique</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Face aux défis croissants de l'aménagement du territoire à Madagascar, un groupe d'universitaires et
                    de chercheurs identifie le besoin urgent de développer l'expertise locale en cartographie numérique.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>2023 - Formation de l'Équipe</CardTitle>
                      <CardDescription>Rassemblement des expertises</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Constitution d'une équipe pluridisciplinaire réunissant géographes, informaticiens, urbanistes et
                    spécialistes du développement territorial pour structurer le projet Madatlas.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>2024 - Lancement Officiel</CardTitle>
                      <CardDescription>Début des activités et premiers partenariats</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Lancement officiel du projet avec les premiers modules de formation, signature des premiers
                    partenariats académiques internationaux et démarrage des projets de recherche appliquée.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Nos Partenaires</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Madatlas s'appuie sur un réseau de partenaires académiques et institutionnels pour garantir l'excellence
              de ses formations et recherches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=100&width=200"
                  alt="Université de Madagascar"
                  width={200}
                  height={100}
                  className="mx-auto mb-4"
                />
                <CardTitle>Université de Madagascar</CardTitle>
                <CardDescription>Partenaire fondateur</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Institution d'accueil du projet et partenaire principal pour le développement des formations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=100&width=200"
                  alt="Université de Bordeaux"
                  width={200}
                  height={100}
                  className="mx-auto mb-4"
                />
                <CardTitle>Université de Bordeaux</CardTitle>
                <CardDescription>Partenaire académique</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Collaboration pour le transfert d'expertise et les échanges d'étudiants et chercheurs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=100&width=200"
                  alt="Institut National de Géographie"
                  width={200}
                  height={100}
                  className="mx-auto mb-4"
                />
                <CardTitle>Institut National de Géographie</CardTitle>
                <CardDescription>Partenaire technique</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Expertise technique et accès aux données géographiques de référence pour Madagascar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impacts attendus */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Impacts Attendus</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Madatlas ambitionne de transformer l'écosystème de la cartographie numérique à Madagascar avec des impacts
              mesurables sur plusieurs secteurs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Formation</h3>
              <p className="text-gray-600">Former 500+ spécialistes en cartographie numérique d'ici 2027</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recherche</h3>
              <p className="text-gray-600">Développer 20+ projets de recherche appliquée au territoire malgache</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Économie</h3>
              <p className="text-gray-600">Créer un secteur d'activité générant 100+ emplois qualifiés</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Territoire</h3>
              <p className="text-gray-600">Améliorer la planification territoriale dans 10+ régions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

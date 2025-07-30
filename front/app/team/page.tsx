import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Dr. Rakoto Andriamampianina",
      role: "Directeur du Projet",
      affiliation: "Université de Madagascar",
      expertise: "Géographie, Cartographie",
      image: "/placeholder.svg?height=300&width=300",
      description: "Spécialiste en géographie urbaine et aménagement du territoire avec 15 ans d'expérience.",
      email: "rakoto@madatlas.mg",
      linkedin: "#",
    },
    {
      name: "Prof. Marie Razafy",
      role: "Responsable Pédagogique",
      affiliation: "Université de Madagascar",
      expertise: "SIG, Télédétection",
      image: "/placeholder.svg?height=300&width=300",
      description: "Experte en systèmes d'information géographique et technologies de télédétection.",
      email: "marie.razafy@madatlas.mg",
      linkedin: "#",
    },
    {
      name: "Dr. Jean-Pierre Ratsimba",
      role: "Coordinateur Recherche",
      affiliation: "Institut National de Géographie",
      expertise: "Cartographie numérique, Géomatique",
      image: "/placeholder.svg?height=300&width=300",
      description: "Chercheur en géomatique avec une expertise en modélisation spatiale et analyse territoriale.",
      email: "jp.ratsimba@madatlas.mg",
      linkedin: "#",
    },
    {
      name: "Dr. Sophie Randrianarisoa",
      role: "Responsable Partenariats",
      affiliation: "Université de Madagascar",
      expertise: "Développement territorial, Coopération internationale",
      image: "/placeholder.svg?height=300&width=300",
      description: "Spécialiste du développement territorial et de la coopération académique internationale.",
      email: "sophie.randrianarisoa@madatlas.mg",
      linkedin: "#",
    },
    {
      name: "Ing. Hery Rasolofo",
      role: "Responsable Technique",
      affiliation: "Université de Madagascar",
      expertise: "Développement logiciel, Bases de données spatiales",
      image: "/placeholder.svg?height=300&width=300",
      description: "Ingénieur informatique spécialisé dans le développement d'applications géospatiales.",
      email: "hery.rasolofo@madatlas.mg",
      linkedin: "#",
    },
    {
      name: "Dr. Lalaina Rakotonirina",
      role: "Chargée de Communication",
      affiliation: "Université de Madagascar",
      expertise: "Communication scientifique, Médiation",
      image: "/placeholder.svg?height=300&width=300",
      description: "Experte en communication scientifique et médiation des savoirs géographiques.",
      email: "lalaina.rakotonirina@madatlas.mg",
      linkedin: "#",
    },
  ]

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
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Notre Équipe</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Rencontrez les experts passionnés qui portent le projet Madatlas et développent l'expertise en cartographie
            numérique à Madagascar.
          </p>
        </div>
      </section>

      {/* Équipe principale */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Équipe de Direction</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe pluridisciplinaire d'experts reconnus dans leurs domaines respectifs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="font-medium text-emerald-600">{member.role}</div>
                    <div className="text-sm">{member.affiliation}</div>
                  </CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.split(", ").map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{member.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={member.linkedin} target="_blank">
                        <Linkedin className="h-4 w-4 mr-1" />
                        LinkedIn
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborateurs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Collaborateurs et Conseillers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Madatlas bénéficie également de l'expertise de collaborateurs et conseillers nationaux et internationaux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Collaborateur"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle className="text-lg">Prof. Michel Dubois</CardTitle>
                <CardDescription>
                  Université de Bordeaux
                  <br />
                  <span className="text-emerald-600">Conseiller Scientifique</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Collaborateur"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle className="text-lg">Dr. Fatima Al-Rashid</CardTitle>
                <CardDescription>
                  Université du Caire
                  <br />
                  <span className="text-emerald-600">Experte SIG</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Collaborateur"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle className="text-lg">Prof. James Mitchell</CardTitle>
                <CardDescription>
                  University of Edinburgh
                  <br />
                  <span className="text-emerald-600">Conseiller Technique</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Collaborateur"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <CardTitle className="text-lg">Dr. Aminata Traoré</CardTitle>
                <CardDescription>
                  Université de Dakar
                  <br />
                  <span className="text-emerald-600">Experte Développement</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Rejoindre l'équipe */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Rejoignez Notre Équipe</h2>
            <p className="text-xl text-emerald-100">
              Nous recherchons constamment de nouveaux talents pour enrichir notre équipe et contribuer au développement
              de la cartographie numérique à Madagascar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/careers">Voir les opportunités</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-emerald-600 bg-transparent"
                asChild
              >
                <Link href="/contact">Candidature spontanée</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

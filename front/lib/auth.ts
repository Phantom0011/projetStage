import axios, { type AxiosError } from "axios"

interface User {
  username: string
  role: "admin" | "user"
}

interface LoginCredentials {
  username: string
  password: string
}

interface RegisterData {
  username: string
  password: string
  role: "admin" | "user"
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

// Get API base URL with proper fallback
function getApiBaseUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (apiUrl && apiUrl.trim() !== "") {
    return apiUrl.trim()
  }
  return "http://localhost:8000"
}

const API_BASE_URL = getApiBaseUrl()

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeToken()
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

// Helper function to handle API errors
function handleApiError(error: any): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.detail) {
      return error.response.data.detail
    }
    if (error.response?.data?.message) {
      return error.response.data.message
    }
    if (error.message) {
      return error.message
    }
  }
  return "Une erreur inattendue s'est produite"
}

// Auth functions
export async function login(credentials: LoginCredentials): Promise<{ access_token: string; token_type: string }> {
  try {
    const formData = new FormData()
    formData.append("username", credentials.username)
    formData.append("password", credentials.password)

    const response = await apiClient.post("/auth/token", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export async function register(userData: RegisterData): Promise<{ message: string }> {
  try {
    const response = await apiClient.post("/register", userData)
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export async function getCurrentUser(token: string): Promise<User> {
  try {
    const response = await apiClient.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

// Posts functions
export async function getPosts(type?: string): Promise<Post[]> {
  try {
    const params = type ? { type } : {}
    const response = await apiClient.get("/posts", { params })
    return response.data.map((post: any) => ({
      ...post,
      excerpt: post.excerpt || "",
      category: post.category || "Non classé",
      date: post.date || new Date().toISOString().split("T")[0],
      readTime: post.readTime || "5 min",
      image: post.image || undefined,
      featured: post.featured || false,
      tags: Array.isArray(post.tags) ? post.tags : [],
    }))
  } catch (error) {
    console.error("Error fetching posts:", error)
    return getMockPosts()
  }
}

export async function getPost(id: number): Promise<Post> {
  try {
    const response = await apiClient.get(`/posts/${id}`)
    const post = response.data
    return {
      ...post,
      excerpt: post.excerpt || "",
      category: post.category || "Non classé",
      date: post.date || new Date().toISOString().split("T")[0],
      readTime: post.readTime || "5 min",
      image: post.image || undefined,
      featured: post.featured || false,
      tags: Array.isArray(post.tags) ? post.tags : [],
    }
  } catch (error) {
    console.error("Error fetching post:", error)
    const mockPosts = getMockPosts()
    const post = mockPosts.find((p) => p.id === id)
    if (post) {
      return post
    }
    throw new Error("Article non trouvé")
  }
}

export async function createPost(postData: Omit<Post, "id">, token: string): Promise<Post> {
  try {
    const response = await apiClient.post("/posts", postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export async function updatePost(id: number, postData: Partial<Post>, token: string): Promise<Post> {
  try {
    const response = await apiClient.put(`/posts/${id}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export async function deletePost(id: number, token: string): Promise<void> {
  try {
    await apiClient.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export async function uploadImage(file: File, token: string): Promise<{ url: string }> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await apiClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await apiClient.get("/categories")
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return ["Formation", "Partenariat", "Événement", "Technologie", "Recherche"]
  }
}

export async function getTags(): Promise<string[]> {
  try {
    const response = await apiClient.get("/tags")
    return response.data
  } catch (error) {
    console.error("Error fetching tags:", error)
    return []
  }
}

export async function getStats(): Promise<{
  totalPosts: number
  featuredPosts: number
  totalViews: number
  totalUsers: number
}> {
  try {
    const response = await apiClient.get("/stats")
    return response.data
  } catch (error) {
    console.error("Error fetching stats:", error)
    return {
      totalPosts: 0,
      featuredPosts: 0,
      totalViews: 0,
      totalUsers: 0,
    }
  }
}

// Mock data fallback (unchanged)
function getMockPosts(): Post[] {
  return [
    {
      id: 1,
      title: "Lancement officiel du programme Master en Cartographie Numérique",
      excerpt:
        "Le nouveau programme de Master spécialisé en cartographie numérique ouvre ses portes avec 25 étudiants sélectionnés.",
      content:
        "Après deux années de préparation intensive, l'Université de Madagascar lance officiellement son programme de Master en Cartographie Numérique. Ce programme innovant, fruit d'une collaboration étroite avec des universités internationales de renom, vise à former une nouvelle génération d'experts en géomatique et systèmes d'information géographique.\n\nLe cursus, d'une durée de deux ans, combine théorie avancée et pratique intensive. Les étudiants auront accès aux dernières technologies de cartographie numérique, incluant les systèmes de télédétection, l'analyse spatiale avancée, et les outils de modélisation territoriale.\n\nLes 25 étudiants sélectionnés pour cette première promotion proviennent de diverses disciplines : géographie, informatique, urbanisme, et sciences environnementales. Cette diversité enrichit les perspectives et favorise une approche interdisciplinaire essentielle dans le domaine de la cartographie moderne.\n\nLe programme bénéficie du soutien de partenaires internationaux, notamment l'Université de Bordeaux et l'Institut National de Géographie de France, qui apportent leur expertise et facilitent les échanges académiques.",
      category: "Formation",
      author: "Dr. Rakoto Andriamampianina",
      date: "2024-01-20",
      readTime: "5 min",
      image: "/placeholder.svg?height=300&width=500&text=Master+Cartographie+-+Cérémonie+lancement",
      featured: true,
      tags: ["Master", "Formation", "Cartographie", "Université"],
      type: "news",
    },
    {
      id: 2,
      title: "Partenariat stratégique avec l'Université de Bordeaux",
      excerpt:
        "Signature d'un accord de coopération pour le développement de la recherche en géomatique et l'échange d'étudiants.",
      content:
        "Un partenariat majeur vient d'être signé entre Madatlas et l'Université de Bordeaux, marquant une étape importante dans le développement de l'expertise cartographique à Madagascar. Cet accord de coopération académique ouvre de nouvelles perspectives pour la recherche en géomatique et facilite les échanges entre les deux institutions.\n\nL'accord prévoit plusieurs axes de collaboration : échanges d'étudiants et de chercheurs, projets de recherche conjoints, partage de ressources pédagogiques, et organisation d'événements scientifiques communs. Cette collaboration permettra aux étudiants malgaches d'accéder à des formations complémentaires en France, tandis que les étudiants bordelais pourront découvrir les spécificités de la cartographie tropicale.\n\nLe premier projet conjoint portera sur la cartographie des zones côtières vulnérables au changement climatique, combinant l'expertise française en modélisation et la connaissance locale des écosystèmes malgaches.",
      category: "Partenariat",
      author: "Prof. Marie Razafy",
      date: "2024-01-15",
      readTime: "4 min",
      image: "/placeholder.svg?height=300&width=500&text=Partenariat+Bordeaux+-+Signature+accord",
      featured: true,
      tags: ["Partenariat", "International", "Recherche", "Bordeaux"],
      type: "news",
    },
    {
      id: 3,
      title: "Premier hackathon cartographique malgache : un succès retentissant",
      excerpt:
        "Plus de 100 participants ont relevé le défi de cartographier les zones vulnérables aux cyclones à Madagascar.",
      content:
        "Le premier hackathon dédié à la cartographie numérique s'est tenu avec un succès remarquable, rassemblant plus de 100 participants venus de tout Madagascar. Pendant 48 heures intensives, développeurs, géographes, étudiants et professionnels ont collaboré pour créer des solutions innovantes de cartographie des risques cycloniques.\n\nL'événement, organisé dans les locaux de l'Université de Madagascar, a donné naissance à 15 projets finalisés. Le projet gagnant, développé par une équipe mixte d'étudiants en informatique et en géographie, propose une application mobile permettant aux communautés locales de signaler en temps réel les dégâts causés par les cyclones.\n\nCette initiative s'inscrit dans la volonté de Madatlas de démocratiser l'accès aux outils cartographiques et de sensibiliser le grand public aux enjeux de la géomatique. Les meilleures solutions développées lors du hackathon seront intégrées dans les projets de recherche en cours.",
      category: "Événement",
      author: "Ing. Hery Rasolofo",
      date: "2024-01-10",
      readTime: "6 min",
      image: "/placeholder.svg?height=300&width=500&text=Hackathon+Cartographie+-+Équipes+travail",
      featured: false,
      tags: ["Hackathon", "Innovation", "Cyclones", "Cartographie"],
      type: "news",
    },
    {
      id: 4,
      title: "Nouvelle plateforme de données géospatiales pour Madagascar",
      excerpt: "Lancement d'une plateforme open-source permettant l'accès aux données cartographiques de Madagascar.",
      content:
        "Madatlas dévoile sa nouvelle plateforme de données géospatiales, un outil révolutionnaire qui centralise et démocratise l'accès aux informations cartographiques de Madagascar. Cette plateforme open-source, développée en collaboration avec des partenaires techniques internationaux, marque un tournant dans la gestion des données territoriales du pays.\n\nLa plateforme intègre des données provenant de multiples sources : images satellites, relevés topographiques, données climatiques, informations socio-économiques, et cartographies thématiques. Les utilisateurs peuvent visualiser, analyser et télécharger ces données selon leurs besoins spécifiques.\n\nL'interface intuitive permet aux non-spécialistes d'accéder facilement aux informations, tandis que les fonctionnalités avancées satisfont les besoins des professionnels. La plateforme supporte les standards internationaux de données géospatiales et propose des API pour l'intégration dans d'autres systèmes.",
      category: "Technologie",
      author: "Dr. Jean-Pierre Ratsimba",
      date: "2024-01-05",
      readTime: "7 min",
      image: "/placeholder.svg?height=300&width=500&text=Plateforme+Géospatiale+-+Interface+données",
      featured: false,
      tags: ["Plateforme", "Open Source", "Données", "Géospatial"],
      type: "news",
    },
    {
      id: 5,
      title: "Formation continue : 50 professionnels certifiés en SIG",
      excerpt:
        "Le programme de formation continue a diplômé sa première promotion de professionnels en systèmes d'information géographique.",
      content:
        "La première session de formation continue s'achève avec succès, marquant une étape importante dans la professionnalisation du secteur géomatique à Madagascar. Cinquante professionnels issus de divers secteurs - urbanisme, environnement, agriculture, mines - ont obtenu leur certification en systèmes d'information géographique.\n\nCe programme intensif de six mois combine formation théorique et projets pratiques. Les participants ont travaillé sur des cas d'usage réels, depuis la cartographie des risques d'inondation jusqu'à l'optimisation des réseaux de transport urbain. Cette approche pratique garantit une application immédiate des compétences acquises.\n\nLe succès de cette première promotion confirme la pertinence de l'approche pédagogique adoptée par Madatlas. Une deuxième session est déjà programmée pour répondre à la forte demande du marché.",
      category: "Formation",
      author: "Dr. Sophie Randrianarisoa",
      date: "2023-12-28",
      readTime: "3 min",
      image: "/placeholder.svg?height=300&width=500&text=Formation+Continue+-+Remise+certificats",
      featured: false,
      tags: ["Formation Continue", "SIG", "Certification", "Professionnels"],
      type: "news",
    },
    {
      id: 6,
      title: "Conférence internationale sur la cartographie en Afrique",
      excerpt:
        "Madatlas organise la première conférence internationale dédiée aux défis cartographiques du continent africain.",
      content:
        "Une conférence majeure réunira les experts africains de la cartographie du 15 au 17 mars 2024 à Antananarivo. Cet événement inédit, organisé par Madatlas en partenariat avec l'Union Africaine, abordera les défis spécifiques de la cartographie sur le continent africain.\n\nLa conférence accueillera plus de 200 participants venus de 30 pays africains. Au programme : sessions techniques sur les innovations cartographiques, ateliers pratiques, présentations de projets nationaux, et discussions sur les politiques publiques en matière de géomatique.\n\nLes thématiques principales incluront la cartographie des ressources naturelles, la gestion des risques climatiques, l'urbanisation rapide, et les défis de la cartographie participative. Cette conférence vise à créer un réseau durable de coopération entre les acteurs africains de la cartographie.",
      category: "Événement",
      author: "Dr. Lalaina Rakotonirina",
      date: "2023-12-20",
      readTime: "5 min",
      image: "/placeholder.svg?height=300&width=500&text=Conférence+Afrique+-+Experts+cartographie",
      featured: false,
      tags: ["Conférence", "Afrique", "International", "Experts"],
      type: "news",
    },
  ]
}

// Token management
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)
  }
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
  }
}

export { apiClient }
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
    return []
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
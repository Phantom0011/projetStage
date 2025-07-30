"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { login as apiLogin, register as apiRegister, getCurrentUser, getToken, setToken, removeToken } from "@/lib/auth"

interface User {
  username: string
  role: "admin" | "user"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string, role: "admin" | "user") => Promise<void>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken()
      if (token) {
        try {
          const userData = await getCurrentUser(token)
          setUser(userData)
        } catch (error) {
          removeToken()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await apiLogin({ username, password })
      setToken(response.access_token)
      const userData = await getCurrentUser(response.access_token)
      setUser(userData)
    } catch (error) {
      throw error
    }
  }

  const register = async (username: string, password: string, role: "admin" | "user") => {
    try {
      await apiRegister({ username, password, role })
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    removeToken()
    setUser(null)
  }

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

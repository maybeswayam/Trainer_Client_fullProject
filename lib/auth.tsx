"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

// User types
export type UserRole = "trainer" | "client"

export interface User {
  id: string
  username: string
  role: UserRole
  name: string
  email?: string
  avatar?: string
}

export interface Trainer extends User {
  role: "trainer"
  specialization: string
  clientIds: string[]
}

export interface Client extends User {
  role: "client"
  trainerId: string
  phase: string
  week: number
  startDate: string
  targetWeight: number
  startWeight: number
}

type AuthState = { 
  authenticated: boolean
  user: User | null
}

const AuthCtx = createContext<{
  auth: AuthState
  checkCredentials: (username: string, password: string) => { valid: boolean; user: User | null }
  login: (username: string, password: string) => boolean
  logout: () => void
  currentUser: User | null
  isTrainer: boolean
  isClient: boolean
}>({
  auth: { authenticated: false, user: null },
  checkCredentials: () => ({ valid: false, user: null }),
  login: () => false,
  logout: () => {},
  currentUser: null,
  isTrainer: false,
  isClient: false,
})

const SESSION_KEY = "transform_os_auth"
const USER_KEY = "transform_os_user"

// Demo trainers database
export const TRAINERS: Record<string, { password: string; data: Trainer }> = {
  krishna: {
    password: "trainer123",
    data: {
      id: "trainer-001",
      username: "krishna",
      role: "trainer",
      name: "Krishna Joshi",
      email: "krishna@transformos.com",
      specialization: "Strength & Conditioning",
      clientIds: ["sam", "jessica", "marcus", "elena", "david"],
    },
  },
  priya: {
    password: "trainer456",
    data: {
      id: "trainer-002",
      username: "priya",
      role: "trainer",
      name: "Priya Sharma",
      email: "priya@transformos.com",
      specialization: "Nutrition & Weight Loss",
      clientIds: ["amit", "neha"],
    },
  },
}

// Demo clients database
export const CLIENTS: Record<string, { password: string; data: Client }> = {
  sam: {
    password: "client123",
    data: {
      id: "client-001",
      username: "sam",
      role: "client",
      name: "Sam",
      email: "sam@email.com",
      trainerId: "trainer-001",
      phase: "Build",
      week: 3,
      startDate: "2026-05-04",
      startWeight: 112,
      targetWeight: 100,
    },
  },
  jessica: {
    password: "client123",
    data: {
      id: "client-002",
      username: "jessica",
      role: "client",
      name: "Jessica Thompson",
      email: "jessica@email.com",
      trainerId: "trainer-001",
      phase: "Build",
      week: 4,
      startDate: "2026-04-28",
      startWeight: 72,
      targetWeight: 65,
    },
  },
  marcus: {
    password: "client123",
    data: {
      id: "client-003",
      username: "marcus",
      role: "client",
      name: "Marcus Peterson",
      email: "marcus@email.com",
      trainerId: "trainer-001",
      phase: "Load",
      week: 8,
      startDate: "2026-03-15",
      startWeight: 95,
      targetWeight: 88,
    },
  },
  elena: {
    password: "client123",
    data: {
      id: "client-004",
      username: "elena",
      role: "client",
      name: "Elena Rodriguez",
      email: "elena@email.com",
      trainerId: "trainer-001",
      phase: "Re-Entry",
      week: 1,
      startDate: "2026-05-10",
      startWeight: 71,
      targetWeight: 66,
    },
  },
  david: {
    password: "client123",
    data: {
      id: "client-005",
      username: "david",
      role: "client",
      name: "David Kim",
      email: "david@email.com",
      trainerId: "trainer-001",
      phase: "Peak",
      week: 14,
      startDate: "2026-01-20",
      startWeight: 92,
      targetWeight: 82,
    },
  },
  // Legacy support for old credentials
  maybesam: {
    password: "F2uz57yj92@",
    data: {
      id: "client-001",
      username: "sam",
      role: "client",
      name: "Sam",
      email: "sam@email.com",
      trainerId: "trainer-001",
      phase: "Build",
      week: 3,
      startDate: "2026-05-04",
      startWeight: 112,
      targetWeight: 100,
    },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ authenticated: false, user: null })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem(SESSION_KEY)
    const userStored = localStorage.getItem(USER_KEY)
    
    if (stored === "true" && userStored) {
      try {
        const user = JSON.parse(userStored) as User
        setAuth({ authenticated: true, user })
      } catch {
        setAuth({ authenticated: false, user: null })
      }
    }
    setReady(true)
  }, [])

  const checkCredentials = useCallback((username: string, password: string): { valid: boolean; user: User | null } => {
    const normalizedUsername = username.toLowerCase().trim()
    
    // Debug logging for production troubleshooting
    if (typeof window !== "undefined") {
      console.log("[v0] Auth check - Username:", normalizedUsername)
      console.log("[v0] Auth check - Available trainers:", Object.keys(TRAINERS))
      console.log("[v0] Auth check - Available clients:", Object.keys(CLIENTS))
    }
    
    // Check trainers
    const trainer = TRAINERS[normalizedUsername]
    if (trainer && trainer.password === password) {
      console.log("[v0] Auth check - Trainer match found")
      return { valid: true, user: trainer.data }
    }
    
    // Check clients
    const client = CLIENTS[normalizedUsername]
    if (client && client.password === password) {
      console.log("[v0] Auth check - Client match found")
      return { valid: true, user: client.data }
    }
    
    console.log("[v0] Auth check - No match found")
    return { valid: false, user: null }
  }, [])

  const login = useCallback((username: string, password: string): boolean => {
    const result = checkCredentials(username, password)
    if (result.valid && result.user) {
      localStorage.setItem(SESSION_KEY, "true")
      localStorage.setItem(USER_KEY, JSON.stringify(result.user))
      setAuth({ authenticated: true, user: result.user })
      return true
    }
    return false
  }, [checkCredentials])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(USER_KEY)
    setAuth({ authenticated: false, user: null })
  }, [])

  // Don't render children until we've checked storage
  if (!ready) return null

  const currentUser = auth.user
  const isTrainer = currentUser?.role === "trainer"
  const isClient = currentUser?.role === "client"

  return (
    <AuthCtx.Provider value={{ 
      auth, 
      checkCredentials, 
      login, 
      logout, 
      currentUser,
      isTrainer,
      isClient
    }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthCtx)
  
  // Debug: Check if context is the default (meaning AuthProvider is missing)
  if (typeof window !== "undefined" && context.login.toString().includes("() => false")) {
    console.error("[v0] WARNING: useAuth is using default context. AuthProvider may not be wrapping the app correctly!")
  }
  
  return context
}

// Helper to get trainer's clients
export function getTrainerClients(trainerId: string): Client[] {
  return Object.values(CLIENTS)
    .filter(c => c.data.trainerId === trainerId)
    .map(c => c.data)
}

// Helper to get client's trainer
export function getClientTrainer(clientId: string): Trainer | null {
  const client = Object.values(CLIENTS).find(c => c.data.id === clientId)
  if (!client) return null
  
  const trainer = Object.values(TRAINERS).find(t => t.data.id === client.data.trainerId)
  return trainer?.data || null
}

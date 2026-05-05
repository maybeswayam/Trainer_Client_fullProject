"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

type AuthState = { authenticated: boolean }

const AuthCtx = createContext<{
  auth: AuthState
  checkCredentials: (user: string, pass: string) => boolean
  login: (user: string, pass: string) => boolean
  logout: () => void
}>({
  auth: { authenticated: false },
  checkCredentials: () => false,
  login: () => false,
  logout: () => {},
})

const SESSION_KEY = "samForge_auth"

// Hardcoded single-user credentials
const VALID_USER = "maybesam"
const VALID_PASS = "F2uz57yj92@"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ authenticated: false })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored === "true") setAuth({ authenticated: true })
    setReady(true)
  }, [])

  const checkCredentials = useCallback((user: string, pass: string): boolean => {
    return user === VALID_USER && pass === VALID_PASS
  }, [])

  const login = useCallback((user: string, pass: string): boolean => {
    if (checkCredentials(user, pass)) {
      localStorage.setItem(SESSION_KEY, "true")
      setAuth({ authenticated: true })
      return true
    }
    return false
  }, [checkCredentials])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setAuth({ authenticated: false })
  }, [])

  // Don't render children until we've checked sessionStorage (avoids flash)
  if (!ready) return null

  return (
    <AuthCtx.Provider value={{ auth, checkCredentials, login, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  return useContext(AuthCtx)
}

"use client"

import type React from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { MobileNav } from "./mobile-nav"
import { AuthProvider, useAuth } from "@/lib/auth"
import { LoginScreen } from "./login-screen"

function AuthGate({ children }: { children: React.ReactNode }) {
  const { auth, isClient, isTrainer } = useAuth()

  // Not authenticated - show login
  if (!auth.authenticated) {
    return <LoginScreen />
  }

  // Authenticated as trainer trying to access client area - still allow (they can view)
  // but could redirect them to trainer portal
  // For demo purposes, we allow trainers to also view the client portal

  return (
    <div className="h-[100dvh] flex overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col lg:pl-[240px] overflow-y-auto overflow-x-hidden">
        <Topbar />
        <main className="flex-1 min-w-0 pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-12">{children}</main>
      </div>
      <MobileNav />
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  )
}

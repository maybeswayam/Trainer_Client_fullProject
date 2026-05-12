"use client"

import { TrainerSidebar } from "./trainer-sidebar"
import { TrainerTopbar } from "./trainer-topbar"
import { AuthProvider, useAuth } from "@/lib/auth"
import { TrainerLoginScreen } from "./trainer-login-screen"

function AuthGate({ children }: { children: React.ReactNode }) {
  const { auth, isTrainer } = useAuth()

  // Not authenticated at all
  if (!auth?.authenticated) {
    return <TrainerLoginScreen />
  }

  // Authenticated but not as trainer - still show login to get trainer credentials
  if (!isTrainer) {
    return <TrainerLoginScreen />
  }

  return (
    <div className="h-[100dvh] flex overflow-hidden bg-background text-foreground">
      <TrainerSidebar />
      <div className="flex-1 min-w-0 flex flex-col lg:pl-[240px] overflow-y-auto overflow-x-hidden">
        <TrainerTopbar />
        <main className="flex-1 min-w-0 pt-[60px] lg:pt-0 pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-12">
          {children}
        </main>
      </div>
    </div>
  )
}

export function TrainerShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  )
}

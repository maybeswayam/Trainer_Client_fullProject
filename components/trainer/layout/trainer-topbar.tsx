"use client"

import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { LogOut, ShieldCheck } from "lucide-react"

export function TrainerTopbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser, logout } = useAuth()
  
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Get page title based on path
  const getTitle = () => {
    if (pathname.includes("/client/")) {
      const clientId = pathname.split("/client/")[1]?.split("/")[0]
      if (clientId) {
        return `${clientId.toUpperCase()}'S OVERVIEW`
      }
    }
    return "TRAINER PORTAL"
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-background/95 backdrop-blur-md border-b border-border z-30 lg:hidden flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-amber-dim">
          <ShieldCheck className="w-4 h-4 text-brand-amber" />
        </div>
        <div className="font-display tracking-widest text-lg">
          {getTitle()}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:block">
          {currentUser?.name}
        </span>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-colors"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}

"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { PLAN_NAV, TRACKER_NAV } from "@/lib/data/navigation"
import { useAuth } from "@/lib/auth"
import { LogOut, UserCircle } from "lucide-react"

function getPageLabel(pathname: string): string {
  if (pathname === "/" || pathname === "/dashboard") return "HOME"
  const all = [...PLAN_NAV, ...TRACKER_NAV]
  const found = all.find((i) => i.href === pathname)
  if (found) return found.label.toUpperCase()
  return pathname.replace(/^\//, "").replace(/-/g, " ").toUpperCase()
}

export function Topbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, currentUser } = useAuth()
  const label = getPageLabel(pathname)
  const [dateLabel, setDateLabel] = useState<string>("")

  useEffect(() => {
    const d = new Date()
    const opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "2-digit", month: "short" }
    setDateLabel(d.toLocaleDateString("en-IN", opts).toUpperCase())
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const userName = currentUser?.name || "Sam"
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border"
      role="banner"
    >
      <div className="flex items-center justify-between px-4 lg:px-8 h-14">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile compact logo */}
          <Link href="/dashboard" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-green-dim">
              <UserCircle className="w-4 h-4 text-brand-green" />
            </div>
            <span className="font-display text-lg leading-none tracking-wider">{userName.toUpperCase()}</span>
            <span className="text-primary font-display text-lg leading-none">.</span>
          </Link>
          <div className="hidden lg:block">
            <span className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              {label}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            {dateLabel || "---"}
          </div>
          
          {/* Mobile logout button */}
          <button
            onClick={handleLogout}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}

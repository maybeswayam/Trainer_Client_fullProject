"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth"
import { LogOut } from "lucide-react"

export function TrainerSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] flex-col border-r border-border bg-background z-40"
      aria-label="Trainer navigation"
    >
      <Link
        href="/trainer/dashboard"
        className="px-6 pt-6 pb-5 border-b border-border block hover:opacity-80 transition-opacity"
      >
        <div className="font-display text-3xl leading-none tracking-wider flex flex-col">
          <span>PORTAL<span className="text-primary">.</span></span>
        </div>
        <div className="font-mono-ui text-[10px] text-muted-foreground mt-1.5 uppercase tracking-[0.15em]">
          Krishna Joshi — Trainer
        </div>
      </Link>

      <div className="px-3 pt-5">
        <div className="px-3 pb-2 font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          Roster
        </div>
        <ul className="flex flex-col">
          <li>
            <Link
              href="/trainer/dashboard"
              className={cn(
                "group flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors",
                pathname.startsWith("/trainer")
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4 shrink-0", pathname.startsWith("/trainer/dashboard") || pathname.match(/\/trainer\/client/) ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span className="truncate">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={cn(
                "mt-4 group flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-surface"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span className="truncate">Exit to Client App</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-auto px-6 py-5 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="font-display text-base tracking-wider">KJ PORTAL</div>
          <button
            onClick={logout}
            title="Sign out"
            className="text-faint hover:text-brand-red transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}

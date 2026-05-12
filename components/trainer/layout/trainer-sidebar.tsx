"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth"
import { LogOut, Users, LayoutDashboard, Home, ShieldCheck, BarChart3, Settings } from "lucide-react"

export function TrainerSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, currentUser } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const trainerName = currentUser?.name || "Krishna Joshi"
  const trainerInitials = trainerName.split(" ").map(n => n[0]).join("")

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] flex-col border-r border-border bg-background z-40"
      aria-label="Trainer navigation"
    >
      {/* Header */}
      <Link
        href="/trainer/dashboard"
        className="px-6 pt-6 pb-5 border-b border-border block hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-amber-dim border border-brand-amber/20">
            <ShieldCheck className="w-5 h-5 text-brand-amber" />
          </div>
          <div>
            <div className="font-display text-xl leading-none tracking-wider">
              TRANSFORM<span className="text-brand-amber">.</span>
            </div>
            <div className="font-mono-ui text-[9px] text-muted-foreground mt-1 uppercase tracking-[0.15em]">
              Trainer Portal
            </div>
          </div>
        </div>
      </Link>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-2 border border-border">
            <span className="font-mono-ui text-xs font-medium text-muted-foreground">{trainerInitials}</span>
          </div>
          <div>
            <div className="text-sm font-medium">{trainerName}</div>
            <div className="font-mono-ui text-[9px] text-muted-foreground uppercase tracking-wider">
              Strength & Conditioning
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-3 pt-5 flex-1">
        <div className="px-3 pb-2 font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          Management
        </div>
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              href="/trainer/dashboard"
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors",
                pathname === "/trainer/dashboard"
                  ? "bg-brand-amber/10 text-brand-amber border border-brand-amber/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
              )}
            >
              <LayoutDashboard className={cn(
                "h-4 w-4 shrink-0",
                pathname === "/trainer/dashboard" ? "text-brand-amber" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="truncate">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/trainer/dashboard"
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors",
                pathname.includes("/trainer/client")
                  ? "bg-surface-2 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
              )}
            >
              <Users className={cn(
                "h-4 w-4 shrink-0",
                pathname.includes("/trainer/client") ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="truncate">Clients</span>
              <span className="ml-auto font-mono-ui text-[10px] bg-surface-2 px-1.5 py-0.5 rounded text-muted-foreground">
                5
              </span>
            </Link>
          </li>
          <li>
            <button
              disabled
              className="w-full group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors text-muted-foreground/50 cursor-not-allowed"
            >
              <BarChart3 className="h-4 w-4 shrink-0" />
              <span className="truncate">Analytics</span>
              <span className="ml-auto font-mono-ui text-[8px] bg-surface-2 px-1.5 py-0.5 rounded uppercase">
                Soon
              </span>
            </button>
          </li>
          <li>
            <button
              disabled
              className="w-full group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors text-muted-foreground/50 cursor-not-allowed"
            >
              <Settings className="h-4 w-4 shrink-0" />
              <span className="truncate">Settings</span>
              <span className="ml-auto font-mono-ui text-[8px] bg-surface-2 px-1.5 py-0.5 rounded uppercase">
                Soon
              </span>
            </button>
          </li>
        </ul>

        <div className="px-3 pb-2 pt-6 font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          Quick Actions
        </div>
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              href="/"
              className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors text-muted-foreground hover:text-foreground hover:bg-surface-2"
            >
              <Home className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
              <span className="truncate">Portal Home</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-brand-red hover:bg-brand-red-dim transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
        <div className="text-center mt-3 font-mono-ui text-[8px] text-faint uppercase tracking-wider">
          Transform OS v4.0
        </div>
      </div>
    </aside>
  )
}

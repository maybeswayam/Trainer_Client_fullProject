"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PLAN_NAV, TRACKER_NAV, type NavItem } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth"
import { LogOut } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] flex-col border-r border-border bg-background z-40"
      aria-label="Primary navigation"
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        className="px-6 pt-6 pb-5 border-b border-border block hover:opacity-80 transition-opacity"
      >
        <div className="font-display text-3xl leading-none tracking-wider">
          SAM<span className="text-primary">.</span>
        </div>
        <div className="font-mono-ui text-[10px] text-muted-foreground mt-1.5 uppercase tracking-[0.15em]">
          Transformation OS
        </div>
      </Link>

      {/* Plan section */}
      <NavSection title="Plan" items={PLAN_NAV} pathname={pathname} />

      {/* Tracker section */}
      <NavSection title="Tracker" items={TRACKER_NAV} pathname={pathname} />

      {/* Trainer Portal */}
      <div className="px-3 pt-5">
        <div className="px-3 pb-2 font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          Trainer Portal
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
              <span className={cn("font-mono-ui text-[10px] w-5 shrink-0", pathname.startsWith("/trainer") ? "text-primary" : "text-faint group-hover:text-muted-foreground")}>
                TR
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4 shrink-0", pathname.startsWith("/trainer") ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span className="truncate">Roster Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer block */}
      <div className="mt-auto px-6 py-5 border-t border-border">
        <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-1">
          May 4 → Aug 31
        </div>
        <div className="flex items-center justify-between">
          <div className="font-display text-base tracking-wider">17 WEEKS · 5 PHASES</div>
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

function NavSection({
  title,
  items,
  pathname,
}: {
  title: string
  items: NavItem[]
  pathname: string
}) {
  return (
    <div className="px-3 pt-5">
      <div className="px-3 pb-2 font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
        {title}
      </div>
      <ul className="flex flex-col">
        {items.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors",
                  active
                    ? "bg-surface-2 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface"
                )}
              >
                <span
                  className={cn(
                    "font-mono-ui text-[10px] w-5 shrink-0",
                    active ? "text-primary" : "text-faint group-hover:text-muted-foreground"
                  )}
                >
                  {item.index}
                </span>
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                  strokeWidth={1.5}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CalendarDays, LayoutGrid, PenLine, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { PLAN_NAV, TRACKER_NAV } from "@/lib/data/navigation"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const items = [
    { label: "Home", href: "/dashboard", icon: Home },
    { label: "Plan", href: "/plan/weekly-calendar", icon: CalendarDays },
    { label: "Log", href: "/tracker/log-today", icon: PenLine },
    { label: "Track", href: "/tracker/dashboard", icon: LayoutGrid },
  ]

  return (
    <>
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom)]"
        aria-label="Mobile navigation"
      >
        <div className="grid grid-cols-5">
          {items.map((it) => {
            const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(it.href.split("/").slice(0, 3).join("/")))
            const Icon = it.icon
            return (
              <Link
                key={it.href}
                href={it.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 font-mono-ui text-[9px] uppercase tracking-wider transition-colors",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                {it.label}
              </Link>
            )
          })}
          <button
            onClick={() => setOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-2.5 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-[18px] w-[18px]" strokeWidth={1.5} />
            More
          </button>
        </div>
      </nav>

      {/* Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-[340px] bg-background border-l border-border overflow-y-auto">
            <div className="px-5 pt-6 pb-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="font-display text-2xl leading-none tracking-wider">
                  SAM<span className="text-primary">.</span>
                </div>
                <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em] mt-1">
                  Transformation OS
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider px-3 py-1.5 border border-border rounded-md"
              >
                Close
              </button>
            </div>
            <div className="px-3 py-4">
              <Section title="Plan" items={PLAN_NAV} pathname={pathname} onClick={() => setOpen(false)} />
              <Section title="Tracker" items={TRACKER_NAV} pathname={pathname} onClick={() => setOpen(false)} />
              
              <div className="pt-3">
                <div className="px-3 pb-2 font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
                  Trainer Portal
                </div>
                <ul className="flex flex-col">
                  <li>
                    <Link
                      href="/trainer/dashboard"
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-md text-sm",
                        pathname.startsWith("/trainer") ? "bg-surface-2 text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span className={cn("font-mono-ui text-[10px] w-5", pathname.startsWith("/trainer") ? "text-primary" : "text-faint")}>
                        TR
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      <span>Roster Dashboard</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Section({
  title,
  items,
  pathname,
  onClick,
}: {
  title: string
  items: typeof PLAN_NAV
  pathname: string
  onClick: () => void
}) {
  return (
    <div className="pt-3">
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
                onClick={onClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-md text-sm",
                  active ? "bg-surface-2 text-foreground" : "text-muted-foreground"
                )}
              >
                <span className={cn("font-mono-ui text-[10px] w-5", active ? "text-primary" : "text-faint")}>
                  {item.index}
                </span>
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

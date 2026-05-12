"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { PLAN_NAV, TRACKER_NAV, type NavItem } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth"
import { LogOut, UserCircle, ShieldCheck } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, currentUser, isTrainer } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const userName = currentUser?.name || "Sam"
  const userInitial = userName.charAt(0).toUpperCase()

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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-green-dim border border-brand-green/20">
            <UserCircle className="w-5 h-5 text-brand-green" />
          </div>
          <div>
            <div className="font-display text-xl leading-none tracking-wider">
              {userName.toUpperCase()}<span className="text-primary">.</span>
            </div>
            <div className="font-mono-ui text-[9px] text-muted-foreground mt-1 uppercase tracking-[0.15em]">
              Transformation OS
            </div>
          </div>
        </div>
      </Link>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20">
            <span className="font-mono-ui text-xs font-medium text-primary">{userInitial}</span>
          </div>
          <div>
            <div className="text-sm font-medium">{userName}</div>
            <div className="font-mono-ui text-[9px] text-muted-foreground uppercase tracking-wider">
              {isTrainer ? "Trainer View" : "Client"}
            </div>
          </div>
        </div>
      </div>

      {/* Plan section */}
      <NavSection title="Plan" items={PLAN_NAV} pathname={pathname} />

      {/* Tracker section */}
      <NavSection title="Tracker" items={TRACKER_NAV} pathname={pathname} />

      {/* Trainer Portal - Only show if trainer or add link for quick access */}
      <div className="px-3 pt-5">
        <div className="px-3 pb-2 font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          {isTrainer ? "Trainer Access" : "Quick Links"}
        </div>
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              href="/trainer/dashboard"
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors",
                pathname.startsWith("/trainer")
                  ? "bg-brand-amber/10 text-brand-amber border border-brand-amber/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
              )}
            >
              <ShieldCheck className={cn(
                "h-4 w-4 shrink-0",
                pathname.startsWith("/trainer") ? "text-brand-amber" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="truncate">Trainer Portal</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer block */}
      <div className="mt-auto px-6 py-4 border-t border-border">
        <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-2">
          May 4 - Aug 31
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="font-display text-sm tracking-wider">17 WEEKS - 5 PHASES</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-brand-red hover:bg-brand-red-dim transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
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
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-colors",
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

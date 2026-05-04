"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { PLAN_NAV, TRACKER_NAV } from "@/lib/data/navigation"

function getPageLabel(pathname: string): string {
  if (pathname === "/") return "HOME"
  const all = [...PLAN_NAV, ...TRACKER_NAV]
  const found = all.find((i) => i.href === pathname)
  if (found) return found.label.toUpperCase()
  return pathname.replace(/^\//, "").toUpperCase()
}

export function Topbar() {
  const pathname = usePathname()
  const label = getPageLabel(pathname)
  const [dateLabel, setDateLabel] = useState<string>("")

  useEffect(() => {
    const d = new Date()
    const opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "2-digit", month: "short" }
    setDateLabel(d.toLocaleDateString("en-IN", opts).toUpperCase())
  }, [])

  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border"
      role="banner"
    >
      <div className="flex items-center justify-between px-4 lg:px-8 h-12">
        <div className="flex items-center gap-2 min-w-0">
          {/* Mobile compact logo */}
          <Link href="/" className="lg:hidden flex items-baseline gap-1.5 mr-2">
            <span className="font-display text-lg leading-none tracking-wider">SAM</span>
            <span className="text-primary font-display text-lg leading-none">.</span>
          </Link>
          <span className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            {label}
          </span>
        </div>
        <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          {dateLabel || "—"}
        </div>
      </div>
    </header>
  )
}

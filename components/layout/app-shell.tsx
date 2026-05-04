"use client"

import type React from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { MobileNav } from "./mobile-nav"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col lg:pl-[240px]">
        <Topbar />
        <main className="flex-1 min-w-0 pb-24 lg:pb-12">{children}</main>
      </div>
      <MobileNav />
    </div>
  )
}

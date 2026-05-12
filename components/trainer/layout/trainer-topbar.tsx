"use client"

import { usePathname } from "next/navigation"

export function TrainerTopbar() {
  const pathname = usePathname()
  
  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-background/95 backdrop-blur-md border-b border-border z-30 lg:hidden flex items-center justify-center px-4">
      <div className="font-display tracking-widest text-lg">
        {pathname.includes("/client/sam") ? "SAM'S OVERVIEW" : "TRAINER PORTAL"}
      </div>
    </header>
  )
}

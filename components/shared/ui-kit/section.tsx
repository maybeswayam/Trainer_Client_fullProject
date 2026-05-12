import { cn } from "@/lib/utils"
import type React from "react"

export function PageContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("max-w-[1400px] mx-auto px-4 lg:px-8 py-6 lg:py-10", className)}>{children}</div>
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  accent,
  children,
}: {
  eyebrow?: React.ReactNode
  title: string
  subtitle?: string
  accent?: string
  children?: React.ReactNode
}) {
  return (
    <div className="border-b border-border pb-8 mb-8 lg:mb-10">
      {eyebrow && (
        <div className="mb-4 font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          {eyebrow}
        </div>
      )}
      <h1 className="font-display text-[44px] sm:text-[60px] lg:text-[76px] leading-[0.92] tracking-wide text-balance">
        {title.split(" ").map((word, i) => (
          <span key={i}>
            {i > 0 && " "}
            {i === title.split(" ").length - 1 && accent ? <span style={{ color: accent }}>{word}</span> : word}
          </span>
        ))}
      </h1>
      {subtitle && (
        <p className="mt-5 max-w-[640px] text-[14px] text-muted-foreground leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}

export function SectionLabel({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string
  title: string
  className?: string
}) {
  return (
    <div className={cn("mb-5", className)}>
      {eyebrow && (
        <div className="font-mono-ui text-[10px] text-primary uppercase tracking-[0.2em] mb-1.5">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-[28px] lg:text-[34px] leading-none tracking-wide">{title}</h2>
    </div>
  )
}

export function StatChip({
  label,
  value,
  accent = "var(--brand-green)",
}: {
  label: string
  value: string
  accent?: string
}) {
  return (
    <div className="bg-surface-2 border border-border-strong rounded-md px-3 py-2.5 min-w-[120px]">
      <div className="font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </div>
      <div className="font-mono-ui text-[14px] mt-0.5" style={{ color: accent }}>
        {value}
      </div>
    </div>
  )
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-border my-8", className)} />
}

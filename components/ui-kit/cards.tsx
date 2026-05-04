import type React from "react"
import { cn } from "@/lib/utils"

export function SurfaceCard({
  children,
  className,
  hoverable = false,
}: {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
}) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-xl p-5",
        hoverable && "transition-colors hover:border-border-strong",
        className
      )}
    >
      {children}
    </div>
  )
}

export function StatCard({
  label,
  value,
  sub,
  color,
  delta,
}: {
  label: string
  value: string | number
  sub?: string
  color?: string
  delta?: { value: string; positive?: boolean }
}) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 lg:p-5">
      <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
        {label}
      </div>
      <div
        className="font-display text-[32px] lg:text-[38px] leading-none tracking-wide"
        style={{ color: color ?? "var(--foreground)" }}
      >
        {value}
      </div>
      {sub && <div className="text-[11px] text-muted-foreground mt-1.5">{sub}</div>}
      {delta && (
        <div
          className="font-mono-ui text-[11px] mt-1.5"
          style={{ color: delta.positive ? "var(--brand-green)" : "var(--brand-red)" }}
        >
          {delta.value}
        </div>
      )}
    </div>
  )
}

export function Pill({
  children,
  active,
  onClick,
  color,
  className,
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
  color?: string
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-mono-ui text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-md border transition-colors",
        active ? "text-foreground" : "text-muted-foreground border-border hover:border-border-strong hover:text-foreground",
        className
      )}
      style={
        active
          ? {
              borderColor: color ?? "var(--brand-green)",
              color: color ?? "var(--brand-green)",
              background: color ? `${color}1c` : "var(--brand-green-dim)",
            }
          : undefined
      }
    >
      {children}
    </button>
  )
}

export function PhaseBadge({
  num,
  name,
  weeksLabel,
  hex,
}: {
  num: number
  name: string
  weeksLabel: string
  hex: string
}) {
  return (
    <div
      className="rounded-md border-t-2 bg-surface px-4 pt-4 pb-3.5 transition-colors"
      style={{ borderTopColor: hex }}
    >
      <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Phase {String(num).padStart(2, "0")}
      </div>
      <div className="font-display text-[22px] leading-none mt-1.5 tracking-wide" style={{ color: hex }}>
        {name}
      </div>
      <div className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-2">
        {weeksLabel}
      </div>
    </div>
  )
}

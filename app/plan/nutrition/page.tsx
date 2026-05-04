"use client"

import { useState } from "react"
import { PageContainer, PageHeader, SectionLabel } from "@/components/ui-kit/section"
import {
  MACROS,
  MESS_MENU,
  PROTEIN_BLUEPRINT,
  PROTEIN_SOURCES,
  VERDICT_META,
  type Verdict,
} from "@/lib/data/nutrition"
import { cn } from "@/lib/utils"
import { Apple, Beef, Drumstick, Flame, Salad, Wheat } from "lucide-react"

const MACRO_ICON: Record<string, typeof Apple> = {
  "Target kcal": Flame,
  Protein: Drumstick,
  Carbs: Wheat,
  Fats: Beef,
  "Expected loss": Salad,
  Water: Apple,
}

export default function NutritionPage() {
  const [activeDay, setActiveDay] = useState(0)
  const day = MESS_MENU[activeDay]

  return (
    <PageContainer>
      <PageHeader
        eyebrow="05 · Plan"
        title="Nutrition Guide"
        accent="var(--brand-green)"
        subtitle="Mess + own food protocol. Two food environments — one macro target. Designed to be repeatable on the worst days, not the best ones."
      />

      <SectionLabel eyebrow="The math" title="Daily macro targets" />

      {/* Macro grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-12">
        {MACROS.map((m) => {
          const Icon = MACRO_ICON[m.label] ?? Apple
          return (
            <div key={m.label} className="bg-surface border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {m.label}
                </div>
                <Icon className="h-4 w-4" style={{ color: m.color }} strokeWidth={1.5} />
              </div>
              <div className="font-display text-2xl leading-none tracking-wide" style={{ color: m.color }}>
                {m.value}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{m.sub}</div>
            </div>
          )
        })}
      </div>

      <SectionLabel eyebrow="Engineered protein, hour by hour" title="Protein blueprint — 140g+/day" />

      {/* Protein blueprint timeline */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden mb-12">
        {PROTEIN_BLUEPRINT.map((row, i) => (
          <div
            key={row.window}
            className={cn(
              "grid grid-cols-12 gap-3 px-4 sm:px-5 py-4",
              i !== PROTEIN_BLUEPRINT.length - 1 && "border-b border-border"
            )}
          >
            <div className="col-span-12 sm:col-span-3">
              <div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {row.window.split(" · ")[0]}
              </div>
              <div className="font-display text-base mt-1 tracking-wide">
                {row.window.split(" · ")[1] ?? ""}
              </div>
            </div>
            <div className="col-span-7 sm:col-span-6 text-[13px] leading-relaxed">
              <div className="text-foreground">{row.eat}</div>
              <div className="text-[12px] text-muted-foreground mt-1">{row.note}</div>
            </div>
            <div className="col-span-5 sm:col-span-3 sm:text-right flex sm:justify-end items-start">
              <span
                className="font-mono-ui text-[12px] inline-block px-2.5 py-1 rounded-md border"
                style={{
                  background: "var(--brand-green-dim)",
                  borderColor: "rgba(184,245,160,0.2)",
                  color: "var(--brand-green)",
                }}
              >
                {row.protein}
              </span>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel eyebrow="Where the protein comes from" title="Sources & timing" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
        {PROTEIN_SOURCES.map((s) => (
          <div
            key={s.source}
            className={cn(
              "bg-surface border rounded-xl p-4",
              s.tier === "primary" ? "border-border-strong" : "border-border"
            )}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="font-medium text-[13.5px]">{s.source}</div>
              <span
                className="font-mono-ui text-[12px] px-2 py-0.5 rounded shrink-0"
                style={{
                  color: "var(--brand-green)",
                  background: "var(--brand-green-dim)",
                }}
              >
                {s.protein}
              </span>
            </div>
            <div className="text-[12px] text-muted-foreground leading-relaxed">{s.when}</div>
          </div>
        ))}
      </div>

      <SectionLabel eyebrow="Mess menu — verdict per meal" title="Eat / skip / replace — by day" />

      {/* Day selector */}
      <div className="flex flex-wrap gap-2 mb-5">
        {MESS_MENU.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setActiveDay(i)}
            className={cn(
              "font-mono-ui text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-md border transition-colors",
              activeDay === i
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-border-strong"
            )}
          >
            {d.day}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden mb-10">
        {(["breakfast", "lunch", "snacks", "dinner"] as const).map((meal, i) => {
          const [text, verdict] = day[meal] as [string, Verdict]
          const v = VERDICT_META[verdict]
          return (
            <div
              key={meal}
              className={cn(
                "grid grid-cols-12 gap-3 px-4 sm:px-5 py-4 items-start",
                i !== 3 && "border-b border-border"
              )}
            >
              <div className="col-span-12 sm:col-span-2">
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {meal}
                </div>
              </div>
              <div className="col-span-12 sm:col-span-7 text-[13.5px]">{text}</div>
              <div className="col-span-12 sm:col-span-3 sm:text-right">
                <span
                  className="font-mono-ui text-[10px] inline-flex items-center px-2.5 py-1 rounded-md border uppercase tracking-wider whitespace-nowrap"
                  style={{
                    color: v.color,
                    background: v.bg,
                    borderColor: `${v.color}40`,
                  }}
                >
                  {v.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(VERDICT_META) as Verdict[]).map((k) => {
          const v = VERDICT_META[k]
          return (
            <span
              key={k}
              className="font-mono-ui text-[10px] inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border uppercase tracking-wider"
              style={{ borderColor: `${v.color}40`, background: v.bg, color: v.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: v.color }} />
              {v.label}
            </span>
          )
        })}
      </div>
    </PageContainer>
  )
}

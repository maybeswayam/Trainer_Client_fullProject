"use client"

import { useState } from "react"
import { PageContainer, PageHeader } from "@/components/ui-kit/section"
import { WORKOUT_LIBRARY } from "@/lib/data/workouts"
import { Quote, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function WorkoutLibraryPage() {
  const [activePhase, setActivePhase] = useState<number>(1)
  const phase = WORKOUT_LIBRARY.find((p) => p.phase === activePhase) ?? WORKOUT_LIBRARY[0]

  return (
    <PageContainer>
      <PageHeader
        eyebrow="02 · Plan"
        title="Workout Library"
        accent="var(--brand-green)"
        subtitle="Every session, every phase. Each workout is built around a single intent — show up, build, load, peak, then forge. Pick a phase to see the full session menu."
      />

      {/* Phase selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {WORKOUT_LIBRARY.map((p) => {
          const active = activePhase === p.phase
          return (
            <button
              key={p.phase}
              onClick={() => setActivePhase(p.phase)}
              className={cn(
                "font-mono-ui text-[10px] uppercase tracking-[0.12em] px-3.5 py-2 rounded-md border transition-colors flex items-center gap-2"
              )}
              style={{
                borderColor: active ? p.hex : "var(--border)",
                background: active ? `${p.hex}1c` : "transparent",
                color: active ? p.hex : "var(--muted-foreground)",
              }}
            >
              <span className="font-display text-base leading-none">
                {String(p.phase).padStart(2, "0")}
              </span>
              <span className="border-l pl-2" style={{ borderColor: active ? `${p.hex}40` : "var(--border)" }}>
                {p.title.split(" — ")[0]}
              </span>
              <span className="opacity-70">{p.weekRange}</span>
            </button>
          )
        })}
      </div>

      {/* Phase header card */}
      <div
        className="rounded-xl border p-5 lg:p-6 mb-7"
        style={{
          background: `${phase.hex}10`,
          borderColor: `${phase.hex}30`,
        }}
      >
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: phase.hex }}>
          Phase {phase.phase} · {phase.weekRange}
        </div>
        <h2 className="font-display text-3xl lg:text-4xl leading-none tracking-wide mb-4">
          {phase.title.toUpperCase()}
        </h2>
        <div className="flex gap-3 items-start text-[13px] text-muted-foreground leading-relaxed max-w-3xl">
          <Quote className="h-4 w-4 mt-0.5 shrink-0" style={{ color: phase.hex }} strokeWidth={1.5} />
          <p>
            <span className="text-foreground font-medium">Coach&apos;s note:</span> {phase.coachNote}
          </p>
        </div>
      </div>

      {/* Workouts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {phase.workouts.map((w, i) => (
          <article
            key={i}
            className="bg-surface border border-border rounded-xl overflow-hidden transition-colors hover:border-border-strong"
          >
            <header className="px-5 py-4 border-b border-border flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display text-xl leading-none tracking-wide">{w.name.toUpperCase()}</h3>
                <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider mt-1.5">
                  {w.schedule}
                </div>
              </div>
              <span
                className="font-mono-ui text-[9px] uppercase tracking-[0.1em] px-2 py-1 rounded border whitespace-nowrap"
                style={{
                  background: `${phase.hex}1a`,
                  borderColor: `${phase.hex}30`,
                  color: phase.hex,
                }}
              >
                Wk {phase.weekRange.replace("Wk ", "")}
              </span>
            </header>
            <div className="px-5 py-4">
              {w.detail && <p className="text-[12px] text-muted-foreground leading-relaxed mb-3.5">{w.detail}</p>}
              <ul className="flex flex-col">
                {w.exs.map(([n, s], k) => (
                  <li
                    key={k}
                    className="flex justify-between items-center gap-3 py-2 border-b border-border last:border-b-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <ChevronRight
                        className="h-3 w-3 text-faint shrink-0"
                        strokeWidth={2}
                      />
                      <span className="text-[13px] truncate">{n}</span>
                    </div>
                    <span className="font-mono-ui text-[11px] text-muted-foreground whitespace-nowrap">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  )
}

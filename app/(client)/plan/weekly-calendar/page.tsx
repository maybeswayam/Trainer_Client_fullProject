"use client"

import { useEffect, useMemo, useState } from "react"
import { PageContainer, PageHeader, SectionLabel } from "@/components/shared/ui-kit/section"
import { DayCard } from "@/components/shared/ui-kit/day-card"
import { PHASES, START_DATE, addDays, fmtShort, getPhaseForWeek, TOTAL_WEEKS } from "@/lib/data/phases"
import { DAY_NAMES, TYPE_COLOR, TYPE_SHORT, getWeekDays } from "@/lib/data/weekly-plan"
import { cn } from "@/lib/utils"

function getCurrentWeek(): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.floor((today.getTime() - START_DATE.getTime()) / 86400000)
  return Math.max(1, Math.min(TOTAL_WEEKS, Math.floor(diff / 7) + 1))
}

export default function WeeklyCalendarPage() {
  const [week, setWeek] = useState(1)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setWeek(getCurrentWeek())
    setHydrated(true)
  }, [])

  const phase = getPhaseForWeek(week)
  const days = useMemo(() => getWeekDays(week), [week])
  const weekStart = useMemo(() => addDays(START_DATE, (week - 1) * 7), [week])
  const weekEnd = useMemo(() => addDays(weekStart, 6), [weekStart])

  return (
    <PageContainer>
      <PageHeader
        eyebrow="01 · Plan"
        title="Weekly Calendar"
        accent="var(--brand-green)"
        subtitle="A precise day-by-day blueprint across 17 weeks. Pick a week and see every session, every exercise, every meal — all phase-coloured so you always know where you stand."
      />

      {/* Phase legend */}
      <div className="flex flex-wrap gap-2 mb-7">
        {PHASES.map((p) => (
          <button
            key={p.num}
            onClick={() => setWeek(p.weeks[0])}
            className="font-mono-ui text-[10px] uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-md border transition-colors"
            style={{
              borderColor: `${p.hex}40`,
              background: `${p.hex}1a`,
              color: p.hex,
            }}
          >
            Ph{p.num} · {p.shortName}{" "}
            <span className="opacity-70">({p.weeksLabel})</span>
          </button>
        ))}
      </div>

      {/* 17-week strip */}
      <div className="mb-8">
        <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em] mb-3">
          17-week ribbon · click any week
        </div>
        <div className="bg-surface border border-border rounded-xl p-3 sm:p-4 overflow-x-auto">
          <div className="flex gap-1.5 min-w-[680px]">
            {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((w) => {
              const wp = getPhaseForWeek(w)
              const active = w === week
              const isCurrent = hydrated && getCurrentWeek() === w
              return (
                <button
                  key={w}
                  onClick={() => setWeek(w)}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 rounded-md border transition-all text-center min-w-0",
                    active ? "ring-2 ring-offset-1 ring-offset-surface" : "hover:border-border-strong"
                  )}
                  style={{
                    borderColor: active ? wp.hex : "var(--border)",
                    background: active ? `${wp.hex}1c` : "transparent",
                    boxShadow: active ? `0 0 0 1px ${wp.hex}40` : undefined,
                  }}
                >
                  <span
                    className="font-mono-ui text-[9px] uppercase tracking-wider"
                    style={{ color: active ? wp.hex : "var(--muted-foreground)" }}
                  >
                    Wk
                  </span>
                  <span
                    className="font-display text-lg leading-none"
                    style={{ color: active ? wp.hex : "var(--foreground)" }}
                  >
                    {String(w).padStart(2, "0")}
                  </span>
                  <span
                    className="block w-full h-0.5 rounded-full mt-1"
                    style={{ background: wp.hex, opacity: active ? 1 : 0.45 }}
                  />
                  {isCurrent && (
                    <span
                      className="font-mono-ui text-[8px] uppercase tracking-wider mt-0.5"
                      style={{ color: wp.hex }}
                    >
                      NOW
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Phase banner */}
      <div
        className="rounded-xl border p-5 mb-6 flex items-center gap-5"
        style={{
          background: `${phase.hex}10`,
          borderColor: `${phase.hex}40`,
        }}
      >
        <div className="font-display text-[56px] leading-none shrink-0" style={{ color: phase.hex }}>
          {String(phase.num).padStart(2, "0")}
        </div>
        <div className="min-w-0">
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Phase {phase.num} · Week {week} of {TOTAL_WEEKS}
          </div>
          <div
            className="font-display text-2xl tracking-wide leading-none mt-1"
            style={{ color: phase.hex }}
          >
            {phase.name.toUpperCase()}
          </div>
          <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed">{phase.desc}</p>
        </div>
        <div className="hidden sm:block ml-auto text-right shrink-0">
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Week dates
          </div>
          <div className="font-display text-lg tracking-wide mt-1">
            {fmtShort(weekStart)} → {fmtShort(weekEnd)}
          </div>
        </div>
      </div>

      {/* Week ribbon (7 days) */}
      <div className="grid grid-cols-7 gap-1.5 mb-7">
        {days.map((d, i) => {
          const date = addDays(weekStart, i)
          return (
            <div
              key={i}
              className="bg-surface-2 border border-border rounded-md py-2 px-1.5 text-center"
              style={{ borderColor: `${TYPE_COLOR[d.type]}30` }}
            >
              <div className="font-mono-ui text-[9px] text-muted-foreground uppercase">{DAY_NAMES[i]}</div>
              <div className="font-mono-ui text-[12px] mt-0.5">{date.getDate()}</div>
              <div
                className="font-mono-ui text-[8px] sm:text-[9px] uppercase tracking-wider mt-1 font-medium"
                style={{ color: TYPE_COLOR[d.type] }}
              >
                {TYPE_SHORT[d.type]}
              </div>
            </div>
          )
        })}
      </div>

      <SectionLabel eyebrow={`Wk ${week} · 7 days`} title="Day by day" />

      {/* Day cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {days.map((d, i) => (
          <DayCard key={i} day={d} date={addDays(weekStart, i)} dayName={DAY_NAMES[i]} />
        ))}
      </div>

      {/* Week navigator */}
      <div className="mt-10 flex items-center justify-between gap-3">
        <button
          onClick={() => setWeek(Math.max(1, week - 1))}
          disabled={week === 1}
          className="font-mono-ui text-[11px] uppercase tracking-wider px-4 py-2.5 border border-border rounded-md hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
        >
          ← Prev week
        </button>
        <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          Week {week} / {TOTAL_WEEKS}
        </div>
        <button
          onClick={() => setWeek(Math.min(TOTAL_WEEKS, week + 1))}
          disabled={week === TOTAL_WEEKS}
          className="font-mono-ui text-[11px] uppercase tracking-wider px-4 py-2.5 border border-border rounded-md hover:border-primary hover:text-primary transition-colors disabled:opacity-30"
        >
          Next week →
        </button>
      </div>
    </PageContainer>
  )
}

"use client"

import { useEffect, useState, useCallback } from "react"
import { PageContainer, PageHeader, SectionLabel } from "@/components/ui-kit/section"
import { StatCard, SurfaceCard } from "@/components/ui-kit/cards"
import { LineChart } from "@/components/ui-kit/line-chart"
import {
  getData,
  calcStreak,
  getBestLift,
  getDaysSinceStart,
  getCurrentWeek,
  getCurrentPhaseIndex,
  getGlobalProgress,
  fmtDate,
  LIFT_TARGETS,
  QUOTES,
  PHASE_COLORS,
  TOTAL_DAYS,
  START_DATE,
  dateStr,
  type TrackerData,
} from "@/lib/tracker-store"
import { PHASES } from "@/lib/data/phases"
import { Flame, Zap, TrendingDown, Dumbbell, Activity } from "lucide-react"

/* ── Heatmap component ────────────────────── */
function Heatmap({ data }: { data: TrackerData }) {
  const intensityMap: Record<string, number> = {}
  data.dailyLogs.forEach((l) => {
    let score = 0
    if (l.session && l.session !== "Rest Day") score += 2
    if (l.checklist) score += l.checklist.length
    intensityMap[l.date] = Math.min(4, score)
  })

  const end = new Date(2026, 7, 31)
  const cells: { date: string; lvl: number; label: string }[][] = []
  const cur = new Date(START_DATE)

  while (cur <= end) {
    const week: { date: string; lvl: number; label: string }[] = []
    for (let d = 0; d < 7 && cur <= end; d++) {
      const ds = dateStr(cur)
      week.push({ date: ds, lvl: intensityMap[ds] || 0, label: fmtDate(ds) })
      cur.setDate(cur.getDate() + 1)
    }
    cells.push(week)
  }

  const lvlColors = [
    "var(--faint)",
    "rgba(184,245,160,0.25)",
    "rgba(184,245,160,0.5)",
    "rgba(184,245,160,0.75)",
    "var(--brand-green)",
  ]

  return (
    <div>
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px]">
          {cells.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((cell) => (
                <div
                  key={cell.date}
                  title={cell.label}
                  className="w-[11px] h-[11px] rounded-[2px] transition-transform hover:scale-[1.4] hover:z-10 cursor-pointer"
                  style={{ background: lvlColors[cell.lvl] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-1 items-center mt-2 font-mono-ui text-[9px] text-muted-foreground">
        <span>Less</span>
        {lvlColors.map((c, i) => (
          <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ background: c }} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

/* ── Body silhouette ──────────────────────── */
function BodyProgress({ currentWeight }: { currentWeight: number }) {
  const lost = 112 - currentWeight
  const stages = [
    { label: "Start", weight: "112 kg", scale: 1.18, color: "var(--brand-red)", opacity: 0.6 },
    {
      label: "Now",
      weight: `${currentWeight.toFixed(1)} kg`,
      scale: Math.max(0.85, 1.18 - lost * 0.015),
      color: "var(--brand-amber)",
      opacity: 0.85,
    },
    { label: "Goal", weight: "100 kg", scale: 0.88, color: "var(--brand-green)", opacity: 1 },
  ]

  return (
    <div className="flex items-center justify-center gap-6 lg:gap-10 py-6">
      {stages.map((s, i) => (
        <div key={i} className="flex items-center gap-4 lg:gap-6">
          <div className="text-center">
            <div className="w-[60px] h-[90px] lg:w-[80px] lg:h-[120px] mx-auto mb-2" style={{ color: s.color, opacity: s.opacity }}>
              <svg viewBox="0 0 60 110" fill="none" className="w-full h-full">
                <ellipse cx="30" cy="12" rx={8 * s.scale} ry={9 * s.scale} fill="currentColor" opacity="0.9" />
                <rect x={30 - 11 * s.scale} y="22" width={22 * s.scale} height={32 * s.scale} rx={5 * s.scale} fill="currentColor" opacity="0.85" />
                <rect x={30 - 18 * s.scale} y="23" width={7 * s.scale} height={22 * s.scale} rx={3 * s.scale} fill="currentColor" opacity="0.7" />
                <rect x={30 + 11 * s.scale} y="23" width={7 * s.scale} height={22 * s.scale} rx={3 * s.scale} fill="currentColor" opacity="0.7" />
                <rect x={30 - 10 * s.scale} y="53" width={9 * s.scale} height={36 * s.scale} rx={3 * s.scale} fill="currentColor" opacity="0.8" />
                <rect x={30 + 1 * s.scale} y="53" width={9 * s.scale} height={36 * s.scale} rx={3 * s.scale} fill="currentColor" opacity="0.8" />
              </svg>
            </div>
            <div className="font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="font-display text-lg" style={{ color: s.color }}>{s.weight}</div>
          </div>
          {i < stages.length - 1 && (
            <div className="text-xl" style={{ color: "var(--brand-green)" }}>→</div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Lift progress bars ───────────────────── */
function LiftProgressRows({ data }: { data: TrackerData }) {
  return (
    <div className="space-y-1">
      {Object.entries(LIFT_TARGETS).map(([key, def]) => {
        const best = getBestLift(data, key) ?? def.start
        const target = def.targets[4]
        const range = target - def.start
        const pct = range > 0 ? Math.min(100, Math.round(((best - def.start) / range) * 100)) : 0
        const barColor = pct >= 80 ? "var(--brand-green)" : pct >= 50 ? "var(--brand-blue)" : "var(--brand-amber)"

        return (
          <div key={key} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
            <div className="min-w-[120px]">
              <div className="text-[13px] font-medium">{def.label}</div>
              <div className="font-mono-ui text-[10px] text-muted-foreground">
                {def.start} → {target} {def.unit}
              </div>
            </div>
            <div className="font-display text-2xl leading-none min-w-[60px]" style={{ color: barColor }}>
              {best}
            </div>
            <div className="flex-1">
              <div className="h-[5px] bg-faint rounded-full relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: barColor }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono-ui text-[9px] text-muted-foreground">{def.unit}</span>
                <span className="font-mono-ui text-[9px] text-muted-foreground">{pct}% to goal</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Phase timeline bar ───────────────────── */
function PhaseTimeline() {
  const phIdx = getCurrentPhaseIndex()
  const totalWks = 17
  return (
    <div className="flex gap-0 mb-4">
      {PHASE_COLORS.map((ph, i) => {
        const isActive = i === phIdx
        const isPast = i < phIdx
        const opacity = isPast ? 0.6 : isActive ? 1 : 0.3
        return (
          <div key={i} style={{ flex: ph.weeks }} className="relative">
            <div
              className="h-[6px] transition-all"
              style={{
                background: isPast || isActive ? ph.color : "var(--faint)",
                opacity,
                borderRadius: i === 0 ? "3px 0 0 3px" : i === PHASE_COLORS.length - 1 ? "0 3px 3px 0" : 0,
                boxShadow: isActive ? `0 0 8px ${ph.color}60` : "none",
              }}
            />
            <div
              className="font-mono-ui text-[9px] text-center mt-1.5 uppercase"
              style={{ color: isActive ? ph.color : "var(--muted-foreground)" }}
            >
              {ph.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Main Dashboard Page ──────────────────── */
export default function DashboardPage() {
  const [data, setData] = useState<TrackerData | null>(null)

  useEffect(() => {
    setData(getData())
    const handleUpdate = () => setData(getData())
    window.addEventListener("tracker-updated", handleUpdate)
    return () => window.removeEventListener("tracker-updated", handleUpdate)
  }, [])

  if (!data) return null

  const weights = [...data.weights].sort((a, b) => a.date.localeCompare(b.date))
  const currentWeight = weights.length ? weights[weights.length - 1].val : 112
  const lost = (112 - currentWeight).toFixed(1)
  const { streak, best } = calcStreak(data)
  const daysElapsed = Math.max(1, getDaysSinceStart() + 1)
  const daysTrained = new Set(
    data.dailyLogs.filter((l) => l.session && l.session !== "Rest Day").map((l) => l.date)
  ).size
  const progress = getGlobalProgress()
  const phIdx = getCurrentPhaseIndex()
  const phase = PHASES[phIdx]
  const week = getCurrentWeek()
  const quoteIdx = getDaysSinceStart() % QUOTES.length
  const quote = QUOTES[quoteIdx]

  // Weight chart data
  const weightChartData = [{ date: "May 4", weight: 112 }, ...weights.map((w) => ({ date: fmtDate(w.date), weight: w.val }))]

  return (
    <PageContainer>
      {/* Quote block */}
      <div className="relative overflow-hidden rounded-xl border p-5 lg:p-6 mb-6" style={{ background: "linear-gradient(135deg, var(--brand-green-dim), var(--brand-blue-dim))", borderColor: "rgba(184,245,160,0.15)" }}>
        <div className="absolute -top-2.5 left-3 font-display text-[100px] leading-none pointer-events-none" style={{ color: "rgba(184,245,160,0.05)" }}>&quot;</div>
        <p className="text-[15px] font-medium leading-relaxed relative z-10">{quote[0]}</p>
        <div className="font-mono-ui text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">— {quote[1]}</div>
      </div>

      {/* Global progress bar */}
      <div className="mb-6 bg-surface border border-border rounded-xl px-5 py-3">
        <div className="flex justify-between font-mono-ui text-[10px] text-muted-foreground uppercase mb-2">
          <span>May 4</span>
          <span>{progress}% complete · Day {Math.max(1, getDaysSinceStart())}/{TOTAL_DAYS}</span>
          <span>Aug 31</span>
        </div>
        <div className="h-[3px] bg-faint rounded-full relative">
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--brand-green), var(--brand-blue))" }} />
          <div className="absolute -top-[4px] w-[2px] h-[11px] rounded-[1px]" style={{ left: `${progress}%`, background: "var(--brand-amber)" }} />
        </div>
      </div>

      {/* Phase timeline */}
      <SectionLabel eyebrow="17-Week Journey" title="Phases" />
      <div className="mb-8">
        <PhaseTimeline />
        <div className="font-mono-ui text-[11px] text-center mt-1" style={{ color: phase.hex }}>
          Week {week} — {phase.name}
        </div>
      </div>

      {/* Key stats */}
      <SectionLabel eyebrow="Overview" title="Key Stats" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="Current Weight" value={currentWeight.toFixed(1)} sub="kg" color="var(--brand-green)" delta={weights.length ? { value: `▼ ${lost} kg lost`, positive: true } : undefined} />
        <StatCard label="Days Trained" value={daysTrained} sub={`of ${daysElapsed} days elapsed`} color="var(--brand-blue)" />
        <StatCard label="Current Streak" value={streak} sub={`days · best: ${best}`} color="var(--brand-amber)" />
        <StatCard label="XP Score" value={(data.xp || 0).toLocaleString()} sub="points earned" color="var(--brand-purple)" />
      </div>

      {/* Streak + Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
        <SurfaceCard>
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Training Streak</div>
          <div className="text-center py-4">
            <div className="text-5xl mb-2">{streak >= 14 ? "🔥🔥🔥" : streak >= 7 ? "🔥🔥" : streak >= 3 ? "🔥" : "💤"}</div>
            <div className="font-display text-[72px] leading-none" style={{ color: "var(--brand-amber)" }}>{streak}</div>
            <div className="font-mono-ui text-[11px] uppercase tracking-wider text-muted-foreground mt-1">Day Streak</div>
            <div className="text-[12px] text-muted-foreground mt-1.5">Best streak: {best} days</div>
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Activity Heatmap — May 4 to Aug 31</div>
          <div className="mt-2">
            <Heatmap data={data} />
          </div>
        </SurfaceCard>
      </div>

      {/* Body silhouette */}
      <SectionLabel eyebrow="Transformation" title="Body Progress" />
      <SurfaceCard className="mb-8">
        <BodyProgress currentWeight={currentWeight} />
      </SurfaceCard>

      {/* Lift progress */}
      <SectionLabel eyebrow="Strength" title="Lift Progress" />
      <SurfaceCard className="mb-8">
        <LiftProgressRows data={data} />
      </SurfaceCard>

      {/* Weight trend */}
      <SectionLabel eyebrow="Weight" title="Trend" />
      <SurfaceCard>
        <LineChart
          data={weightChartData}
          series={[{ key: "weight", label: "Weight", color: "var(--brand-green)" }]}
          xKey="date"
          height={200}
          yDomain={[96, 115]}
          refLines={[{ value: 100, label: "Target", color: "var(--brand-purple)" }]}
          emptyHint="Start logging your weight to see trends."
        />
      </SurfaceCard>
    </PageContainer>
  )
}

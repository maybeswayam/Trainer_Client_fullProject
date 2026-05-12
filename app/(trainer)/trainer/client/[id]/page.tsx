"use client"

import { useEffect, useState, use } from "react"
import { useTracker } from "@/lib/hooks/use-tracker"
import { PageContainer, PageHeader, SectionLabel } from "@/components/shared/ui-kit/section"
import { StatCard, SurfaceCard } from "@/components/shared/ui-kit/cards"
import { LineChart } from "@/components/shared/ui-kit/line-chart"
import {
  calcStreak,
  getBestLift,
  getDaysSinceStart,
  getCurrentWeek,
  getCurrentPhaseIndex,
  getGlobalProgress,
  fmtDate,
  LIFT_TARGETS,
  PHASE_COLORS,
  TOTAL_DAYS,
  START_DATE,
  dateStr,
  type TrackerData,
} from "@/lib/tracker-store"
import { PHASES } from "@/lib/data/phases"
import { Flame, Zap, TrendingDown, Dumbbell, Activity, ShieldAlert } from "lucide-react"
import Link from "next/link"

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

function BodyProgress({ currentWeight, startWeight = 112, targetWeight = 100 }: { currentWeight: number, startWeight?: number, targetWeight?: number }) {
  const lost = startWeight - currentWeight
  const stages = [
    { label: "Start", weight: `${startWeight} kg`, scale: 1.18, color: "var(--brand-red)", opacity: 0.6 },
    {
      label: "Now",
      weight: `${currentWeight.toFixed(1)} kg`,
      scale: Math.max(0.85, 1.18 - lost * 0.015),
      color: "var(--brand-amber)",
      opacity: 0.85,
    },
    { label: "Goal", weight: `${targetWeight} kg`, scale: 0.88, color: "var(--brand-green)", opacity: 1 },
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

function PhaseTimeline() {
  const phIdx = getCurrentPhaseIndex()
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

export default function TrainerClientDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { data: realData, hydrated } = useTracker()

  if (!hydrated || !realData) return null

  const id = resolvedParams.id
  const isSam = id === "sam"

  // Base the data on realData but tweaked for testing/demo
  const data = { ...realData }
  let startWeight = 112
  
  if (!isSam) {
    if (id === "jessica") startWeight = 68
    if (id === "marcus") startWeight = 95
    if (id === "elena") startWeight = 60
    if (id === "david") startWeight = 85

    // Tweak local weights a bit
    data.weights = realData.weights.map(w => ({
      ...w,
      val: w.val - (112 - startWeight) + (Math.sin(w.date.length) * 2) 
    }))
  }

  const weights = [...data.weights].sort((a, b) => a.date.localeCompare(b.date))
  const currentWeight = weights.length ? weights[weights.length - 1].val : startWeight
  const lost = (startWeight - currentWeight).toFixed(1)
  const { streak, best } = calcStreak(data)
  const daysElapsed = Math.max(1, getDaysSinceStart() + 1)
  const daysTrained = new Set(
    data.dailyLogs.filter((l) => l.session && l.session !== "Rest Day").map((l) => l.date)
  ).size
  const progress = getGlobalProgress()
  const phIdx = getCurrentPhaseIndex()
  const phase = PHASES[phIdx]
  const week = getCurrentWeek()
  const weightChartData = [{ date: "May 4", weight: startWeight }, ...weights.map((w) => ({ date: fmtDate(w.date), weight: w.val }))]

  const nameCapitalized = id.charAt(0).toUpperCase() + id.slice(1)

  return (
    <PageContainer>
      <div className="flex items-center gap-2 mb-2">
        <Link href="/trainer/dashboard" className="text-muted-foreground hover:text-foreground font-mono-ui text-[10px] uppercase tracking-wider">
          ← Back to Roster
        </Link>
      </div>
      
      <PageHeader 
        title={`${nameCapitalized}'s Dashboard`} 
        subtitle="Read-Only Client View" 
        actions={
          <Link href={`/trainer/client/${id}/logs`} className="px-3 py-1.5 bg-surface-2 border border-border rounded-md font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            View All Logs
          </Link>
        }
      />

      <div className="mb-6 bg-surface border border-border rounded-xl px-5 py-3">
        <div className="flex justify-between font-mono-ui text-[10px] text-muted-foreground uppercase mb-2">
          <span>May 4</span>
          <span>{progress}% complete · Day {daysElapsed}/{TOTAL_DAYS}</span>
          <span>Aug 31</span>
        </div>
        <div className="h-[3px] bg-faint rounded-full relative">
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--brand-green), var(--brand-blue))" }} />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Current Phase" value={phase.name} sub={`Week ${week} of 17`} icon={<Zap style={{ color: "var(--brand-amber)" }} />} />
        <StatCard title="Total Lost" value={`${lost} kg`} sub={`Current: ${currentWeight.toFixed(1)}kg`} icon={<TrendingDown style={{ color: "var(--brand-green)" }} />} />
        <StatCard title="Workout Days" value={daysTrained} sub={`Out of ${daysElapsed} days`} icon={<Dumbbell style={{ color: "var(--brand-blue)" }} />} />
        <StatCard title="Current Streak" value={streak} sub={`Best: ${best} days`} icon={<Flame style={{ color: "var(--brand-orange)" }} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <SectionLabel title="Activity Heatmap" />
          <SurfaceCard>
            <Heatmap data={data} />
          </SurfaceCard>
        </div>
        <div>
          <SectionLabel title="Body Transformation" />
          <SurfaceCard>
            <BodyProgress currentWeight={currentWeight} startWeight={startWeight} targetWeight={startWeight - 12} />
          </SurfaceCard>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
        <div>
          <SectionLabel title="Weight Trend" />
          <SurfaceCard>
            <LineChart 
              data={weightChartData} 
              series={[{ key: "weight", label: "Weight", color: "var(--brand-green)" }]} 
              yDomain={["dataMin - 1", "dataMax + 1"]} 
            />
          </SurfaceCard>
        </div>
        <div>
          <SectionLabel title="Strength Milestones" />
          <SurfaceCard>
            <LiftProgressRows data={data} />
          </SurfaceCard>
        </div>
      </div>
    </PageContainer>
  )
}
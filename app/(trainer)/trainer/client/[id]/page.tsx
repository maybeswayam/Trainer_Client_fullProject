"use client"

import { use } from "react"
import { DEMO_CLIENTS, CLIENT_PROGRESS, getPhaseColor } from "@/lib/data/demo-clients"
import { PageContainer, PageHeader, SectionLabel } from "@/components/shared/ui-kit/section"
import { StatCard, SurfaceCard } from "@/components/shared/ui-kit/cards"
import { LineChart } from "@/components/shared/ui-kit/line-chart"
import {
  LIFT_TARGETS,
  PHASE_COLORS,
  TOTAL_DAYS,
  START_DATE,
  dateStr,
  fmtDate,
} from "@/lib/tracker-store"
import { Flame, Zap, TrendingDown, Dumbbell, Target, Trophy, Footprints, Droplets, Beef } from "lucide-react"
import Link from "next/link"

// Generate heatmap data from workouts
function generateHeatmapData(workouts: { date: string; type: string }[]) {
  const intensityMap: Record<string, number> = {}
  workouts.forEach((w) => {
    const baseScore = w.type === "Rest Day" ? 0 : 3
    intensityMap[w.date] = Math.min(4, baseScore + Math.floor(Math.random() * 2))
  })
  return intensityMap
}

function Heatmap({ workouts }: { workouts: { date: string; type: string }[] }) {
  const intensityMap = generateHeatmapData(workouts)
  
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

function BodyProgress({ currentWeight, startWeight, targetWeight }: { currentWeight: number, startWeight: number, targetWeight: number }) {
  const lost = startWeight - currentWeight
  const total = startWeight - targetWeight
  const progress = total > 0 ? Math.min(100, Math.round((lost / total) * 100)) : 0
  
  const stages = [
    { label: "Start", weight: `${startWeight} KG`, scale: 1.18, color: "var(--brand-red)", opacity: 0.6 },
    {
      label: "Now",
      weight: `${currentWeight.toFixed(1)} KG`,
      scale: Math.max(0.85, 1.18 - lost * 0.02),
      color: "var(--brand-amber)",
      opacity: 0.85,
    },
    { label: "Goal", weight: `${targetWeight} KG`, scale: 0.88, color: "var(--brand-green)", opacity: 1 },
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

function LiftProgressRows({ lifts, clientId }: { lifts: { date: string; exercise: string; weight: number; reps: number; sets: number }[], clientId: string }) {
  // Build best lift map from client's lift history
  const bestLifts: Record<string, number> = {}
  lifts.forEach((l) => {
    const key = l.exercise.toLowerCase().replace(/\s+/g, "")
    if (!bestLifts[key] || l.weight > bestLifts[key]) {
      bestLifts[key] = l.weight
    }
  })

  // Map exercise names to LIFT_TARGETS keys
  const exerciseMap: Record<string, string> = {
    "benchpress": "bench",
    "squat": "squat",
    "deadlift": "rdl",
    "rdl": "rdl",
    "ohp": "ohp",
    "chin-ups": "chinups",
    "chinups": "chinups",
    "push-ups": "pushups",
    "pushups": "pushups",
    "barbellrow": "row",
  }

  return (
    <div className="space-y-1">
      {Object.entries(LIFT_TARGETS).map(([key, def]) => {
        // Find best lift for this exercise
        let best = def.start
        Object.entries(exerciseMap).forEach(([exName, targetKey]) => {
          if (targetKey === key && bestLifts[exName]) {
            best = Math.max(best, bestLifts[exName])
          }
        })
        
        // Also check direct matches
        if (bestLifts[key]) best = Math.max(best, bestLifts[key])

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

function PhaseTimeline({ currentPhase }: { currentPhase: string }) {
  const phIdx = PHASE_COLORS.findIndex(p => p.name === currentPhase)
  
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

// Recent workouts section
function RecentWorkouts({ workouts }: { workouts: { date: string; type: string; duration: number; intensity: number }[] }) {
  const recent = [...workouts].reverse().slice(0, 5)
  
  if (recent.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground font-mono-ui text-sm">
        No workouts logged yet
      </div>
    )
  }
  
  return (
    <div className="space-y-2">
      {recent.map((w, i) => (
        <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
              <Dumbbell size={14} className="text-brand-green" />
            </div>
            <div>
              <div className="text-[13px] font-medium">{w.type}</div>
              <div className="font-mono-ui text-[10px] text-muted-foreground">{fmtDate(w.date)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono-ui text-[12px]">{w.duration} min</div>
            <div className="font-mono-ui text-[10px] text-muted-foreground">
              Intensity: {w.intensity}/10
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Measurements comparison
function MeasurementsComparison({ measurements }: { measurements: { date: string; waist?: number; chest?: number; hip?: number; thigh?: number; arm?: number }[] }) {
  if (measurements.length < 2) {
    return (
      <div className="text-center py-8 text-muted-foreground font-mono-ui text-sm">
        Need at least 2 measurement entries to compare
      </div>
    )
  }
  
  const first = measurements[0]
  const last = measurements[measurements.length - 1]
  
  const items = [
    { label: "Waist", first: first.waist, last: last.waist, unit: "cm", goodIfDown: true },
    { label: "Chest", first: first.chest, last: last.chest, unit: "cm", goodIfDown: false },
    { label: "Hips", first: first.hip, last: last.hip, unit: "cm", goodIfDown: true },
    { label: "Thigh", first: first.thigh, last: last.thigh, unit: "cm", goodIfDown: true },
    { label: "Arms", first: first.arm, last: last.arm, unit: "cm", goodIfDown: false },
  ].filter(item => item.first !== undefined && item.last !== undefined)

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const diff = (item.last || 0) - (item.first || 0)
        const isGood = item.goodIfDown ? diff < 0 : diff > 0
        const color = Math.abs(diff) < 0.5 ? "var(--muted-foreground)" : isGood ? "var(--brand-green)" : "var(--brand-red)"
        
        return (
          <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="font-mono-ui text-[12px] text-muted-foreground">{item.label}</span>
            <div className="flex items-center gap-4">
              <span className="font-mono-ui text-[11px] text-muted-foreground">{item.first} {item.unit}</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-mono-ui text-[12px]">{item.last} {item.unit}</span>
              <span className="font-mono-ui text-[11px] min-w-[50px] text-right" style={{ color }}>
                {diff > 0 ? "+" : ""}{diff.toFixed(1)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function TrainerClientDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id.toLowerCase()
  
  // Get client data from demo data
  const client = DEMO_CLIENTS[id]
  const progress = CLIENT_PROGRESS[id]
  
  if (!client || !progress) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <div className="text-xl font-display">Client Not Found</div>
          <Link href="/trainer/dashboard" className="text-brand-green hover:underline font-mono-ui text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </PageContainer>
    )
  }

  // Calculate stats from progress data
  const weights = progress.weights
  const currentWeight = weights.length > 0 ? weights[weights.length - 1].value : client.startWeight
  const lost = (client.startWeight - currentWeight).toFixed(1)
  const daysElapsed = Math.max(1, client.week * 7)
  const totalDays = 120 // 17 weeks
  const progressPct = Math.min(100, Math.round((daysElapsed / totalDays) * 100))
  
  // Format weight chart data
  const weightChartData = weights.map((w) => ({ 
    date: fmtDate(w.date), 
    weight: w.value 
  }))

  // Calculate start and end dates based on join date
  const joinDate = new Date(client.joinDate)
  const endDate = new Date(joinDate)
  endDate.setDate(endDate.getDate() + totalDays)
  const startDateStr = joinDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  const endDateStr = endDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })

  return (
    <PageContainer>
      <div className="flex items-center gap-2 mb-2">
        <Link href="/trainer/dashboard" className="text-muted-foreground hover:text-foreground font-mono-ui text-[10px] uppercase tracking-wider">
          ← Back to Roster
        </Link>
      </div>
      
      <PageHeader 
        title={`${client.name.split(" ")[0]}'s Dashboard`} 
        subtitle="Read-Only Client View" 
        actions={
          <Link href={`/trainer/client/${id}/logs`} className="px-3 py-1.5 bg-surface-2 border border-border rounded-md font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            View All Logs
          </Link>
        }
      />

      {/* Progress Bar */}
      <div className="mb-6 bg-surface border border-border rounded-xl px-5 py-3">
        <div className="flex justify-between font-mono-ui text-[10px] text-muted-foreground uppercase mb-2">
          <span>{startDateStr}</span>
          <span>{progressPct}% complete · Day {daysElapsed}/{totalDays}</span>
          <span>{endDateStr}</span>
        </div>
        <div className="h-[3px] bg-faint rounded-full relative">
          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, var(--brand-green), var(--brand-blue))" }} />
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="mb-6">
        <PhaseTimeline currentPhase={client.phase} />
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Current Phase" 
          value={client.phase} 
          sub={`Week ${client.week} of 17`} 
          icon={<Zap style={{ color: getPhaseColor(client.phase) }} />} 
        />
        <StatCard 
          title="Weight Lost" 
          value={`${lost} kg`} 
          sub={`Current: ${currentWeight.toFixed(1)}kg`} 
          icon={<TrendingDown style={{ color: "var(--brand-green)" }} />} 
        />
        <StatCard 
          title="Total Workouts" 
          value={client.totalWorkouts} 
          sub={`${client.workoutsThisWeek} this week`} 
          icon={<Dumbbell style={{ color: "var(--brand-blue)" }} />} 
        />
        <StatCard 
          title="Current Streak" 
          value={client.streak} 
          sub={`${client.compliance}% compliance`} 
          icon={<Flame style={{ color: client.streak > 5 ? "var(--brand-orange)" : "var(--muted-foreground)" }} />} 
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Avg Steps" 
          value={client.avgSteps.toLocaleString()} 
          sub="daily average" 
          icon={<Footprints style={{ color: "var(--brand-amber)" }} />} 
        />
        <StatCard 
          title="Avg Protein" 
          value={`${client.avgProtein}g`} 
          sub="daily average" 
          icon={<Beef style={{ color: "var(--brand-red)" }} />} 
        />
        <StatCard 
          title="Cardio" 
          value={`${client.cardioMinutes}`} 
          sub="minutes this week" 
          icon={<Target style={{ color: "var(--brand-purple)" }} />} 
        />
        <StatCard 
          title="Best Lifts" 
          value={`${client.benchPR}/${client.squatPR}/${client.deadliftPR}`} 
          sub="B/S/D PRs (kg)" 
          icon={<Trophy style={{ color: "var(--brand-green)" }} />} 
        />
      </div>

      {/* Activity & Body Transformation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <SectionLabel title="Activity Heatmap" />
          <SurfaceCard>
            <Heatmap workouts={progress.workouts} />
          </SurfaceCard>
        </div>
        <div>
          <SectionLabel title="Body Transformation" />
          <SurfaceCard>
            <BodyProgress 
              currentWeight={currentWeight} 
              startWeight={client.startWeight} 
              targetWeight={client.targetWeight} 
            />
          </SurfaceCard>
        </div>
      </div>

      {/* Weight Trend & Strength */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
        <div>
          <SectionLabel title="Weight Trend" />
          <SurfaceCard>
            {weightChartData.length > 1 ? (
              <LineChart 
                data={weightChartData} 
                series={[{ key: "weight", label: "Weight", color: "var(--brand-green)" }]} 
                yDomain={["dataMin - 1", "dataMax + 1"]} 
              />
            ) : (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground font-mono-ui text-sm">
                Need more data points for chart
              </div>
            )}
          </SurfaceCard>
        </div>
        <div>
          <SectionLabel title="Strength Milestones" />
          <SurfaceCard>
            <LiftProgressRows lifts={progress.lifts} clientId={id} />
          </SurfaceCard>
        </div>
      </div>

      {/* Recent Workouts & Measurements */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
        <div>
          <SectionLabel title="Recent Workouts" />
          <SurfaceCard>
            <RecentWorkouts workouts={progress.workouts} />
          </SurfaceCard>
        </div>
        <div>
          <SectionLabel title="Body Measurements" />
          <SurfaceCard>
            <MeasurementsComparison measurements={progress.measurements} />
          </SurfaceCard>
        </div>
      </div>

      {/* Trainer Notes */}
      {client.notes && (
        <div className="mb-8">
          <SectionLabel title="Trainer Notes" />
          <SurfaceCard>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-amber/10 flex items-center justify-center shrink-0">
                <span className="text-brand-amber text-sm">📝</span>
              </div>
              <p className="text-[14px] leading-relaxed text-foreground/90">{client.notes}</p>
            </div>
          </SurfaceCard>
        </div>
      )}

      {/* Tags */}
      {client.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {client.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 rounded-full bg-surface-2 border border-border font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </PageContainer>
  )
}

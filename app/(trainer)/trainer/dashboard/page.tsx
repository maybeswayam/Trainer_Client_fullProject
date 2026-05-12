"use client"

import { useTracker } from "@/lib/hooks/use-tracker"
import { PageContainer, SectionLabel } from "@/components/shared/ui-kit/section"
import { SurfaceCard } from "@/components/shared/ui-kit/cards"
import { PHASES } from "@/lib/data/phases"
import { getCurrentPhaseIndex, getCurrentWeek, getDaysSinceStart } from "@/lib/tracker-store"
import Link from "next/link"
import { ArrowRight, Users, TrendingUp, TrendingDown, Minus } from "lucide-react"

export default function TrainerDashboardPage() {
  const { data, hydrated } = useTracker()

  if (!hydrated || !data) return null

  // Process Sam's data
  const phIdx = getCurrentPhaseIndex()
  const phase = PHASES[phIdx]
  const week = getCurrentWeek()
  const streak = data.streak || 0
  
  const weights = [...data.weights].sort((a, b) => a.date.localeCompare(b.date))
  const currentWeight = weights.length > 0 ? weights[weights.length - 1].val : 112
  const startWeight = weights.length > 0 ? weights[0].val : 112
  const weightTrend = currentWeight < startWeight ? "down" : currentWeight > startWeight ? "up" : "flat"

  const logs = [...data.dailyLogs].sort((a, b) => b.date.localeCompare(a.date))
  const lastLogDate = logs.length > 0 ? logs[0].date : "Never"

  const roster = [
    {
      id: "sam",
      clientId: "01",
      name: "Sam",
      initial: "S",
      status: `${phase.name} · Wk ${week}`,
      streak: streak,
      lastLog: lastLogDate,
      weight: currentWeight,
      trend: weightTrend,
      emoji: "🔥",
      isLive: true
    },
    {
      id: "jessica",
      clientId: "02",
      name: "Jessica T.",
      initial: "J",
      status: "Build · Wk 4",
      streak: 12,
      lastLog: "2026-05-11",
      weight: 68.4,
      trend: "down",
      emoji: "💪",
      isLive: false
    },
    {
      id: "marcus",
      clientId: "03",
      name: "Marcus P.",
      initial: "M",
      status: "Load · Wk 8",
      streak: 3,
      lastLog: "2026-05-12",
      weight: 89.2,
      trend: "flat",
      emoji: "⚡",
      isLive: false
    },
    {
      id: "elena",
      clientId: "04",
      name: "Elena R.",
      initial: "E",
      status: "Re-Entry · Wk 1",
      streak: 0,
      lastLog: "2026-04-28",
      weight: 71.0,
      trend: "up",
      emoji: "⚠️",
      isLive: false
    },
    {
      id: "david",
      clientId: "05",
      name: "David K.",
      initial: "D",
      status: "Peak · Wk 14",
      streak: 41,
      lastLog: "2026-05-12",
      weight: 84.5,
      trend: "down",
      emoji: "🏆",
      isLive: false
    }
  ]

  return (
    <PageContainer>
      <SectionLabel eyebrow="Trainer" title="Krishna Joshi — Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {roster.map((client) => (
          <SurfaceCard key={client.id} className="relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1">
                  Client {client.clientId} {client.isLive && <span className="ml-1 text-brand-green/70">● LIVE</span>}
                </div>
                <div className="font-display text-2xl tracking-wider">{client.name}</div>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <span className="font-mono-ui font-medium text-xs">{client.initial}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Status</span>
                <span className="font-mono-ui text-xs text-primary">{client.status}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Streak</span>
                <span className="font-mono-ui text-xs flex items-center gap-1">
                  {client.streak} Days <span className="text-lg leading-none mb-1">{client.emoji}</span>
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Last Log</span>
                <span className={client.lastLog < "2026-05" ? "font-mono-ui text-xs text-brand-red" : "font-mono-ui text-xs"}>{client.lastLog}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Weight Trend</span>
                <span className="font-mono-ui text-xs flex items-center gap-1">
                  {client.weight} kg
                  {client.trend === "down" ? <TrendingDown className="h-3 w-3 text-brand-green" /> : 
                   client.trend === "up" ? <TrendingUp className="h-3 w-3 text-brand-red" /> : 
                   <Minus className="h-3 w-3 text-muted-foreground" />}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link 
                href={`/trainer/client/${client.id}`}
                className="flex-1 bg-surface-2 border border-border text-center py-2 rounded-md font-mono-ui text-[10px] uppercase tracking-wider hover:bg-border transition-colors text-foreground"
              >
                Dashboard
              </Link>
              <Link 
                href={`/trainer/client/${client.id}/logs`}
                className="flex-1 bg-surface-2 border border-border text-center py-2 rounded-md font-mono-ui text-[10px] uppercase tracking-wider hover:bg-border transition-colors text-foreground"
              >
                Logs
              </Link>
            </div>
          </SurfaceCard>
        ))}

        {/* Placeholder for empty roster slots */}
        <SurfaceCard className="flex flex-col items-center justify-center text-center opacity-50 border-dashed border-2 py-10">
          <div className="h-10 w-10 rounded-full bg-surface-2 flex items-center justify-center text-muted-foreground mb-3">
            +
          </div>
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Invite Client
          </div>
        </SurfaceCard>
      </div>
    </PageContainer>
  )
}
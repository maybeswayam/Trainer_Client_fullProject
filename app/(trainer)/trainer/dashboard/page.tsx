"use client"

import { useAuth } from "@/lib/auth"
import { PageContainer, SectionLabel } from "@/components/shared/ui-kit/section"
import { SurfaceCard } from "@/components/shared/ui-kit/cards"
import { DEMO_CLIENTS, getTrainerStats, getPhaseColor } from "@/lib/data/demo-clients"
import Link from "next/link"
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Users, 
  Target, 
  Flame,
  AlertCircle,
  CheckCircle2,
  Activity,
  Calendar,
  ChevronRight,
  UserPlus
} from "lucide-react"

export default function TrainerDashboardPage() {
  const { currentUser } = useAuth()
  const stats = getTrainerStats("trainer-001")
  
  // Convert demo clients to roster array
  const roster = Object.values(DEMO_CLIENTS).map((client, index) => ({
    id: client.id,
    clientId: String(index + 1).padStart(2, "0"),
    name: client.name,
    initial: client.initial,
    email: client.email,
    status: `${client.phase} - Wk ${client.week}`,
    phase: client.phase,
    streak: client.streak,
    lastLog: client.lastLog,
    weight: client.currentWeight,
    startWeight: client.startWeight,
    targetWeight: client.targetWeight,
    trend: client.trend,
    compliance: client.compliance,
    workoutsThisWeek: client.workoutsThisWeek,
    tags: client.tags,
    notes: client.notes,
    isLive: client.id === "sam", // Sam is the live demo client
    needsAttention: client.compliance < 70 || client.streak === 0,
  }))

  // Sort: needs attention first, then by compliance
  const sortedRoster = [...roster].sort((a, b) => {
    if (a.needsAttention && !b.needsAttention) return -1
    if (!a.needsAttention && b.needsAttention) return 1
    return b.compliance - a.compliance
  })

  const trainerName = currentUser?.name || "Krishna Joshi"

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8">
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
          Trainer Dashboard
        </div>
        <h1 className="font-display text-3xl md:text-4xl tracking-wider mb-2">
          Welcome back, {trainerName.split(" ")[0]}
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your clients, track their progress, and build champions.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-green-dim">
              <Users className="w-4 h-4 text-brand-green" />
            </div>
          </div>
          <div className="font-display text-2xl">{stats.totalClients}</div>
          <div className="font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">
            Active Clients
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-blue-dim">
              <Activity className="w-4 h-4 text-brand-blue" />
            </div>
          </div>
          <div className="font-display text-2xl">{stats.activeThisWeek}</div>
          <div className="font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">
            Active This Week
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-amber-dim">
              <Target className="w-4 h-4 text-brand-amber" />
            </div>
          </div>
          <div className="font-display text-2xl">{stats.avgCompliance}%</div>
          <div className="font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">
            Avg Compliance
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-red-dim">
              <AlertCircle className="w-4 h-4 text-brand-red" />
            </div>
          </div>
          <div className="font-display text-2xl">{stats.clientsNeedingAttention}</div>
          <div className="font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">
            Need Attention
          </div>
        </div>
      </div>

      {/* Clients Needing Attention Alert */}
      {stats.clientsNeedingAttention > 0 && (
        <div className="mb-6 p-4 bg-brand-red-dim border border-brand-red/20 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-sm mb-1">Clients Need Your Attention</div>
              <div className="text-xs text-muted-foreground">
                {stats.clientsNeedingAttention} client(s) have low compliance or broken streaks. 
                Check in with them to keep them on track.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Roster */}
      <SectionLabel eyebrow="Your Roster" title="Client Overview" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {sortedRoster.map((client) => (
          <SurfaceCard key={client.id} className="relative overflow-hidden group hover:border-border-strong transition-colors">
            {/* Needs attention indicator */}
            {client.needsAttention && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red" />
            )}
            
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1 flex items-center gap-2">
                  Client {client.clientId}
                  {client.isLive && (
                    <span className="inline-flex items-center gap-1 text-brand-green">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inset-0 rounded-full bg-brand-green animate-ping opacity-60" />
                        <span className="relative rounded-full bg-brand-green h-1.5 w-1.5" />
                      </span>
                      LIVE
                    </span>
                  )}
                </div>
                <div className="font-display text-2xl tracking-wider">{client.name}</div>
              </div>
              <div 
                className="h-10 w-10 rounded-full flex items-center justify-center border"
                style={{ 
                  background: `${getPhaseColor(client.phase)}15`,
                  borderColor: `${getPhaseColor(client.phase)}30`,
                  color: getPhaseColor(client.phase)
                }}
              >
                <span className="font-mono-ui font-medium text-sm">{client.initial}</span>
              </div>
            </div>

            {/* Phase Badge */}
            <div 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-4"
              style={{ 
                background: `${getPhaseColor(client.phase)}15`,
                border: `1px solid ${getPhaseColor(client.phase)}30`
              }}
            >
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: getPhaseColor(client.phase) }}
              />
              <span 
                className="font-mono-ui text-[10px] uppercase tracking-wider"
                style={{ color: getPhaseColor(client.phase) }}
              >
                {client.status}
              </span>
            </div>

            {/* Stats Grid */}
            <div className="space-y-2.5 mb-4">
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  Streak
                </span>
                <span className="font-mono-ui text-xs flex items-center gap-1.5">
                  {client.streak} Days
                  {client.streak >= 7 && <span className="text-brand-amber">*</span>}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  Compliance
                </span>
                <span className={`font-mono-ui text-xs ${
                  client.compliance >= 90 ? "text-brand-green" :
                  client.compliance >= 70 ? "text-brand-amber" :
                  "text-brand-red"
                }`}>
                  {client.compliance}%
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Last Log
                </span>
                <span className={`font-mono-ui text-xs ${
                  client.lastLog < "2026-05-08" ? "text-brand-red" : ""
                }`}>
                  {client.lastLog}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Weight
                </span>
                <span className="font-mono-ui text-xs flex items-center gap-1.5">
                  {client.weight} kg
                  {client.trend === "down" ? (
                    <TrendingDown className="h-3 w-3 text-brand-green" />
                  ) : client.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-brand-red" />
                  ) : (
                    <Minus className="h-3 w-3 text-muted-foreground" />
                  )}
                </span>
              </div>
            </div>

            {/* Tags */}
            {client.tags && client.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {client.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 bg-surface-2 rounded text-[9px] font-mono-ui uppercase tracking-wider text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Link 
                href={`/trainer/client/${client.id}`}
                className="flex-1 flex items-center justify-center gap-1.5 bg-surface-2 border border-border text-center py-2.5 rounded-md font-mono-ui text-[10px] uppercase tracking-wider hover:bg-border hover:border-border-strong transition-colors text-foreground group/btn"
              >
                Dashboard
                <ChevronRight className="w-3 h-3 opacity-0 -ml-1 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
              </Link>
              <Link 
                href={`/trainer/client/${client.id}/logs`}
                className="flex-1 flex items-center justify-center gap-1.5 bg-surface-2 border border-border text-center py-2.5 rounded-md font-mono-ui text-[10px] uppercase tracking-wider hover:bg-border hover:border-border-strong transition-colors text-foreground group/btn"
              >
                Logs
                <ChevronRight className="w-3 h-3 opacity-0 -ml-1 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
              </Link>
            </div>
          </SurfaceCard>
        ))}

        {/* Add Client Card */}
        <SurfaceCard className="flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 border-dashed border-2 py-12 cursor-pointer hover:border-brand-green/30 transition-all group">
          <div className="h-12 w-12 rounded-full bg-surface-2 flex items-center justify-center text-muted-foreground mb-3 group-hover:bg-brand-green-dim group-hover:text-brand-green transition-colors">
            <UserPlus className="w-5 h-5" />
          </div>
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Add New Client
          </div>
          <div className="text-[9px] text-faint mt-1">
            Coming soon
          </div>
        </SurfaceCard>
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-8 p-4 bg-surface border border-border rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-brand-green" />
          <span className="font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground">
            Weekly Summary
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground text-xs mb-1">Total Workouts Logged</div>
            <div className="font-display text-xl">
              {Object.values(DEMO_CLIENTS).reduce((sum, c) => sum + c.workoutsThisWeek, 0)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs mb-1">Avg Daily Steps</div>
            <div className="font-display text-xl">
              {Math.round(Object.values(DEMO_CLIENTS).reduce((sum, c) => sum + c.avgSteps, 0) / 5).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs mb-1">Avg Protein Intake</div>
            <div className="font-display text-xl">
              {Math.round(Object.values(DEMO_CLIENTS).reduce((sum, c) => sum + c.avgProtein, 0) / 5)}g
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs mb-1">On Track for Goals</div>
            <div className="font-display text-xl text-brand-green">
              {stats.clientsOnTrack}/{stats.totalClients}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

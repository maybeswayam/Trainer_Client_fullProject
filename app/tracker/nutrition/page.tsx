"use client"

import { useEffect, useState } from "react"
import { PageContainer, SectionLabel } from "@/components/ui-kit/section"
import { StatCard, SurfaceCard } from "@/components/ui-kit/cards"
import { BarChart } from "@/components/tracker/bar-chart"
import {
  getData,
  fmtDate,
  daysSinceStart,
  getDaysSinceStart,
  type TrackerData,
} from "@/lib/tracker-store"

export default function NutritionPage() {
  const [data, setData] = useState<TrackerData | null>(null)
  useEffect(() => { setData(getData()) }, [])
  if (!data) return null

  // Last 7 days stats
  const logs7 = data.dailyLogs.filter((l) => daysSinceStart(l.date) >= getDaysSinceStart() - 6)
  const protLogs = logs7.filter((l) => l.protein)
  const waterLogs = logs7.filter((l) => l.water)
  const stepsLogs = logs7.filter((l) => l.steps)

  const avgProt = protLogs.length ? Math.round(protLogs.reduce((a, l) => a + (l.protein || 0), 0) / protLogs.length) : null
  const avgWater = waterLogs.length ? (waterLogs.reduce((a, l) => a + (l.water || 0), 0) / waterLogs.length).toFixed(1) : null
  const avgSteps = stepsLogs.length ? Math.round(stepsLogs.reduce((a, l) => a + (l.steps || 0), 0) / stepsLogs.length) : null
  const protDays = data.dailyLogs.filter((l) => (l.protein || 0) >= 160).length

  // Chart data — last 14 days
  const logsForCharts = [...data.dailyLogs].sort((a, b) => a.date.localeCompare(b.date)).slice(-14)

  const proteinChartData = logsForCharts.map((l) => ({
    date: fmtDate(l.date),
    protein: l.protein || 0,
  }))

  const stepsChartData = logsForCharts.map((l) => ({
    date: fmtDate(l.date),
    steps: l.steps || 0,
  }))

  return (
    <PageContainer>
      <SectionLabel eyebrow="Fuel" title="Daily Nutrition" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Avg Protein (7d)" value={avgProt ?? "—"} sub="g · target 170g" color="var(--brand-green)" />
        <StatCard label="Protein days hit" value={protDays} sub="days ≥160g" color="var(--brand-blue)" />
        <StatCard label="Avg Water (7d)" value={avgWater ?? "—"} sub="L · target 3.5L" color="var(--brand-teal)" />
        <StatCard label="Avg Steps (7d)" value={avgSteps ? avgSteps.toLocaleString() : "—"} sub="target 15,000" color="var(--brand-amber)" />
      </div>

      {/* Protein chart */}
      <SurfaceCard className="mb-4">
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Protein Intake (Last 14 Days)</div>
        <BarChart
          data={proteinChartData}
          dataKey="protein"
          xKey="date"
          height={200}
          colorFn={(entry) => ((entry.protein as number) || 0) >= 160 ? "rgba(184,245,160,0.7)" : "rgba(245,111,111,0.6)"}
          refLines={[{ value: 170, label: "170g", color: "var(--brand-amber)", dash: "3 3" }]}
          yDomain={[0, 220]}
          emptyHint="Log your protein on the Log Today page to track intake."
        />
      </SurfaceCard>

      {/* Steps chart */}
      <SurfaceCard>
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Steps (Last 14 Days)</div>
        <BarChart
          data={stepsChartData}
          dataKey="steps"
          xKey="date"
          height={180}
          colorFn={(entry) => ((entry.steps as number) || 0) >= 15000 ? "rgba(184,245,160,0.7)" : "rgba(126,200,245,0.5)"}
          refLines={[{ value: 15000, label: "15k", color: "var(--brand-amber)", dash: "3 3" }]}
          emptyHint="Log your daily steps to see trends."
        />
      </SurfaceCard>
    </PageContainer>
  )
}

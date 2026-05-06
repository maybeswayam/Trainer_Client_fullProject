"use client"

import { useEffect, useState } from "react"
import { PageContainer, SectionLabel } from "@/components/ui-kit/section"
import { StatCard, SurfaceCard, Pill } from "@/components/ui-kit/cards"
import { LineChart } from "@/components/ui-kit/line-chart"
import {
  getData,
  fmtDate,
  daysSinceStart,
  getDaysSinceStart,
  START_DATE,
  type TrackerData,
} from "@/lib/tracker-store"

export default function WeightPage() {
  const [data, setData] = useState<TrackerData | null>(null)
  const [range, setRange] = useState<"all" | "4w" | "2w">("all")

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

  // Filter by range
  let filtered = weights
  if (range === "4w") filtered = weights.filter((w) => daysSinceStart(w.date) >= getDaysSinceStart() - 28)
  else if (range === "2w") filtered = weights.filter((w) => daysSinceStart(w.date) >= getDaysSinceStart() - 14)

  // Chart data
  const chartData = [
    { date: fmtDate(START_DATE), weight: 112, target: 100 },
    ...filtered.map((w) => ({ date: fmtDate(w.date), weight: w.val, target: 100 })),
  ]

  // Weekly averages
  const byWeek: Record<number, number[]> = {}
  weights.forEach((w) => {
    const wk = Math.ceil((daysSinceStart(w.date) + 1) / 7)
    if (!byWeek[wk]) byWeek[wk] = []
    byWeek[wk].push(w.val)
  })
  const weeklyRows = Object.entries(byWeek)
    .map(([wk, vals]) => ({
      wk: parseInt(wk),
      avg: (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1),
      min: Math.min(...vals).toFixed(1),
    }))
    .sort((a, b) => a.wk - b.wk)

  return (
    <PageContainer>
      <SectionLabel eyebrow="Progress" title="Weight Journey" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Start" value="112" sub="kg · May 4" color="var(--brand-red)" />
        <StatCard label="Current" value={weights.length ? currentWeight.toFixed(1) : "—"} sub="kg" color="var(--brand-green)" />
        <StatCard label="Lost so far" value={lost} sub="kg total" color="var(--brand-amber)" />
        <StatCard label="Target" value="100" sub="kg by Aug 31" color="var(--brand-purple)" />
      </div>

      {/* Chart */}
      <SurfaceCard className="mb-4">
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Weight over time</div>
        <div className="flex gap-2 mb-4">
          {(["all", "4w", "2w"] as const).map((r) => (
            <Pill key={r} active={range === r} onClick={() => setRange(r)}>
              {r === "all" ? "All" : r === "4w" ? "4 weeks" : "2 weeks"}
            </Pill>
          ))}
        </div>
        <LineChart
          data={chartData}
          series={[
            { key: "weight", label: "Weight", color: "var(--brand-green)" },
            { key: "target", label: "Target", color: "var(--brand-purple)", strokeDasharray: "4 4" },
          ]}
          xKey="date"
          height={260}
          yDomain={[95, 115]}
          emptyHint="Log your weight daily to see your trend."
        />
      </SurfaceCard>

      {/* Weekly averages */}
      <SurfaceCard>
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Weekly Averages</div>
        {!weeklyRows.length ? (
          <div className="text-center py-8 text-[13px] text-muted-foreground">Log weight daily to see weekly averages.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">Week</th>
                  <th className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">Avg Weight</th>
                  <th className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">Lowest</th>
                  <th className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">vs Prev Week</th>
                </tr>
              </thead>
              <tbody>
                {weeklyRows.map((r, i) => {
                  const prev = weeklyRows[i - 1]
                  const diff = prev ? parseFloat(r.avg) - parseFloat(prev.avg) : null
                  const diffColor = diff === null ? "" : diff < 0 ? "var(--brand-green)" : diff > 0 ? "var(--brand-red)" : "var(--muted-foreground)"
                  return (
                    <tr key={r.wk} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                      <td className="py-2.5 px-2 font-mono-ui">Wk {r.wk}</td>
                      <td className="py-2.5 px-2 font-display text-lg">{r.avg} kg</td>
                      <td className="py-2.5 px-2" style={{ color: "var(--brand-green)" }}>{r.min} kg</td>
                      <td className="py-2.5 px-2 font-mono-ui text-[11px]" style={{ color: diffColor }}>
                        {diff === null ? "—" : `${diff > 0 ? "+" : ""}${diff.toFixed(1)} kg`}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </SurfaceCard>
    </PageContainer>
  )
}

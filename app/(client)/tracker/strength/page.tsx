"use client"

import { useEffect, useState } from "react"
import { PageContainer, SectionLabel } from "@/components/shared/ui-kit/section"
import { SurfaceCard, Pill } from "@/components/shared/ui-kit/cards"
import { LineChart } from "@/components/shared/ui-kit/line-chart"
import {
  getData,
  getBestLift,
  fmtDate,
  LIFT_TARGETS,
  START_DATE,
  type TrackerData,
} from "@/lib/tracker-store"

export default function StrengthPage() {
  const [data, setData] = useState<TrackerData | null>(null)
  const [activeLift, setActiveLift] = useState("bench")

  useEffect(() => {
    setData(getData())
    const handleUpdate = () => setData(getData())
    window.addEventListener("tracker-updated", handleUpdate)
    return () => window.removeEventListener("tracker-updated", handleUpdate)
  }, [])
  if (!data) return null

  // Lift progress rows
  const liftRows = Object.entries(LIFT_TARGETS).map(([key, def]) => {
    const best = getBestLift(data, key) ?? def.start
    const target = def.targets[4]
    const range = target - def.start
    const pct = range > 0 ? Math.min(100, Math.round(((best - def.start) / range) * 100)) : 0
    const barColor = pct >= 80 ? "var(--brand-green)" : pct >= 50 ? "var(--brand-blue)" : "var(--brand-amber)"
    return { key, def, best, target, pct, barColor }
  })

  // Chart data for active lift
  const activeDef = LIFT_TARGETS[activeLift]
  const liftEntries = data.lifts.filter((l) => l.lift === activeLift).sort((a, b) => a.date.localeCompare(b.date))
  const chartData = [
    { date: fmtDate(START_DATE), value: activeDef.start, target: activeDef.targets[4] },
    ...liftEntries.map((e) => ({ date: fmtDate(e.date), value: e.weight, target: activeDef.targets[4] })),
  ]

  // History table
  const allLifts = [...data.lifts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <PageContainer>
      <SectionLabel eyebrow="Progression" title="Strength Tracker" />

      {/* Progress bars */}
      <SurfaceCard className="mb-4">
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Progress to Targets</div>
        <div className="space-y-1">
          {liftRows.map((r) => (
            <div key={r.key} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
              <div className="min-w-[120px]">
                <div className="text-[13px] font-medium">{r.def.label}</div>
                <div className="font-mono-ui text-[10px] text-muted-foreground">{r.def.start} → {r.target} {r.def.unit}</div>
              </div>
              <div className="font-display text-2xl leading-none min-w-[60px]" style={{ color: r.barColor }}>{r.best}</div>
              <div className="flex-1">
                <div className="h-[5px] bg-faint rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${r.pct}%`, background: r.barColor }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-mono-ui text-[9px] text-muted-foreground">{r.def.unit}</span>
                  <span className="font-mono-ui text-[9px] text-muted-foreground">{r.pct}% to goal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>

      {/* Lift history chart */}
      <SectionLabel eyebrow="Charts" title="Lift History" />
      <div className="flex gap-2 flex-wrap mb-3">
        {Object.entries(LIFT_TARGETS).map(([key, def]) => (
          <Pill key={key} active={activeLift === key} onClick={() => setActiveLift(key)} color="var(--brand-blue)">
            {def.label.split(" ")[0]}
          </Pill>
        ))}
      </div>
      <SurfaceCard className="mb-4">
        <LineChart
          data={chartData}
          series={[
            { key: "value", label: activeDef.label, color: "var(--brand-blue)" },
            { key: "target", label: "Target", color: "var(--brand-green)", strokeDasharray: "4 4" },
          ]}
          xKey="date"
          height={240}
          emptyHint="Log lifts on the Log Today page to track progression."
        />
      </SurfaceCard>

      {/* All lift entries table */}
      <SurfaceCard>
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">All Lift Entries</div>
        {!allLifts.length ? (
          <div className="text-center py-8 text-[13px] text-muted-foreground">
            <div className="text-3xl mb-2 opacity-40">🏋️</div>
            No lifts logged yet. Start tomorrow.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">Lift</th>
                  <th className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">Weight/Reps</th>
                  <th className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">PR?</th>
                </tr>
              </thead>
              <tbody>
                {allLifts.map((l, i) => {
                  const def = LIFT_TARGETS[l.lift] || { label: l.lift, unit: "kg" }
                  const maxW = Math.max(...data.lifts.filter((x) => x.lift === l.lift).map((x) => x.weight))
                  const isPR = l.weight === maxW
                  return (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                      <td className="py-2.5 px-2 text-muted-foreground font-mono-ui text-[10px]">{fmtDate(l.date)}</td>
                      <td className="py-2.5 px-2 font-medium">{def.label}</td>
                      <td className="py-2.5 px-2 font-mono-ui">{l.weight} {def.unit} × {l.reps}</td>
                      <td className="py-2.5 px-2">
                        {isPR && (
                          <span className="inline-block font-mono-ui text-[9px] px-2 py-0.5 rounded" style={{ background: "var(--brand-amber-dim)", color: "var(--brand-amber)", border: "1px solid rgba(245,200,66,0.2)" }}>
                            🏆 PR
                          </span>
                        )}
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

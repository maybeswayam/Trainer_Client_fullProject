"use client"

import { useEffect, useState, useCallback } from "react"
import { PageContainer, SectionLabel } from "@/components/ui-kit/section"
import { StatCard, SurfaceCard } from "@/components/ui-kit/cards"
import { FieldLabel, Input, Select, PrimaryButton } from "@/components/ui-kit/form-fields"
import { BarChart } from "@/components/tracker/bar-chart"
import {
  getData,
  saveData,
  todayStr,
  fmtDate,
  type TrackerData,
} from "@/lib/tracker-store"
import { toast } from "sonner"
import { Plus, X } from "lucide-react"

export default function CardioPage() {
  const [data, setData] = useState<TrackerData | null>(null)
  const [dist, setDist] = useState("")
  const [time, setTime] = useState("")
  const [surface, setSurface] = useState("grass")

  const reload = useCallback(() => setData(getData()), [])
  useEffect(() => { reload() }, [reload])
  if (!data) return null

  const runs = [...data.runs].sort((a, b) => a.date.localeCompare(b.date))
  const runsDesc = [...data.runs].sort((a, b) => b.date.localeCompare(a.date))
  const totalKm = runs.reduce((a, r) => a + r.dist, 0)
  const longest = runs.length ? Math.max(...runs.map((r) => r.dist)) : 0

  // Best pace
  let bestPace = "—"
  const paceRuns = runs.filter((r) => r.time && r.dist > 0)
  if (paceRuns.length) {
    const paces = paceRuns.map((r) => {
      const p = r.time.split(":")
      if (p.length === 2) {
        const m = parseInt(p[0]) + parseInt(p[1]) / 60
        return m / r.dist
      }
      return Infinity
    }).filter((p) => p < Infinity && p > 0)
    if (paces.length) bestPace = Math.min(...paces).toFixed(2)
  }

  // Chart data
  const chartData = runs.map((r) => ({
    date: fmtDate(r.date),
    distance: r.dist,
  }))

  function handleSaveRun() {
    const d = parseFloat(dist)
    if (!d) { toast.error("Enter distance"); return }
    const dd = getData()
    dd.runs.push({ date: todayStr(), dist: d, time, surface })
    dd.runs.sort((a, b) => a.date.localeCompare(b.date))
    dd.xp = (dd.xp || 0) + Math.round(d * 5)
    saveData(dd)
    setDist(""); setTime("")
    if (dd.runs.filter((r) => r.dist >= d).length === 1) toast.success(`Longest run ever: ${d}km 🏃`)
    else toast.success(`Run logged: ${d}km`)
    reload()
  }

  function deleteRun(date: string, distance: number) {
    const dd = getData()
    const idx = dd.runs.findIndex((r) => r.date === date && r.dist === distance)
    if (idx > -1) { dd.runs.splice(idx, 1); saveData(dd); toast("Run deleted"); reload() }
  }

  return (
    <PageContainer>
      <SectionLabel eyebrow="Endurance" title="Cardio & Running" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Runs" value={runs.length} sub="sessions logged" color="var(--brand-green)" />
        <StatCard label="Total Distance" value={totalKm.toFixed(1)} sub="km covered" color="var(--brand-blue)" />
        <StatCard label="Longest Run" value={longest.toFixed(1)} sub="km" color="var(--brand-amber)" />
        <StatCard label="Best 5km Pace" value={bestPace} sub="min/km" color="var(--brand-purple)" />
      </div>

      {/* Log run form */}
      <SurfaceCard className="mb-4">
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Log a Run</div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <FieldLabel>Distance (km)</FieldLabel>
            <Input type="number" step="0.1" min="0" placeholder="e.g. 5.2" value={dist} onChange={(e) => setDist(e.target.value)} />
          </div>
          <div>
            <FieldLabel>Time (mm:ss)</FieldLabel>
            <Input type="text" placeholder="e.g. 32:45" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div>
            <FieldLabel>Surface</FieldLabel>
            <Select value={surface} onChange={(e) => setSurface(e.target.value)}>
              <option value="grass">Grass field</option>
              <option value="road">Road</option>
              <option value="treadmill">Treadmill</option>
            </Select>
          </div>
          <PrimaryButton onClick={handleSaveRun}>
            <Plus className="w-4 h-4" /> Add Run
          </PrimaryButton>
        </div>
      </SurfaceCard>

      {/* Chart */}
      <SurfaceCard className="mb-4">
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Distance Progression</div>
        <BarChart
          data={chartData}
          dataKey="distance"
          xKey="date"
          height={220}
          colorFn={(entry) => {
            const d = (entry.distance as number) || 0
            if (d >= 10) return "var(--brand-green)"
            if (d >= 7) return "var(--brand-blue)"
            if (d >= 5) return "var(--brand-amber)"
            return "var(--brand-purple)"
          }}
          emptyHint="Log your first run to see distance progression."
        />
      </SurfaceCard>

      {/* Run log */}
      <SurfaceCard>
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Run Log</div>
        {!runsDesc.length ? (
          <div className="text-center py-8 text-[13px] text-muted-foreground">
            <div className="text-3xl mb-2 opacity-40">🏃</div>
            No runs logged yet. Your first run starts tomorrow.
          </div>
        ) : (
          <div className="space-y-0">
            {runsDesc.map((r, i) => {
              let pace = "—"
              if (r.time) {
                const parts = r.time.split(":")
                if (parts.length === 2) {
                  const mins = parseInt(parts[0]) + parseInt(parts[1]) / 60
                  pace = (mins / r.dist).toFixed(2) + " min/km"
                }
              }
              return (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 text-[13px]">
                  <span className="font-mono-ui text-[10px] text-muted-foreground min-w-[55px]">{fmtDate(r.date)}</span>
                  <span className="font-display text-xl leading-none min-w-[45px]" style={{ color: "var(--brand-green)" }}>{r.dist}</span>
                  <span className="font-mono-ui text-[9px] text-muted-foreground">KM</span>
                  <span className="font-mono-ui text-[11px] text-muted-foreground ml-2">{r.time || "—"} {pace !== "—" ? ` · ${pace}` : ""}</span>
                  <span className="font-mono-ui text-[9px] text-muted-foreground ml-2">{r.surface || ""}</span>
                  <button onClick={() => deleteRun(r.date, r.dist)} className="ml-auto text-faint hover:text-destructive transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </SurfaceCard>
    </PageContainer>
  )
}

"use client"

import { useEffect, useState, useCallback } from "react"
import { PageContainer, SectionLabel } from "@/components/ui-kit/section"
import { SurfaceCard } from "@/components/ui-kit/cards"
import { FieldLabel, Input, PrimaryButton } from "@/components/ui-kit/form-fields"
import { LineChart } from "@/components/ui-kit/line-chart"
import {
  getData,
  saveData,
  todayStr,
  fmtDate,
  type TrackerData,
} from "@/lib/tracker-store"
import { toast } from "sonner"
import { Ruler } from "lucide-react"

export default function MeasurementsPage() {
  const [data, setData] = useState<TrackerData | null>(null)
  const [waist, setWaist] = useState("")
  const [chest, setChest] = useState("")
  const [hip, setHip] = useState("")
  const [thigh, setThigh] = useState("")
  const [arm, setArm] = useState("")
  const [neck, setNeck] = useState("")

  const reload = useCallback(() => setData(getData()), [])
  useEffect(() => {
    reload()
    const handleUpdate = () => reload()
    window.addEventListener("tracker-updated", handleUpdate)
    return () => window.removeEventListener("tracker-updated", handleUpdate)
  }, [reload])
  if (!data) return null

  function handleSave() {
    const obj: Record<string, number> = {}
    let any = false
    const vals = { waist: parseFloat(waist), chest: parseFloat(chest), hip: parseFloat(hip), thigh: parseFloat(thigh), arm: parseFloat(arm), neck: parseFloat(neck) }
    for (const [k, v] of Object.entries(vals)) {
      if (v) { obj[k] = v; any = true }
    }
    if (!any) { toast.error("Enter at least one measurement"); return }
    const d = getData()
    d.measurements.push({ date: todayStr(), ...obj } as any)
    d.measurements.sort((a, b) => a.date.localeCompare(b.date))
    saveData(d)
    setWaist(""); setChest(""); setHip(""); setThigh(""); setArm(""); setNeck("")
    toast.success("Measurements saved!")
    reload()
  }

  const meas = [...data.measurements].sort((a, b) => a.date.localeCompare(b.date))
  const measDesc = [...data.measurements].sort((a, b) => b.date.localeCompare(a.date))

  // Waist trend chart
  const waistData = meas.filter((m) => m.waist).map((m) => ({ date: fmtDate(m.date), waist: m.waist }))

  // Latest measurements
  const latest = meas.length ? meas[meas.length - 1] : null
  const measFields = [
    { key: "waist", label: "Waist" },
    { key: "chest", label: "Chest" },
    { key: "hip", label: "Hip" },
    { key: "thigh", label: "Thigh" },
    { key: "arm", label: "Arm" },
    { key: "neck", label: "Neck" },
  ] as const

  return (
    <PageContainer>
      <SectionLabel eyebrow="Body Composition" title="Measurements" />

      {/* Latest readout */}
      {latest && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
          {measFields.map((f) => {
            const val = latest[f.key as keyof typeof latest] as number | undefined
            return (
              <div key={f.key} className="bg-surface-2 border border-border rounded-lg px-3 py-2.5">
                <div className="font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground mb-1">{f.label}</div>
                <div className="font-display text-xl leading-none">{val ? `${val}` : "—"}</div>
                {val && <div className="font-mono-ui text-[10px] text-muted-foreground mt-0.5">cm</div>}
              </div>
            )
          })}
        </div>
      )}

      {/* Form */}
      <SurfaceCard className="mb-4">
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Log Measurements</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          <div><FieldLabel>Waist (cm)</FieldLabel><Input type="number" step="0.5" placeholder="e.g. 104" value={waist} onChange={(e) => setWaist(e.target.value)} /></div>
          <div><FieldLabel>Chest (cm)</FieldLabel><Input type="number" step="0.5" placeholder="e.g. 118" value={chest} onChange={(e) => setChest(e.target.value)} /></div>
          <div><FieldLabel>Hip (cm)</FieldLabel><Input type="number" step="0.5" placeholder="e.g. 112" value={hip} onChange={(e) => setHip(e.target.value)} /></div>
          <div><FieldLabel>Thigh (cm)</FieldLabel><Input type="number" step="0.5" placeholder="e.g. 68" value={thigh} onChange={(e) => setThigh(e.target.value)} /></div>
          <div><FieldLabel>Arm (cm)</FieldLabel><Input type="number" step="0.5" placeholder="e.g. 38" value={arm} onChange={(e) => setArm(e.target.value)} /></div>
          <div><FieldLabel>Neck (cm)</FieldLabel><Input type="number" step="0.5" placeholder="e.g. 42" value={neck} onChange={(e) => setNeck(e.target.value)} /></div>
        </div>
        <PrimaryButton onClick={handleSave}>
          <Ruler className="w-4 h-4" /> Save Measurements
        </PrimaryButton>
      </SurfaceCard>

      {/* Waist chart */}
      <SurfaceCard className="mb-4">
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Waist Trend</div>
        <LineChart
          data={waistData}
          series={[{ key: "waist", label: "Waist", color: "var(--brand-amber)" }]}
          xKey="date"
          height={200}
          emptyHint="Log waist measurements to track your trend."
        />
      </SurfaceCard>

      {/* History table */}
      <SurfaceCard>
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Measurement History</div>
        {!measDesc.length ? (
          <div className="text-center py-8 text-[13px] text-muted-foreground">
            <div className="text-3xl mb-2 opacity-40">📏</div>
            No measurements yet. Log your Day 1 now.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">Date</th>
                  {measFields.map((f) => (
                    <th key={f.key} className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">{f.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {measDesc.map((m, i) => {
                  const prev = measDesc[i + 1]
                  return (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                      <td className="py-2.5 px-2 text-muted-foreground font-mono-ui text-[10px]">{fmtDate(m.date)}</td>
                      {measFields.map((f) => {
                        const val = m[f.key as keyof typeof m] as number | undefined
                        const prevVal = prev ? (prev[f.key as keyof typeof prev] as number | undefined) : undefined
                        const delta = val && prevVal ? val - prevVal : null
                        const deltaColor = delta === null ? "" : delta < 0 ? "var(--brand-green)" : delta > 0 ? "var(--brand-red)" : "var(--muted-foreground)"
                        return (
                          <td key={f.key} className="py-2.5 px-2">
                            {val ? (
                              <>
                                {val}
                                {delta !== null && (
                                  <span className="font-mono-ui text-[10px] ml-1" style={{ color: deltaColor }}>
                                    {delta > 0 ? "+" : ""}{delta.toFixed(1)}
                                  </span>
                                )}
                              </>
                            ) : "—"}
                          </td>
                        )
                      })}
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

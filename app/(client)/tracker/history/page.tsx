"use client"

import { useEffect, useState, useCallback } from "react"
import { PageContainer, SectionLabel } from "@/components/shared/ui-kit/section"
import { SurfaceCard } from "@/components/shared/ui-kit/cards"
import { GhostButton } from "@/components/shared/ui-kit/form-fields"
import {
  getData,
  resetData,
  fmtDate,
  daysSinceStart,
  START_DATE,
  dateStr,
  type TrackerData,
} from "@/lib/tracker-store"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

export default function HistoryPage() {
  const [data, setData] = useState<TrackerData | null>(null)

  const reload = useCallback(() => setData(getData()), [])
  useEffect(() => {
    reload()
    const handleUpdate = () => reload()
    window.addEventListener("tracker-updated", handleUpdate)
    return () => window.removeEventListener("tracker-updated", handleUpdate)
  }, [reload])

  if (!data) return null

  const logs = [...data.dailyLogs].sort((a, b) => b.date.localeCompare(a.date))

  // Week summary
  const weekRows: {
    wk: number
    phase: string
    phColor: string
    wkStartLabel: string
    sessions: number
    avgWeight: string
    avgProt: number
    completion: number
  }[] = []

  for (let wk = 1; wk <= 17; wk++) {
    const wkStart = new Date(START_DATE)
    wkStart.setDate(wkStart.getDate() + (wk - 1) * 7)
    const wkEnd = new Date(wkStart)
    wkEnd.setDate(wkEnd.getDate() + 6)
    const wkStartS = dateStr(wkStart)
    const wkEndS = dateStr(wkEnd)

    const wkLogs = data.dailyLogs.filter((l) => l.date >= wkStartS && l.date <= wkEndS)
    const sessions = wkLogs.filter((l) => l.session && l.session !== "Rest Day").length
    const protLogs = wkLogs.filter((l) => l.protein)
    const avgProt = protLogs.length
      ? Math.round(protLogs.reduce((a, l) => a + (l.protein || 0), 0) / protLogs.length)
      : 0
    const wkWeights = data.weights.filter((w) => w.date >= wkStartS && w.date <= wkEndS)
    const avgWeight = wkWeights.length
      ? (wkWeights.reduce((a, w) => a + w.val, 0) / wkWeights.length).toFixed(1)
      : "—"

    const phase = wk <= 1 ? "Re-Entry" : wk <= 5 ? "Build" : wk <= 11 ? "Load" : wk <= 16 ? "Peak" : "Forge"
    const phColor =
      wk <= 1 ? "var(--brand-green)" : wk <= 5 ? "var(--brand-blue)" : wk <= 11 ? "var(--brand-amber)" : wk <= 16 ? "var(--brand-red)" : "var(--brand-purple)"

    weekRows.push({
      wk,
      phase,
      phColor,
      wkStartLabel: fmtDate(wkStartS),
      sessions,
      avgWeight,
      avgProt,
      completion: Math.round((sessions / 5) * 100),
    })
  }

  function handleReset() {
    if (confirm("Reset ALL data? This cannot be undone.")) {
      resetData()
      toast.success("All data cleared. Fresh start! 🔄")
      reload()
    }
  }

  return (
    <PageContainer>
      <SectionLabel eyebrow="Archive" title="Full Training History" />

      {/* Weekly performance */}
      <SurfaceCard className="mb-4">
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Weekly Performance</div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px] min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                {["Week", "Phase", "Dates", "Sessions", "Avg Weight", "Avg Protein", "Completion"].map((h) => (
                  <th key={h} className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weekRows.map((r) => (
                <tr key={r.wk} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                  <td className="py-2.5 px-2 font-mono-ui font-medium">Wk {r.wk}</td>
                  <td className="py-2.5 px-2 text-[11px]" style={{ color: r.phColor }}>{r.phase}</td>
                  <td className="py-2.5 px-2 font-mono-ui text-[10px] text-muted-foreground">{r.wkStartLabel}</td>
                  <td className="py-2.5 px-2">
                    <span className="font-display text-lg" style={{ color: "var(--brand-blue)" }}>{r.sessions}</span>
                    <span className="text-muted-foreground">/5</span>
                  </td>
                  <td className="py-2.5 px-2" style={{ color: "var(--brand-green)" }}>{r.avgWeight} kg</td>
                  <td className="py-2.5 px-2" style={{ color: r.avgProt >= 160 ? "var(--brand-green)" : "var(--muted-foreground)" }}>
                    {r.avgProt ? `${r.avgProt}g` : "—"}
                  </td>
                  <td className="py-2.5 px-2 min-w-[80px]">
                    <div className="h-[4px] bg-faint rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${r.completion}%`, background: "var(--brand-green)" }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>

      {/* All log entries */}
      <SurfaceCard>
        <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">All Log Entries</div>
        {!logs.length ? (
          <div className="text-center py-8 text-[13px] text-muted-foreground">
            <div className="text-3xl mb-2 opacity-40">📋</div>
            No entries yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[12px] min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  {["Date", "Session", "Duration", "Protein", "Steps", "Water", "Notes"].map((h) => (
                    <th key={h} className="text-left py-2 px-2 font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                    <td className="py-2.5 px-2 text-muted-foreground font-mono-ui text-[10px]">{fmtDate(l.date)}</td>
                    <td className="py-2.5 px-2">
                      {l.session ? (
                        <span
                          className="inline-block font-mono-ui text-[9px] px-2 py-0.5 rounded"
                          style={{
                            background: l.session === "Rest Day" ? "var(--brand-red-dim)" : "var(--brand-blue-dim)",
                            color: l.session === "Rest Day" ? "var(--brand-red)" : "var(--brand-blue)",
                            border: `1px solid ${l.session === "Rest Day" ? "rgba(245,111,111,0.2)" : "rgba(126,200,245,0.2)"}`,
                          }}
                        >
                          {l.session}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="py-2.5 px-2 font-mono-ui">{l.duration ? `${l.duration}min` : "—"}</td>
                    <td className="py-2.5 px-2" style={{ color: (l.protein || 0) >= 160 ? "var(--brand-green)" : "var(--muted-foreground)" }}>
                      {l.protein ? `${l.protein}g` : "—"}
                    </td>
                    <td className="py-2.5 px-2" style={{ color: (l.steps || 0) >= 15000 ? "var(--brand-green)" : "var(--muted-foreground)" }}>
                      {l.steps ? l.steps.toLocaleString() : "—"}
                    </td>
                    <td className="py-2.5 px-2" style={{ color: (l.water || 0) >= 3.5 ? "var(--brand-teal)" : "var(--muted-foreground)" }}>
                      {l.water ? `${l.water}L` : "—"}
                    </td>
                    <td className="py-2.5 px-2 text-[11px] text-muted-foreground max-w-[150px] truncate">
                      {l.notes || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SurfaceCard>

      {/* Reset */}
      <div className="mt-8 text-center">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 border rounded-md px-4 py-2.5 font-mono-ui text-[11px] uppercase tracking-wider transition-colors hover:bg-brand-red-dim"
          style={{ borderColor: "rgba(245,111,111,0.3)", color: "var(--brand-red)" }}
        >
          <Trash2 className="w-4 h-4" /> Reset All Data
        </button>
      </div>
    </PageContainer>
  )
}

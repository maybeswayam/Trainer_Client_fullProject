"use client"

import { useEffect, useState, useCallback } from "react"

export type WeightEntry = { date: string; val: number }
export type LiftEntry = { date: string; lift: string; weight: number; reps: number }
export type RunEntry = { date: string; dist: number; time?: string; surface?: string }
export type MeasurementEntry = {
  date: string
  waist?: number
  chest?: number
  hip?: number
  thigh?: number
  arm?: number
  neck?: number
}
export type DailyLog = {
  date: string
  steps?: number
  water?: number
  protein?: number
  notes?: string
  session?: string
  duration?: number
  intensity?: number
  checklist?: string[]
}

export type TrackerData = {
  weights: WeightEntry[]
  lifts: LiftEntry[]
  runs: RunEntry[]
  measurements: MeasurementEntry[]
  dailyLogs: DailyLog[]
  xp: number
}

const KEY = "samForge_v4"

export function defaultData(): TrackerData {
  return {
    weights: [],
    lifts: [],
    runs: [],
    measurements: [],
    dailyLogs: [],
    xp: 0,
  }
}

export function todayStr(): string {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

export function dateStr(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export function parseDate(s: string): Date {
  return new Date(s + "T00:00:00")
}

function readStorage(): TrackerData {
  if (typeof window === "undefined") return defaultData()
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultData()
    const parsed = JSON.parse(raw)
    return { ...defaultData(), ...parsed }
  } catch {
    return defaultData()
  }
}

async function writeStorage(data: TrackerData) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, JSON.stringify(data))
  // Notify other components
  window.dispatchEvent(new CustomEvent("tracker:update"))
  // Also sync to server
  try {
    await fetch("/api/tracker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  } catch (err) {
    console.error("Failed to sync tracker data to server", err)
  }
}

export function useTracker() {
  const [data, setData] = useState<TrackerData>(() => readStorage())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    let active = true

    const loadData = async () => {
      try {
        const res = await fetch("/api/tracker")
        if (res.ok) {
          const serverData = await res.json()
          if (active) {
            setData({ ...defaultData(), ...serverData })
            localStorage.setItem(KEY, JSON.stringify(serverData))
            setHydrated(true)
          }
          return
        }
      } catch (e) {
        console.warn("Could not fetch server data, falling back to local storage")
      }
      
      if (active) {
        setData(readStorage())
        setHydrated(true)
      }
    }

    loadData()

    const handler = () => setData(readStorage())
    window.addEventListener("tracker:update", handler)
    window.addEventListener("storage", handler)
    return () => {
      active = false
      window.removeEventListener("tracker:update", handler)
      window.removeEventListener("storage", handler)
    }
  }, [])

  const update = useCallback((updater: (prev: TrackerData) => TrackerData) => {
    setData((prev) => {
      const next = updater(prev)
      writeStorage(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    const fresh = defaultData()
    writeStorage(fresh)
    setData(fresh)
  }, [])

  return { data, update, reset, hydrated }
}

// Helper actions
export function logWeight(update: (fn: (p: TrackerData) => TrackerData) => void, val: number, date = todayStr()) {
  update((prev) => {
    const weights = prev.weights.filter((w) => w.date !== date)
    weights.push({ date, val })
    weights.sort((a, b) => a.date.localeCompare(b.date))
    return { ...prev, weights }
  })
}

export function upsertDailyLog(
  update: (fn: (p: TrackerData) => TrackerData) => void,
  patch: Partial<DailyLog>,
  date = todayStr()
) {
  update((prev) => {
    const logs = [...prev.dailyLogs]
    const idx = logs.findIndex((l) => l.date === date)
    if (idx >= 0) logs[idx] = { ...logs[idx], ...patch }
    else logs.push({ date, ...patch })
    logs.sort((a, b) => a.date.localeCompare(b.date))
    return { ...prev, dailyLogs: logs }
  })
}

export function addXP(update: (fn: (p: TrackerData) => TrackerData) => void, points: number) {
  update((prev) => ({ ...prev, xp: Math.max(0, (prev.xp || 0) + points) }))
}

export function addLift(
  update: (fn: (p: TrackerData) => TrackerData) => void,
  entry: Omit<LiftEntry, "date"> & { date?: string }
) {
  update((prev) => {
    const lifts = [...prev.lifts, { ...entry, date: entry.date ?? todayStr() }]
    lifts.sort((a, b) => a.date.localeCompare(b.date))
    return { ...prev, lifts }
  })
}

export function addRun(
  update: (fn: (p: TrackerData) => TrackerData) => void,
  entry: Omit<RunEntry, "date"> & { date?: string }
) {
  update((prev) => {
    const runs = [...prev.runs, { ...entry, date: entry.date ?? todayStr() }]
    runs.sort((a, b) => a.date.localeCompare(b.date))
    return { ...prev, runs }
  })
}

export function addMeasurement(
  update: (fn: (p: TrackerData) => TrackerData) => void,
  entry: Omit<MeasurementEntry, "date"> & { date?: string }
) {
  update((prev) => {
    const measurements = [...prev.measurements.filter((m) => m.date !== (entry.date ?? todayStr())), { ...entry, date: entry.date ?? todayStr() }]
    measurements.sort((a, b) => a.date.localeCompare(b.date))
    return { ...prev, measurements }
  })
}

export function deleteRun(update: (fn: (p: TrackerData) => TrackerData) => void, idx: number) {
  update((prev) => ({ ...prev, runs: prev.runs.filter((_, i) => i !== idx) }))
}

export function deleteLift(update: (fn: (p: TrackerData) => TrackerData) => void, idx: number) {
  update((prev) => ({ ...prev, lifts: prev.lifts.filter((_, i) => i !== idx) }))
}

// ═══════════════════════════════════════════
// TRACKER DATA LAYER — localStorage persistence
// Mirrors tracker_may4.html data model exactly
// ═══════════════════════════════════════════

import { START_DATE, END_DATE, TOTAL_DAYS } from "@/lib/data/phases"
export { START_DATE, END_DATE, TOTAL_DAYS }

// ── Types ──────────────────────────────────
export type WeightEntry = { date: string; val: number }
export type LiftEntry = { date: string; lift: string; weight: number; reps: number }
export type RunEntry = { date: string; dist: number; time: string; surface: string }
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
  streak: number
  bestStreak: number
  lastTrainDate: string | null
  xp: number
}

// ── Storage ────────────────────────────────
const KEY = "samForge_v3"

// Global var to prevent spamming fetch
let hasHydratedFromServer = false

function defaultData(): TrackerData {
  return {
    weights: [],
    lifts: [],
    runs: [],
    measurements: [],
    dailyLogs: [],
    streak: 0,
    bestStreak: 0,
    lastTrainDate: null,
    xp: 0,
  }
}

export function getData(): TrackerData {
  if (typeof window === "undefined") return defaultData()
  
  if (!hasHydratedFromServer) {
    hasHydratedFromServer = true
    fetch("/api/tracker", { cache: "no-store" })
      .then(res => res.ok ? res.json() : null)
      .then(serverData => {
        if (serverData) {
          localStorage.setItem(KEY, JSON.stringify(serverData))
          window.dispatchEvent(new Event("tracker-updated"))
        }
      })
      .catch(e => console.warn("Failed to sync from server:", e))
  }

  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as TrackerData) : defaultData()
  } catch {
    return defaultData()
  }
}

export function saveData(d: TrackerData): void {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, JSON.stringify(d))
  
  window.dispatchEvent(new Event("tracker-updated"))
  
  fetch("/api/tracker", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(d),
  }).catch(e => console.warn("Failed to save to server:", e))
}

export function resetData(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEY)
}

// ── Date Utilities ─────────────────────────
export function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

export function dateStr(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export function parseDate(s: string): Date {
  return new Date(s + "T00:00:00")
}

export function fmtDate(d: string | Date): string {
  const dt = typeof d === "string" ? parseDate(d) : d
  return dt.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

export function daysSinceStart(dateS: string): number {
  const d = parseDate(dateS)
  return Math.floor((d.getTime() - START_DATE.getTime()) / 86400000)
}

export function getDaysSinceStart(): number {
  const td = new Date()
  td.setHours(0, 0, 0, 0)
  return Math.max(0, Math.floor((td.getTime() - START_DATE.getTime()) / 86400000))
}

export function getCurrentWeek(): number {
  const diff = getDaysSinceStart()
  return Math.max(1, Math.min(17, Math.floor(diff / 7) + 1))
}

export function getCurrentPhaseIndex(): number {
  const wk = getCurrentWeek()
  if (wk <= 1) return 0
  if (wk <= 5) return 1
  if (wk <= 11) return 2
  if (wk <= 16) return 3
  return 4
}

export function getGlobalProgress(): number {
  const elapsed = getDaysSinceStart()
  return Math.min(100, Math.round((elapsed / TOTAL_DAYS) * 100))
}

// ── Constants ──────────────────────────────
export const LIFT_TARGETS: Record<
  string,
  { label: string; unit: string; start: number; targets: number[] }
> = {
  bench: { label: "Bench Press", unit: "kg", start: 60, targets: [72.5, 80, 87.5, 90, 90] },
  squat: { label: "Squat", unit: "kg", start: 0, targets: [55, 65, 85, 100, 110] },
  rdl: { label: "RDL", unit: "kg", start: 42.5, targets: [77.5, 97.5, 112.5, 117.5, 117.5] },
  ohp: { label: "OHP", unit: "kg", start: 35, targets: [42, 47, 55, 62, 65] },
  chinups: { label: "Chin-ups", unit: "reps", start: 2, targets: [5, 8, 10, 12, 12] },
  pushups: { label: "Push-ups", unit: "reps", start: 8, targets: [14, 22, 32, 40, 45] },
  row: { label: "Barbell Row", unit: "kg", start: 45, targets: [52, 60, 70, 77, 82] },
}

export const CHECKLIST_ITEMS = [
  { id: "gym", label: "Gym session done", pts: 30 },
  { id: "protein", label: "170g protein hit", pts: 20 },
  { id: "steps", label: "15,000 steps hit", pts: 20 },
  { id: "water", label: "3.5L water intake", pts: 10 },
  { id: "sleep", label: "8h sleep last night", pts: 15 },
  { id: "noSkip", label: "No junk / mess skip respected", pts: 5 },
] as const

export const QUOTES = [
  ["The body achieves what the mind believes.", "Trainer's wisdom"],
  ["You don't get what you wish for. You get what you work for.", "Air Force mentality"],
  ["It never gets easier. You just get stronger.", "The truth"],
  ["Discipline is doing it when you don't feel like it.", "Day 1 principle"],
  ["The pain you feel today is the strength you feel tomorrow.", "Every leg day"],
  ["Champions aren't born. They're built in moments like this.", "Right now"],
  ["You are 112kg of potential. By August, potential becomes proof.", "Your story"],
  ["Soyabean at 5:30pm. Whey before bed. Never skip. Never wonder.", "Trainer's rule #1"],
  ["10km on the grass field. 25 laps. It's already inside you.", "Week 17 calling"],
  ["Rajma day at the mess = free protein. Eat every last spoon.", "Nutrition hack"],
  ["The scale will lie. The tape measure never does.", "Week 5 reminder"],
  ["Week 11 deload isn't weakness. It's how champions avoid injury.", "Phase 3 law"],
] as const

export const PHASE_COLORS = [
  { name: "Re-Entry", color: "#b8f5a0", weeks: 1 },
  { name: "Build", color: "#7ec8f5", weeks: 4 },
  { name: "Load", color: "#f5c842", weeks: 6 },
  { name: "Peak", color: "#f56f6f", weeks: 5 },
  { name: "Forge", color: "#c8a8f5", weeks: 1 },
]

export const SESSION_TYPES = [
  "Push Day",
  "Pull Day",
  "Leg Day",
  "Full Body A",
  "Full Body B",
  "Upper A - Push",
  "Upper B - Pull",
  "Lower A - Squat",
  "Lower B - Hinge",
  "Run / Cardio",
  "Basketball",
  "Football",
  "Rest Day",
]

// ── Streak Calculation ─────────────────────
export function calcStreak(data: TrackerData): { streak: number; best: number } {
  const trainDates = new Set(
    data.dailyLogs
      .filter((l) => l.session && l.session !== "Rest Day")
      .map((l) => l.date)
  )

  let best = data.bestStreak || 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate best streak ever
  let tempStreak = 0
  const tmp = new Date(START_DATE)
  while (tmp <= today) {
    const ds = dateStr(tmp)
    if (trainDates.has(ds)) {
      tempStreak++
      best = Math.max(best, tempStreak)
    } else {
      tempStreak = 0
    }
    tmp.setDate(tmp.getDate() + 1)
  }

  // Current streak (from today backwards)
  let streak = 0
  const check = new Date(today)
  const todayDs = dateStr(today)
  while (check >= START_DATE) {
    const ds = dateStr(check)
    if (trainDates.has(ds)) {
      streak++
    } else if (ds !== todayDs) {
      break
    }
    check.setDate(check.getDate() - 1)
  }

  return { streak, best: Math.max(best, streak) }
}

// ── Lift Helpers ───────────────────────────
export function getBestLift(data: TrackerData, liftKey: string): number | null {
  const entries = data.lifts.filter((l) => l.lift === liftKey)
  if (!entries.length) return null
  return Math.max(...entries.map((l) => l.weight))
}

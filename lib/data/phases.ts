export type PhaseColor = "green" | "blue" | "amber" | "red" | "purple"

export type Phase = {
  num: 1 | 2 | 3 | 4 | 5
  name: string
  shortName: string
  color: PhaseColor
  hex: string
  weeks: number[]
  weeksLabel: string
  dateRange: string
  desc: string
  tagline: string
}

export const PHASES: Phase[] = [
  {
    num: 1,
    name: "Re-Entry",
    shortName: "RE-ENTRY",
    color: "green",
    hex: "#b8f5a0",
    weeks: [1],
    weeksLabel: "Wk 1",
    dateRange: "May 4–10",
    desc: "Win the week. Not the workout. Full body 3×. Build the habit loop.",
    tagline: "Win the Week. Lock the Identity.",
  },
  {
    num: 2,
    name: "Build",
    shortName: "BUILD",
    color: "blue",
    hex: "#7ec8f5",
    weeks: [2, 3, 4, 5],
    weeksLabel: "Wk 2–5",
    dateRange: "May 11 – Jun 7",
    desc: "Upper/Lower 4×. First real benchmarks. Running 3→5km. Leave this phase stronger than ever.",
    tagline: "Upper/Lower — Benchmarks Hit",
  },
  {
    num: 3,
    name: "Load",
    shortName: "LOAD",
    color: "amber",
    hex: "#f5c842",
    weeks: [6, 7, 8, 9, 10, 11],
    weeksLabel: "Wk 6–11",
    dateRange: "Jun 8 – Jul 19",
    desc: "PPL 5×/week. 400m intervals from Wk 7. Week 11 = mandatory deload.",
    tagline: "PPL — Physique Change Visible",
  },
  {
    num: 4,
    name: "Peak",
    shortName: "PEAK",
    color: "red",
    hex: "#f56f6f",
    weeks: [12, 13, 14, 15, 16],
    weeksLabel: "Wk 12–16",
    dateRange: "Jul 20 – Aug 23",
    desc: "Heavy compounds. 3–5 reps. PR testing Wk 15. The athlete body gets built here.",
    tagline: "Strength PRs — Push Limits",
  },
  {
    num: 5,
    name: "Forge",
    shortName: "FORGE",
    color: "purple",
    hex: "#c8a8f5",
    weeks: [17],
    weeksLabel: "Wk 17",
    dateRange: "Aug 24–31",
    desc: "Consolidate. Confirm all PRs. 10km run. Final benchmarks Aug 31.",
    tagline: "Consolidate — The New Baseline",
  },
]

export function getPhaseForWeek(wk: number): Phase {
  return PHASES.find((p) => p.weeks.includes(wk)) ?? PHASES[0]
}

export const START_DATE = new Date(2026, 4, 4) // May 4, 2026
export const END_DATE = new Date(2026, 7, 31) // Aug 31, 2026
export const TOTAL_WEEKS = 17
export const TOTAL_DAYS = Math.round((END_DATE.getTime() - START_DATE.getTime()) / 86400000) + 1

export function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

export function fmtShort(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

export function fmtFull(d: Date): string {
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
}

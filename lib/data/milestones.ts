import type { PhaseColor } from "./phases"

export type Milestone = {
  phase: number
  color: PhaseColor
  hex: string
  dateRange: string
  weekRange: string
  shortName: string
  title: string
  metrics: { label: string; value: string }[]
}

export const MILESTONES: Milestone[] = [
  {
    phase: 1,
    color: "green",
    hex: "#b8f5a0",
    dateRange: "May 4–10",
    weekRange: "Wk 1",
    shortName: "RE-ENTRY",
    title: "Win the Week. Lock the Identity.",
    metrics: [
      { label: "Weight", value: "~111–112 kg" },
      { label: "Running", value: "3km continuous" },
      { label: "Bench", value: "60kg × 8 (clean)" },
      { label: "Chin-ups", value: "3–4 reps" },
      { label: "Push-ups", value: "10–12 reps" },
      { label: "Feel", value: "Back in the room" },
    ],
  },
  {
    phase: 2,
    color: "blue",
    hex: "#7ec8f5",
    dateRange: "May 11 – Jun 7",
    weekRange: "Wk 2–5",
    shortName: "BUILD",
    title: "Upper/Lower — Benchmarks Hit",
    metrics: [
      { label: "Weight", value: "107–110 kg" },
      { label: "Running", value: "5km sub-33 min" },
      { label: "Bench", value: "72.5kg × 6" },
      { label: "Chin-ups", value: "5–6 reps" },
      { label: "Squat", value: "62.5kg × 8" },
      { label: "Feel", value: "Clothes noticeably looser" },
    ],
  },
  {
    phase: 3,
    color: "amber",
    hex: "#f5c842",
    dateRange: "Jun 8 – Jul 19",
    weekRange: "Wk 6–11",
    shortName: "LOAD",
    title: "PPL — Physique Change Visible",
    metrics: [
      { label: "Weight", value: "103–107 kg" },
      { label: "Running", value: "7km + 400m intervals" },
      { label: "Bench", value: "82.5kg × 5" },
      { label: "Chin-ups", value: "9–10 reps" },
      { label: "RDL", value: "100kg × 6" },
      { label: "Feel", value: "Visibly leaner, athletic" },
    ],
  },
  {
    phase: 4,
    color: "red",
    hex: "#f56f6f",
    dateRange: "Jul 20 – Aug 23",
    weekRange: "Wk 12–16",
    shortName: "PEAK",
    title: "Strength PRs — Push Limits",
    metrics: [
      { label: "Weight", value: "101–105 kg" },
      { label: "Running", value: "10km attempt" },
      { label: "Bench", value: "87.5–90kg × 5" },
      { label: "Chin-ups", value: "11–12 reps" },
      { label: "Squat", value: "105kg × 5" },
      { label: "Feel", value: "Unrecognisable since May" },
    ],
  },
  {
    phase: 5,
    color: "purple",
    hex: "#c8a8f5",
    dateRange: "Aug 24–31",
    weekRange: "Wk 17",
    shortName: "FORGE",
    title: "Consolidate — The New Baseline",
    metrics: [
      { label: "Weight", value: "100–103 kg" },
      { label: "Running", value: "10km confirmed" },
      { label: "Bench", value: "90kg × 5" },
      { label: "Chin-ups", value: "12+ reps" },
      { label: "Squat", value: "110kg × 5" },
      { label: "Feel", value: "Athlete. Foundation set." },
    ],
  },
]

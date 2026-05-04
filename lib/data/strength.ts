export type LiftKey = "bench" | "squat" | "rdl" | "ohp" | "chinups" | "pushups" | "row"

export type LiftDef = {
  key: LiftKey
  label: string
  unit: "kg" | "reps"
  start: number
  targets: number[] // [wk5, wk11, wk15, wk17, final]
  color: string
}

export const LIFT_TARGETS: Record<LiftKey, LiftDef> = {
  bench: {
    key: "bench",
    label: "Bench Press",
    unit: "kg",
    start: 60,
    targets: [72.5, 80, 87.5, 90, 90],
    color: "var(--brand-blue)",
  },
  squat: {
    key: "squat",
    label: "Barbell Squat",
    unit: "kg",
    start: 0,
    targets: [55, 65, 85, 100, 110],
    color: "var(--brand-green)",
  },
  rdl: {
    key: "rdl",
    label: "Romanian DL",
    unit: "kg",
    start: 42.5,
    targets: [77.5, 97.5, 112.5, 117.5, 117.5],
    color: "var(--brand-amber)",
  },
  ohp: {
    key: "ohp",
    label: "Overhead Press",
    unit: "kg",
    start: 35,
    targets: [42, 47, 55, 62, 67.5],
    color: "var(--brand-orange)",
  },
  chinups: {
    key: "chinups",
    label: "Chin-ups (BW)",
    unit: "reps",
    start: 2,
    targets: [5, 8, 10, 12, 12],
    color: "var(--brand-purple)",
  },
  pushups: {
    key: "pushups",
    label: "Push-ups",
    unit: "reps",
    start: 8,
    targets: [14, 22, 32, 40, 45],
    color: "var(--brand-red)",
  },
  row: {
    key: "row",
    label: "Barbell Row",
    unit: "kg",
    start: 45,
    targets: [52, 60, 70, 77, 82],
    color: "var(--brand-teal)",
  },
}

export const LIFT_PROGRESSION_TABLE = [
  {
    lift: "Bench press",
    start: "60kg×6",
    wk5: "72.5kg×6",
    wk11: "82.5kg×5",
    wk15: "87.5kg×5",
    end: "90kg×5",
    pct: 75,
    color: "var(--brand-blue)",
  },
  {
    lift: "Barbell squat",
    start: "BW only",
    wk5: "62.5kg×8",
    wk11: "90kg×5",
    wk15: "105kg×5",
    end: "110kg×5",
    pct: 88,
    color: "var(--brand-green)",
  },
  {
    lift: "Romanian DL",
    start: "42.5kg×10",
    wk5: "82.5kg×8",
    wk11: "100kg×6",
    wk15: "112.5kg×5",
    end: "117.5kg×5",
    pct: 82,
    color: "var(--brand-amber)",
  },
  {
    lift: "Chin-ups (BW)",
    start: "2 reps",
    wk5: "5–6 reps",
    wk11: "9–10 reps",
    wk15: "11 reps",
    end: "12+ reps",
    pct: 80,
    color: "var(--brand-purple)",
  },
  {
    lift: "Overhead press",
    start: "37.5kg×8",
    wk5: "47.5kg×6",
    wk11: "57.5kg×5",
    wk15: "65kg×5",
    end: "67.5kg×5",
    pct: 70,
    color: "var(--brand-orange)",
  },
  {
    lift: "Push-ups",
    start: "8 reps",
    wk5: "20 reps",
    wk11: "32 reps",
    wk15: "40 reps",
    end: "45+ reps",
    pct: 92,
    color: "var(--brand-red)",
  },
]

export const OVERLOAD_PROTOCOL = [
  {
    phase: "Wk 1 (Re-Entry)",
    type: "info",
    text: "3 sets × 10–12 reps at 60–65% max. Form is the only KPI. Leave 3 reps in tank. Win the identity, not the workout.",
  },
  {
    phase: "Wk 2–5 (Build)",
    type: "info",
    text: "Double progression. 4 sets × 6–10 reps. Add weight only when you hit the TOP of rep range with clean form in 2 consecutive sessions — not 1, two.",
  },
  {
    phase: "Wk 6–10 (Load)",
    type: "info",
    text: "RPE 7–8 on main lifts. Progressive overload every week. 400m intervals run alongside PPL from week 7.",
  },
  {
    phase: "Wk 11 (Deload — Mandatory)",
    type: "deload",
    text: "55% load, same reps. This is when tendons catch up to muscles. Skip deload = injury in week 12. Not negotiable.",
  },
  {
    phase: "Wk 12–16 (Peak)",
    type: "info",
    text: "Main compounds at 3–5 rep strength range, 82–90% intensity. PR testing week 15. Accessory work stays at 10–12 reps moderate load.",
  },
  {
    phase: "Wk 17 (Forge)",
    type: "tip",
    text: "Consolidation. Confirm all PRs. Test 10km run Aug 30. Final benchmark photo + measurements Aug 31.",
  },
]

import type { DayType } from "./weekly-plan"

export type Workout = {
  name: string
  schedule: string
  type: DayType
  detail?: string
  exs: [string, string][]
}

export type WorkoutPhase = {
  phase: number
  title: string
  weekRange: string
  hex: string
  coachNote: string
  workouts: Workout[]
}

export const WORKOUT_LIBRARY: WorkoutPhase[] = [
  {
    phase: 1,
    title: "Re-Entry — Full Body 3×/week",
    weekRange: "Wk 1",
    hex: "#b8f5a0",
    coachNote:
      "One week only. The goal isn't fitness — it's re-establishing the identity of someone who shows up every day. Win the week, not the workout. Controlled loads. Leave 3 reps in tank on everything.",
    workouts: [
      {
        name: "Full Body A",
        schedule: "Mon / Fri · Wk 1",
        type: "full",
        detail: "Identity day. Show up. Every rep with full control. Leave reps in the tank.",
        exs: [
          ["Goblet squat", "3×12 @ 16kg KB"],
          ["Bench press", "3×8 @ 57.5kg"],
          ["Seated cable row", "3×10 @ 40kg"],
          ["DB shoulder press", "3×10 @ 14kg"],
          ["Romanian deadlift", "3×10 @ 42.5kg"],
          ["Plank hold", "3×25s"],
        ],
      },
      {
        name: "Full Body B",
        schedule: "Wed · Wk 1",
        type: "full",
        detail: "Hip hinge on RDL — feel the hamstrings load. Core braced. Slow eccentric.",
        exs: [
          ["Leg press", "3×12 @ 85kg"],
          ["Incline DB press", "3×10 @ 16kg"],
          ["Lat pulldown", "3×10 @ 47.5kg"],
          ["Lateral raises", "3×12 @ 8kg"],
          ["Leg curl", "3×12"],
          ["Dead bug", "3×8 each side"],
        ],
      },
    ],
  },
  {
    phase: 2,
    title: "Build — Upper / Lower 4×/week",
    weekRange: "Wk 2–5",
    hex: "#7ec8f5",
    coachNote:
      "First real benchmarks. Running from 3km building to 5km. You leave this phase genuinely stronger than you've ever been. Double progression — only add weight when you hit the TOP of rep range in 2 consecutive sessions.",
    workouts: [
      {
        name: "Upper A — Push",
        schedule: "Mon · Wk 2–5",
        type: "strength",
        exs: [
          ["Bench press", "4×6–8 @ 65–72.5kg"],
          ["OHP (barbell)", "3×8 @ 40–47.5kg"],
          ["Incline DB press", "3×10 @ 18–22kg"],
          ["Cable fly (low)", "3×12–15"],
          ["Tricep pushdown", "3×12"],
          ["Lateral raises", "3×15 @ 8–10kg"],
        ],
      },
      {
        name: "Upper B — Pull",
        schedule: "Fri · Wk 2–5",
        type: "strength",
        exs: [
          ["Chin-ups (BW / assisted)", "4×max reps — LOG IT"],
          ["Barbell row", "4×8 @ 52.5–62.5kg"],
          ["Seated cable row", "3×10 @ 52–60kg"],
          ["Face pulls", "3×15–20"],
          ["Hammer curl", "3×10 each"],
          ["Rear delt fly", "3×12"],
        ],
      },
      {
        name: "Lower A — Squat",
        schedule: "Wed · Wk 2–5",
        type: "strength",
        exs: [
          ["Barbell back squat", "4×8 @ 52.5–67.5kg"],
          ["Walking lunges", "3×10 each leg"],
          ["Leg press", "3×12 @ 100–120kg"],
          ["Leg curl", "3×12"],
          ["Calf raises", "4×15"],
          ["Ab wheel / plank", "3×max / 40s"],
        ],
      },
      {
        name: "Lower B — Hinge",
        schedule: "Thu · Wk 2–5",
        type: "strength",
        exs: [
          ["Romanian deadlift", "4×8 @ 67.5–82.5kg"],
          ["Sumo deadlift", "3×6 @ 65–80kg"],
          ["Hip thrust (BB)", "3×12 @ 52–72kg"],
          ["Step-ups (bench)", "3×10 each"],
          ["Seated calf raise", "3×15"],
          ["Hanging knee raise", "3×10–12"],
        ],
      },
    ],
  },
  {
    phase: 3,
    title: "Load — Push / Pull / Legs 5×/week",
    weekRange: "Wk 6–11",
    hex: "#f5c842",
    coachNote:
      "This is the engine of the transformation — 6 weeks of progressive overload where the physique change becomes visible to others. 400m intervals introduced Wk 7. Week 11 is a mandatory deload — non-negotiable.",
    workouts: [
      {
        name: "Push Day",
        schedule: "Mon · Wk 6–11",
        type: "strength",
        exs: [
          ["Bench press", "4×5–6 @ 75–90kg"],
          ["OHP (barbell)", "4×6 @ 50–65kg"],
          ["Incline DB press", "3×10 @ 24–30kg"],
          ["Cable fly (low)", "3×12–15"],
          ["Skull crushers", "3×10 @ 22–30kg"],
          ["Tricep dip / pushdown", "3×12–15"],
          ["Lateral raises", "4×15 @ 10–14kg"],
        ],
      },
      {
        name: "Pull Day",
        schedule: "Wed · Wk 6–11",
        type: "strength",
        exs: [
          ["Weighted chin-ups", "4×max (add 5kg when ≥8)"],
          ["Pendlay row", "4×5–6 @ 65–82.5kg"],
          ["Seated cable row", "3×10 @ 62–75kg"],
          ["Face pulls", "3×20"],
          ["Barbell curl", "3×10 @ 32–42kg"],
          ["Hammer curl", "3×10 each"],
          ["Rear delt fly", "3×15"],
        ],
      },
      {
        name: "Leg Day",
        schedule: "Fri · Wk 6–11",
        type: "strength",
        exs: [
          ["Barbell squat", "4×5 @ 80–112.5kg"],
          ["Romanian deadlift", "4×6 @ 92.5–115kg"],
          ["Leg press (high foot)", "3×12 @ 120–150kg"],
          ["Bulgarian split squat", "3×8 each @ 10–20kg"],
          ["Leg curl", "3×12"],
          ["Standing calf raise", "4×20"],
          ["Hanging leg raise", "3×12–15"],
        ],
      },
    ],
  },
  {
    phase: 4,
    title: "Peak — Heavy Strength 5×/week",
    weekRange: "Wk 12–16",
    hex: "#f56f6f",
    coachNote:
      "3–5 rep territory. Heavy compounds. This is where the athlete body gets built. PR testing Week 15. Week 11 deload already done — you go into this phase fresh and hungry.",
    workouts: [
      {
        name: "Push — Peak",
        schedule: "Mon · Wk 12–16",
        type: "strength",
        exs: [
          ["Bench press", "4×4–5 @ 82.5–90kg"],
          ["OHP (barbell)", "4×5 @ 57.5–67.5kg"],
          ["Incline DB press", "3×8 @ 28–32kg"],
          ["Cable fly", "3×15"],
          ["Skull crushers", "3×8"],
          ["Lateral raises", "4×15 @ 12kg"],
        ],
      },
      {
        name: "Pull — Peak",
        schedule: "Wed · Wk 12–16",
        type: "strength",
        exs: [
          ["Weighted chin-ups", "4×max (weighted)"],
          ["Pendlay row", "4×5 @ 75–87.5kg"],
          ["Seated cable row", "3×8 @ 70–80kg"],
          ["Face pulls", "3×20"],
          ["DB curl", "3×10 @ 18–22kg"],
          ["Hammer curl", "3×12 each"],
        ],
      },
      {
        name: "Legs — Peak",
        schedule: "Fri · Wk 12–16",
        type: "strength",
        exs: [
          ["Barbell squat", "4×5 @ 95–110kg"],
          ["Romanian deadlift", "4×5 @ 107.5–117.5kg"],
          ["Leg press", "3×10 @ 130–155kg"],
          ["Bulgarian split squat", "3×6 each @ 18–22kg"],
          ["Leg curl", "3×10"],
          ["Calf raise", "4×20"],
        ],
      },
    ],
  },
  {
    phase: 5,
    title: "Forge — Consolidate & Confirm",
    weekRange: "Wk 17",
    hex: "#c8a8f5",
    coachNote:
      "Final week. Confirm every PR. Test 10km Aug 25. Photos + measurements Aug 30. This week is about proof — what you built is now baseline.",
    workouts: [
      {
        name: "Push — Confirm PRs",
        schedule: "Mon · Wk 17",
        type: "strength",
        exs: [
          ["Bench press", "4×5 @ 90kg (confirm)"],
          ["OHP", "4×5 @ 67.5kg"],
          ["Incline DB press", "3×10 @ 30kg"],
          ["Cable fly", "3×15"],
          ["Tricep work", "3×12"],
          ["Lateral raises", "4×15"],
        ],
      },
      {
        name: "Pull — Confirm PRs",
        schedule: "Wed · Wk 17",
        type: "strength",
        exs: [
          ["Chin-ups", "4×max (confirm 12+)"],
          ["Pendlay row", "4×5 @ 80kg"],
          ["Seated row", "3×8 @ 75kg"],
          ["Face pulls", "3×20"],
          ["Curl variation", "3×10"],
        ],
      },
      {
        name: "Legs — Confirm PRs",
        schedule: "Fri · Wk 17",
        type: "strength",
        exs: [
          ["Barbell squat", "4×5 @ 110kg (confirm)"],
          ["Romanian deadlift", "4×5 @ 117.5kg (confirm)"],
          ["Leg press", "3×10 @ 150kg"],
          ["Bulgarian split squat", "3×6 each @ 22kg"],
          ["Calf raise", "4×20"],
        ],
      },
    ],
  },
]

export type DayType = "full" | "strength" | "cardio" | "sport" | "rest" | "active" | "deload"

export type DayPlan = {
  type: DayType
  session: string
  detail: string
  exs: [string, string][]
}

export const TYPE_LABEL: Record<DayType, string> = {
  full: "Full Body",
  strength: "Strength",
  cardio: "Cardio",
  sport: "Sport",
  rest: "Rest",
  active: "Active",
  deload: "Deload",
}

export const TYPE_SHORT: Record<DayType, string> = {
  full: "FULL",
  strength: "STR",
  cardio: "RUN",
  sport: "SPORT",
  rest: "REST",
  active: "WALK",
  deload: "DELOAD",
}

export const TYPE_COLOR: Record<DayType, string> = {
  full: "var(--brand-orange)",
  strength: "var(--brand-blue)",
  cardio: "var(--brand-green)",
  sport: "var(--brand-purple)",
  rest: "var(--faint)",
  active: "var(--brand-amber)",
  deload: "var(--brand-teal)",
}

export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function getWeekDays(wk: number): DayPlan[] {
  // Phase 1: Re-Entry (Wk 1)
  if (wk === 1) {
    return [
      {
        type: "full",
        session: "Full Body A — Re-Entry",
        detail:
          "Identity day. Show up. Every rep with full control. Leave 3 reps in tank. This session is about the habit, not the weight.",
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
        type: "cardio",
        session: "Jog/walk intervals — 2.5km",
        detail: "Grass field. Run 200m, walk 200m. Conversational pace. Time the whole thing. Baseline.",
        exs: [],
      },
      {
        type: "full",
        session: "Full Body B",
        detail: "Hip hinge on RDL — feel the hamstrings load. Core braced. Every exercise done deliberately.",
        exs: [
          ["Leg press", "3×12 @ 85kg"],
          ["Incline DB press", "3×10 @ 16kg"],
          ["Lat pulldown", "3×10 @ 47.5kg"],
          ["Lateral raises", "3×12 @ 8kg"],
          ["Leg curl", "3×12"],
          ["Dead bug", "3×8 each"],
        ],
      },
      {
        type: "sport",
        session: "Basketball 30–40 min",
        detail: "Casual play only. Zone 2 effort. Not competitive yet. Just move.",
        exs: [],
      },
      {
        type: "full",
        session: "Full Body A (repeat)",
        detail:
          "Add 2.5kg upper / 5kg lower ONLY if all Monday reps were completely clean. Otherwise hold exact same weight.",
        exs: [
          ["Goblet squat", "3×12 @ 18kg"],
          ["Bench press", "3×8 @ 60kg"],
          ["Seated cable row", "3×10 @ 42kg"],
          ["DB shoulder press", "3×10 @ 14kg"],
          ["Romanian deadlift", "3×10 @ 45kg"],
          ["Plank hold", "3×30s"],
        ],
      },
      {
        type: "active",
        session: "Walk + foam roll",
        detail: "10k step walk. Foam roll: hip flexors + calves + thoracic spine. 15 min. No skipping.",
        exs: [],
      },
      {
        type: "rest",
        session: "Full rest",
        detail:
          "Walk 8k steps. Eat your protein. Sleep 8 hours. Reflect on winning this week — you showed up 5 days. That's the foundation.",
        exs: [],
      },
    ]
  }

  // Phase 2: Build (Wk 2–5)
  if (wk <= 5) {
    const wkOff = wk - 2
    const benchLoad = [65, 67.5, 70, 72.5][wkOff]
    const rdlLoad = [67.5, 72.5, 77.5, 82.5][wkOff]
    const squatLoad = [52.5, 57.5, 62.5, 67.5][wkOff]
    const runDist = ["3km", "3.5km", "4.5km — sub-29 target", "5km — beat your time"][wkOff]
    return [
      {
        type: "strength",
        session: "Upper A — Push",
        detail: `Bench ${benchLoad}kg. Rest 2 min on main lifts. Add weight only when you hit top of range 2 sessions in a row.`,
        exs: [
          ["Bench press", `4×6–8 @ ${benchLoad}kg`],
          ["OHP (barbell)", `3×8 @ ${40 + wkOff * 2.5}kg`],
          ["Incline DB press", `3×10 @ ${18 + wkOff}kg`],
          ["Cable fly (low)", "3×12–15"],
          ["Tricep pushdown", "3×12"],
          ["Lateral raises", "3×15 @ 8–10kg"],
        ],
      },
      {
        type: "cardio",
        session: `Run — ${runDist}`,
        detail: "Continuous. Breathe through nose where possible. Time every run — this is data.",
        exs: [],
      },
      {
        type: "strength",
        session: "Lower A — Squat",
        detail: `Barbell squat at ${squatLoad}kg. 3s down, 1s up. Feel the depth. Core is a brace, not an afterthought.`,
        exs: [
          ["Barbell squat", `4×8 @ ${squatLoad}kg`],
          ["Walking lunges", "3×10 each"],
          ["Leg press", `3×12 @ ${102.5 + wkOff * 5}kg`],
          ["Leg curl", "3×12"],
          ["Calf raises", "4×15"],
          ["Ab wheel / plank", "3×max/40s"],
        ],
      },
      {
        type: "strength",
        session: "Lower B — Hinge",
        detail: `RDL at ${rdlLoad}kg. Feel every hamstring rep. Lock the back. Hinge, not squat.`,
        exs: [
          ["Romanian deadlift", `4×8 @ ${rdlLoad}kg`],
          ["Sumo deadlift", `3×6 @ ${rdlLoad - 5}kg`],
          ["Hip thrust (BB)", "3×12 @ 52–70kg"],
          ["Step-ups", "3×10 each"],
          ["Seated calf raise", "3×15"],
          ["Hanging knee raise", "3×10–12"],
        ],
      },
      {
        type: "strength",
        session: "Upper B — Pull",
        detail: "Chin-ups FIRST — max reps before anything else. Log the number. It will go up.",
        exs: [
          ["Chin-ups (max reps)", "4×max — LOG IT"],
          ["Barbell row", `4×8 @ ${52.5 + wkOff * 2.5}kg`],
          ["Seated cable row", `3×10 @ ${52 + wkOff * 2}kg`],
          ["Face pulls", "3×15–20"],
          ["Hammer curl", "3×10 each"],
          ["Rear delt fly", "3×12"],
        ],
      },
      {
        type: "sport",
        session: "Football 5-a-side / Basketball",
        detail: "60 min real game effort. This is your cardio session. Play hard.",
        exs: [],
      },
      {
        type: "rest",
        session: "Full rest",
        detail: "Walk 8–10k steps. Foam roll. Eat protein. You're building something here.",
        exs: [],
      },
    ]
  }

  // Phase 3: Load (Wk 6–11) — Wk 11 = Deload
  if (wk <= 11) {
    const isDeload = wk === 11
    const wkOff = wk - 6
    const benchLoad = isDeload ? 47.5 : [75, 77.5, 80, 82.5, 82.5, 50][wkOff]
    const squatLoad = isDeload ? 50 : [80, 82.5, 87.5, 90, 92.5, 55][wkOff]
    const rdlLoad = isDeload ? 55 : [92.5, 95, 97.5, 100, 102.5, 57.5][wkOff]
    const runType = isDeload
      ? "Easy 4km recovery jog"
      : wk % 2 === 0
        ? `${5 + Math.floor(wkOff / 2) + 1}km steady run`
        : `${6 + wkOff}×400m intervals`

    return [
      {
        type: isDeload ? "deload" : "strength",
        session: isDeload ? "Push Day — DELOAD" : "Push Day",
        detail: isDeload
          ? `DELOAD WEEK. ${benchLoad}kg bench — 55% of working weight. Form check, nothing more.`
          : `Bench ${benchLoad}kg. RPE 7–8. Leave one rep in the tank.`,
        exs: [
          ["Bench press", `4×${isDeload ? "6" : "5–6"} @ ${benchLoad}kg`],
          ["OHP (barbell)", `4×6 @ ${isDeload ? 32 : 50 + wkOff * 2.5}kg`],
          ["Incline DB press", `3×10 @ ${isDeload ? 16 : 24 + wkOff}kg`],
          ["Cable fly", "3×12–15"],
          ["Skull crushers", `3×10 @ ${isDeload ? 16 : 22 + wkOff * 2}kg`],
          ["Tricep pushdown", "3×12"],
          ["Lateral raises", "4×15 @ 10–12kg"],
        ],
      },
      {
        type: "cardio",
        session: runType,
        detail: isDeload
          ? "Easy pace only. No pushing. This is recovery, not performance."
          : "Track your time. You are getting faster. Trust it.",
        exs: [],
      },
      {
        type: isDeload ? "deload" : "strength",
        session: isDeload ? "Pull Day — DELOAD" : "Pull Day",
        detail: isDeload
          ? "Light weights. Mind-muscle. Not to failure on anything."
          : "Chin-ups first. Add weight if ≥8 BW reps — +5kg belt.",
        exs: [
          ["Chin-ups", `${isDeload ? "2×5 BW — not to failure" : "4×max reps"}`],
          ["Pendlay row", `4×${isDeload ? "6 easy" : "5–6"} @ ${isDeload ? 45 : 62.5 + wkOff * 2.5}kg`],
          ["Seated row", `3×10 @ ${isDeload ? 40 : 62 + wkOff * 2}kg`],
          ["Face pulls", "3×20"],
          ["Barbell curl", `3×10 @ ${isDeload ? 22 : 32 + wkOff}kg`],
          ["Hammer curl", "3×10 each"],
        ],
      },
      {
        type: "sport",
        session: "Basketball / Football",
        detail: isDeload
          ? "Easy 30 min only during deload week. Light movement."
          : "Full intensity. You should notice how much better your cardio is.",
        exs: [],
      },
      {
        type: isDeload ? "deload" : "strength",
        session: isDeload ? "Leg Day — DELOAD" : "Leg Day",
        detail: isDeload
          ? `DELOAD. Squat ${squatLoad}kg. Perfect form only.`
          : `Squat ${squatLoad}kg. RDL ${rdlLoad}kg. This is the engine.`,
        exs: [
          ["Barbell squat", `4×5 @ ${squatLoad}kg`],
          ["Romanian deadlift", `4×6 @ ${rdlLoad}kg`],
          ["Leg press", `3×12 @ ${isDeload ? 82.5 : 122.5 + wkOff * 5}kg`],
          ["Bulgarian split squat", `3×8 each @ ${isDeload ? 0 : 10 + wkOff * 2}kg`],
          ["Leg curl", "3×12"],
          ["Calf raise", "4×20"],
          ["Hanging leg raise", "3×12–15"],
        ],
      },
      {
        type: "active",
        session: isDeload ? "Walk + measurements" : "Long walk / Easy run",
        detail: isDeload
          ? "Take month measurements + progress photo during deload week."
          : "Easy effort. Keep steps up. Let the body move.",
        exs: [],
      },
      {
        type: "rest",
        session: "Full rest",
        detail: isDeload
          ? "Full rest. Tendons are catching up. This week is doing more work than any heavy session."
          : "Sleep 8+ hours. You've earned it.",
        exs: [],
      },
    ]
  }

  // Phase 4: Peak (Wk 12–16)
  if (wk <= 16) {
    const isPR = wk === 15
    const wkOff = wk - 12
    const benchLoad = [82.5, 85, 87.5, 90, 87.5][wkOff]
    const squatLoad = [95, 97.5, 102.5, 107.5, 105][wkOff]
    const rdlLoad = [107.5, 110, 112.5, 115, 112.5][wkOff]
    const runType = isPR ? "10km ATTEMPT — the only goal is to finish" : `${8 + wkOff}km tempo run`

    return [
      {
        type: "strength",
        session: isPR ? "Push Day — BENCH PR TEST" : "Push — Peak Strength",
        detail: isPR
          ? "Warm up perfectly. Test 90kg × 5. This is what you built for."
          : `Bench ${benchLoad}kg. 3–5 rep strength range. No ego — full range of motion.`,
        exs: [
          ["Bench press", `4×4–5 @ ${benchLoad}kg${isPR ? " (PR TEST)" : ""}`],
          ["OHP", `4×5 @ ${57.5 + wkOff * 2.5}kg`],
          ["Incline DB press", "3×8 @ 28–32kg"],
          ["Cable fly", "3×15"],
          ["Skull crushers", "3×8"],
          ["Lateral raises", "4×15 @ 12kg"],
        ],
      },
      {
        type: "cardio",
        session: runType,
        detail: isPR
          ? "25 laps on the grass field. Run at conversation pace. The distance is the victory."
          : "Sub-50 min for 8km. You have the fitness. Run through it.",
        exs: [],
      },
      {
        type: "strength",
        session: isPR ? "Pull Day — CHIN-UP PR TEST" : "Pull — Peak Strength",
        detail: isPR
          ? "Max chin-up test first set. Target: 12 reps. Everything else works around it."
          : "Weighted chins if ≥10 BW reps. Add 5–7.5kg. Build the back.",
        exs: [
          ["Chin-ups", `${isPR ? "1×MAX TEST then 3×working" : "4×max (weighted if ≥10 BW)"}`],
          ["Pendlay row", `4×5 @ ${75 + wkOff * 2.5}kg`],
          ["Seated row", `3×8 @ ${70 + wkOff * 2}kg`],
          ["Face pulls", "3×20"],
          ["DB curl", "3×10 @ 18–22kg"],
          ["Hammer curl", "3×12 each"],
        ],
      },
      {
        type: "sport",
        session: "Football / Basketball",
        detail: "Full game. Notice how different your body feels vs May. This is real.",
        exs: [],
      },
      {
        type: "strength",
        session: isPR ? "Leg Day — SQUAT PR TEST" : "Legs — Peak Strength",
        detail: isPR
          ? `Squat ${squatLoad}kg × 5. RDL ${rdlLoad}kg × 5. These are your PRs.`
          : `Squat ${squatLoad}kg. You belong here.`,
        exs: [
          ["Barbell squat", `4×5 @ ${squatLoad}kg${isPR ? " (PR TEST)" : ""}`],
          ["Romanian deadlift", `4×5 @ ${rdlLoad}kg${isPR ? " (PR TEST)" : ""}`],
          ["Leg press", `3×10 @ ${130 + wkOff * 5}kg`],
          ["Bulgarian split squat", "3×6 each @ 20kg"],
          ["Leg curl", "3×10"],
          ["Calf raise", "4×20"],
        ],
      },
      {
        type: "active",
        session: isPR ? "Walk + full measurements" : "Long walk / Active rest",
        detail: isPR
          ? "Record ALL PRs. Progress photos. Compare to May 4. You are not the same person."
          : "Easy movement. Recover for next week.",
        exs: [],
      },
      {
        type: "rest",
        session: "Full rest",
        detail: "This phase is demanding. Rest is training. Sleep 8 hours minimum.",
        exs: [],
      },
    ]
  }

  // Phase 5: Forge (Wk 17)
  return [
    {
      type: "strength",
      session: "Push Day — Confirm PRs",
      detail: "Final push session. Confirm 90kg bench. The new baseline.",
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
      type: "cardio",
      session: "Final 10km run",
      detail: "Aug 25. 25 laps on the grass field. Start slow, finish strong. This is your proof.",
      exs: [],
    },
    {
      type: "strength",
      session: "Pull Day — Confirm PRs",
      detail: "Confirm 12+ chin-up target. Heavy rows. The back you've built.",
      exs: [
        ["Chin-ups", "4×max (confirm 12+)"],
        ["Pendlay row", "4×5 @ 80kg"],
        ["Seated row", "3×8 @ 75kg"],
        ["Face pulls", "3×20"],
        ["Curl variation", "3×10"],
      ],
    },
    {
      type: "sport",
      session: "Football / Basketball",
      detail: "Play the best game of your life. Compare to May. This is the finish line.",
      exs: [],
    },
    {
      type: "strength",
      session: "Leg Day — Confirm PRs",
      detail: "Final leg session. Confirm squat 110kg, RDL 117.5kg. This is who you are now.",
      exs: [
        ["Barbell squat", "4×5 @ 110kg (confirm)"],
        ["Romanian deadlift", "4×5 @ 117.5kg (confirm)"],
        ["Leg press", "3×10 @ 150kg"],
        ["Bulgarian split squat", "3×6 each @ 22kg"],
        ["Calf raise", "4×20"],
      ],
    },
    {
      type: "active",
      session: "FINAL MEASUREMENTS + PHOTOS",
      detail: "Aug 30. Measure everything. Compare to May 4. Write down what happened to you in 17 weeks.",
      exs: [],
    },
    {
      type: "rest",
      session: "Aug 31 — The New Baseline",
      detail:
        "Rest. Reflect. You're 100–103kg, running 10km, benching 90kg. Plan the next chapter. This is just the foundation.",
      exs: [],
    },
  ]
}

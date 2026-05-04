export type RuleType = "tip" | "warn" | "info" | "deload"

export type Rule = {
  type: RuleType
  title: string
  text: string
}

export type RuleSection = {
  heading: string
  rules: Rule[]
}

export const RULES: RuleSection[] = [
  {
    heading: "The non-negotiables",
    rules: [
      {
        type: "tip",
        title: "Morning whey + milk + 2 eggs — every single day.",
        text: "Regardless of what mess serves. This alone covers 56g of your protein before 9am.",
      },
      {
        type: "tip",
        title: "Soyabean every evening.",
        text: "Boil 100g, add salt + chaat masala + lemon. 36g protein, dirt cheap. This is your biggest nutritional leverage point.",
      },
      {
        type: "tip",
        title: "Log every gym session.",
        text: "Weight, sets, reps. Without this there's no progressive overload — you're just moving iron around.",
      },
      {
        type: "tip",
        title: "Sleep 8 hours minimum.",
        text: "Growth hormone peaks in deep sleep. Half your muscle recovery happens at night. Compromising sleep compromises results — directly.",
      },
      {
        type: "deload",
        title: "Week 11 deload is mandatory.",
        text: "55% loads, same reps. Your tendons are not muscles — they adapt slower. The deload is when they catch up. Skip it = injury in week 12.",
      },
    ],
  },
  {
    heading: "Phase-specific coaching notes",
    rules: [
      {
        type: "info",
        title: "Week 1 only goal: Show up every day.",
        text: "That's the entire brief. The fastest way to build momentum after a break is to stack tiny wins — not one heroic session. Win Mon, Tue, Wed, Thu, Fri. That's Phase 1.",
      },
      {
        type: "info",
        title: "Weeks 2–5 (Build) — early wins.",
        text: "The physique won't change visibly yet. The scale might not budge much. The benchmark that matters: your 5km time and your bench number. Track those. They will move.",
      },
      {
        type: "info",
        title: "Weeks 6–10 (Load) — compound effect.",
        text: "This is where most people quit because results plateau visibly on the scale but are accumulating under the surface. Trust the process, watch the lifts, watch the run times. The scale follows.",
      },
      {
        type: "info",
        title: "Weeks 12–16 (Peak) — identity shift.",
        text: "At this point you're not training for the plan — you're an athlete who trains. The shift in identity is the real prize. The strength numbers just confirm it.",
      },
    ],
  },
  {
    heading: "Pitfalls — flag these early",
    rules: [
      {
        type: "warn",
        title: "Ego loading in week 1.",
        text: "The body feels capable. The tendons are not ready. Adding too much too soon is the single most common reason transformations end at week 3. Control loads. Leave reps in tank.",
      },
      {
        type: "warn",
        title: "Skipping leg day because it's uncomfortable.",
        text: "At 112kg, legs are brutal. Do them anyway. Lower body muscle mass is your primary fat-burning engine.",
      },
      {
        type: "warn",
        title: "Scale obsession in month 2.",
        text: "Weight fluctuates 1.5–3kg daily based on water and glycogen. Weigh once a week, same morning, and use the monthly average. The tape measure never lies.",
      },
      {
        type: "warn",
        title: "Stacking sport sessions on training days.",
        text: "Basketball and football REPLACE cardio — they don't add on top of a full session at a caloric deficit.",
      },
      {
        type: "warn",
        title: "Shin splints from running too fast too soon.",
        text: "Week 1: grass field only. Never consecutive run days. Any shin pain → zero-impact cardio immediately for 5–7 days. Ice shins 15 min post-run as prevention.",
      },
    ],
  },
  {
    heading: "Recovery",
    rules: [
      {
        type: "info",
        title: "Foam roll 10 min post-gym, 3× per week.",
        text: "Priority: hip flexors, thoracic spine, calves, hamstrings. Tight hip flexors at your height will kill squat depth and running efficiency.",
      },
      {
        type: "info",
        title: "3.5L water daily minimum.",
        text: "4L on run or sport days. In Agra's summer heat you're sweating heavily — dehydration crashes performance faster than anything.",
      },
      {
        type: "info",
        title: "Progress photos on May 4, Jun 4, Jul 4, Aug 4, Aug 31.",
        text: "Take waist + chest + thigh tape measurements on the same days. This is your evidence. Don't skip these.",
      },
    ],
  },
]

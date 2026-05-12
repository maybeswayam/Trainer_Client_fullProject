// Demo client data for investor presentation
// Each client has pre-populated workout logs, measurements, and progress data

export interface ClientStats {
  id: string
  name: string
  initial: string
  avatar?: string
  email: string
  phone?: string
  joinDate: string
  phase: string
  week: number
  streak: number
  lastLog: string
  currentWeight: number
  startWeight: number
  targetWeight: number
  trend: "up" | "down" | "flat"
  compliance: number // percentage
  workoutsThisWeek: number
  totalWorkouts: number
  benchPR: number
  squatPR: number
  deadliftPR: number
  cardioMinutes: number
  avgProtein: number
  avgSteps: number
  notes?: string
  tags: string[]
}

export interface ClientProgress {
  clientId: string
  weights: { date: string; value: number }[]
  workouts: { date: string; type: string; duration: number; intensity: number }[]
  measurements: {
    date: string
    waist?: number
    chest?: number
    hip?: number
    thigh?: number
    arm?: number
  }[]
  nutrition: { date: string; protein: number; calories: number; water: number }[]
  cardio: { date: string; distance: number; time: string; type: string }[]
  lifts: { date: string; exercise: string; weight: number; reps: number; sets: number }[]
}

// Krishna's assigned clients with comprehensive demo data
export const DEMO_CLIENTS: Record<string, ClientStats> = {
  sam: {
    id: "sam",
    name: "Sam",
    initial: "S",
    email: "sam@email.com",
    phone: "+91 98765 43210",
    joinDate: "2026-05-04",
    phase: "Build",
    week: 3,
    streak: 8,
    lastLog: "2026-05-12",
    currentWeight: 109.5,
    startWeight: 112,
    targetWeight: 100,
    trend: "down",
    compliance: 92,
    workoutsThisWeek: 4,
    totalWorkouts: 18,
    benchPR: 67.5,
    squatPR: 62.5,
    deadliftPR: 85,
    cardioMinutes: 145,
    avgProtein: 168,
    avgSteps: 14200,
    notes: "Excellent progress! Focus on squat form next session.",
    tags: ["dedicated", "morning-lifter", "weight-loss"],
  },
  jessica: {
    id: "jessica",
    name: "Jessica Thompson",
    initial: "J",
    email: "jessica.t@email.com",
    phone: "+91 98765 43211",
    joinDate: "2026-04-28",
    phase: "Build",
    week: 4,
    streak: 12,
    lastLog: "2026-05-11",
    currentWeight: 68.4,
    startWeight: 72,
    targetWeight: 65,
    trend: "down",
    compliance: 96,
    workoutsThisWeek: 5,
    totalWorkouts: 24,
    benchPR: 42.5,
    squatPR: 55,
    deadliftPR: 65,
    cardioMinutes: 220,
    avgProtein: 125,
    avgSteps: 16500,
    notes: "Star performer. Ready for load phase soon.",
    tags: ["consistent", "cardio-lover", "morning-lifter"],
  },
  marcus: {
    id: "marcus",
    name: "Marcus Peterson",
    initial: "M",
    email: "marcus.p@email.com",
    phone: "+91 98765 43212",
    joinDate: "2026-03-15",
    phase: "Load",
    week: 8,
    streak: 3,
    lastLog: "2026-05-12",
    currentWeight: 89.2,
    startWeight: 95,
    targetWeight: 88,
    trend: "flat",
    compliance: 78,
    workoutsThisWeek: 3,
    totalWorkouts: 42,
    benchPR: 85,
    squatPR: 110,
    deadliftPR: 130,
    cardioMinutes: 90,
    avgProtein: 185,
    avgSteps: 11000,
    notes: "Needs to focus more on cardio. Strength gains excellent.",
    tags: ["strength-focused", "evening-lifter"],
  },
  elena: {
    id: "elena",
    name: "Elena Rodriguez",
    initial: "E",
    email: "elena.r@email.com",
    phone: "+91 98765 43213",
    joinDate: "2026-05-10",
    phase: "Re-Entry",
    week: 1,
    streak: 0,
    lastLog: "2026-04-28",
    currentWeight: 71,
    startWeight: 71,
    targetWeight: 66,
    trend: "up",
    compliance: 45,
    workoutsThisWeek: 1,
    totalWorkouts: 3,
    benchPR: 30,
    squatPR: 40,
    deadliftPR: 50,
    cardioMinutes: 30,
    avgProtein: 95,
    avgSteps: 6500,
    notes: "Just restarted after 2-week break. Need to rebuild momentum.",
    tags: ["returning", "needs-attention"],
  },
  david: {
    id: "david",
    name: "David Kim",
    initial: "D",
    email: "david.k@email.com",
    phone: "+91 98765 43214",
    joinDate: "2026-01-20",
    phase: "Peak",
    week: 14,
    streak: 41,
    lastLog: "2026-05-12",
    currentWeight: 84.5,
    startWeight: 92,
    targetWeight: 82,
    trend: "down",
    compliance: 98,
    workoutsThisWeek: 5,
    totalWorkouts: 78,
    benchPR: 95,
    squatPR: 135,
    deadliftPR: 160,
    cardioMinutes: 200,
    avgProtein: 175,
    avgSteps: 17200,
    notes: "Championship level! Perfect adherence. Almost at goal.",
    tags: ["elite", "dedicated", "morning-lifter", "competition-ready"],
  },
}

// Detailed progress history for each client
export const CLIENT_PROGRESS: Record<string, ClientProgress> = {
  sam: {
    clientId: "sam",
    weights: [
      { date: "2026-05-04", value: 112 },
      { date: "2026-05-05", value: 111.8 },
      { date: "2026-05-06", value: 111.5 },
      { date: "2026-05-07", value: 111.2 },
      { date: "2026-05-08", value: 110.8 },
      { date: "2026-05-09", value: 110.5 },
      { date: "2026-05-10", value: 110.2 },
      { date: "2026-05-11", value: 109.8 },
      { date: "2026-05-12", value: 109.5 },
    ],
    workouts: [
      { date: "2026-05-04", type: "Full Body A", duration: 65, intensity: 7 },
      { date: "2026-05-05", type: "Run / Cardio", duration: 35, intensity: 6 },
      { date: "2026-05-06", type: "Full Body B", duration: 70, intensity: 8 },
      { date: "2026-05-08", type: "Push Day", duration: 55, intensity: 7 },
      { date: "2026-05-09", type: "Pull Day", duration: 60, intensity: 8 },
      { date: "2026-05-10", type: "Leg Day", duration: 75, intensity: 9 },
      { date: "2026-05-11", type: "Basketball", duration: 90, intensity: 7 },
      { date: "2026-05-12", type: "Upper A - Push", duration: 60, intensity: 8 },
    ],
    measurements: [
      { date: "2026-05-04", waist: 102, chest: 112, hip: 108, thigh: 64, arm: 38 },
      { date: "2026-05-11", waist: 100, chest: 112, hip: 107, thigh: 63, arm: 38.5 },
    ],
    nutrition: [
      { date: "2026-05-10", protein: 172, calories: 2200, water: 3.5 },
      { date: "2026-05-11", protein: 165, calories: 2150, water: 3.2 },
      { date: "2026-05-12", protein: 168, calories: 2180, water: 3.6 },
    ],
    cardio: [
      { date: "2026-05-05", distance: 3.2, time: "32:15", type: "Outdoor Run" },
      { date: "2026-05-08", distance: 2.5, time: "26:40", type: "Treadmill" },
      { date: "2026-05-11", distance: 4.0, time: "N/A", type: "Basketball" },
    ],
    lifts: [
      { date: "2026-05-04", exercise: "Bench Press", weight: 62.5, reps: 8, sets: 3 },
      { date: "2026-05-06", exercise: "Squat", weight: 55, reps: 8, sets: 3 },
      { date: "2026-05-06", exercise: "RDL", weight: 75, reps: 8, sets: 3 },
      { date: "2026-05-08", exercise: "Bench Press", weight: 65, reps: 6, sets: 4 },
      { date: "2026-05-08", exercise: "OHP", weight: 40, reps: 8, sets: 3 },
      { date: "2026-05-10", exercise: "Squat", weight: 60, reps: 6, sets: 4 },
      { date: "2026-05-10", exercise: "RDL", weight: 80, reps: 6, sets: 3 },
      { date: "2026-05-12", exercise: "Bench Press", weight: 67.5, reps: 5, sets: 4 },
    ],
  },
  jessica: {
    clientId: "jessica",
    weights: [
      { date: "2026-04-28", value: 72 },
      { date: "2026-05-01", value: 71.2 },
      { date: "2026-05-04", value: 70.5 },
      { date: "2026-05-07", value: 69.8 },
      { date: "2026-05-10", value: 69.0 },
      { date: "2026-05-11", value: 68.4 },
    ],
    workouts: [
      { date: "2026-05-07", type: "Full Body A", duration: 55, intensity: 7 },
      { date: "2026-05-08", type: "Run / Cardio", duration: 45, intensity: 8 },
      { date: "2026-05-09", type: "Full Body B", duration: 60, intensity: 8 },
      { date: "2026-05-10", type: "Run / Cardio", duration: 40, intensity: 7 },
      { date: "2026-05-11", type: "Full Body A", duration: 55, intensity: 8 },
    ],
    measurements: [
      { date: "2026-04-28", waist: 78, chest: 92, hip: 98, thigh: 58, arm: 28 },
      { date: "2026-05-11", waist: 75, chest: 91, hip: 96, thigh: 57, arm: 28.5 },
    ],
    nutrition: [
      { date: "2026-05-10", protein: 128, calories: 1650, water: 3.0 },
      { date: "2026-05-11", protein: 125, calories: 1600, water: 3.2 },
    ],
    cardio: [
      { date: "2026-05-08", distance: 5.5, time: "52:30", type: "Outdoor Run" },
      { date: "2026-05-10", distance: 4.8, time: "46:15", type: "Outdoor Run" },
    ],
    lifts: [
      { date: "2026-05-07", exercise: "Squat", weight: 50, reps: 10, sets: 3 },
      { date: "2026-05-09", exercise: "Deadlift", weight: 60, reps: 8, sets: 3 },
      { date: "2026-05-11", exercise: "Bench Press", weight: 42.5, reps: 8, sets: 3 },
    ],
  },
  marcus: {
    clientId: "marcus",
    weights: [
      { date: "2026-03-15", value: 95 },
      { date: "2026-04-01", value: 93 },
      { date: "2026-04-15", value: 91 },
      { date: "2026-05-01", value: 89.8 },
      { date: "2026-05-12", value: 89.2 },
    ],
    workouts: [
      { date: "2026-05-10", type: "Push Day", duration: 80, intensity: 9 },
      { date: "2026-05-11", type: "Pull Day", duration: 75, intensity: 9 },
      { date: "2026-05-12", type: "Leg Day", duration: 85, intensity: 10 },
    ],
    measurements: [
      { date: "2026-03-15", waist: 96, chest: 115, hip: 104, thigh: 68, arm: 42 },
      { date: "2026-05-10", waist: 92, chest: 116, hip: 102, thigh: 69, arm: 43 },
    ],
    nutrition: [
      { date: "2026-05-12", protein: 195, calories: 2800, water: 4.0 },
    ],
    cardio: [
      { date: "2026-05-09", distance: 3.0, time: "35:00", type: "Treadmill" },
    ],
    lifts: [
      { date: "2026-05-10", exercise: "Bench Press", weight: 85, reps: 5, sets: 5 },
      { date: "2026-05-11", exercise: "Barbell Row", weight: 75, reps: 8, sets: 4 },
      { date: "2026-05-12", exercise: "Squat", weight: 110, reps: 5, sets: 5 },
      { date: "2026-05-12", exercise: "RDL", weight: 110, reps: 6, sets: 4 },
    ],
  },
  elena: {
    clientId: "elena",
    weights: [
      { date: "2026-04-15", value: 69 },
      { date: "2026-04-28", value: 71 },
    ],
    workouts: [
      { date: "2026-05-10", type: "Full Body A", duration: 45, intensity: 5 },
    ],
    measurements: [
      { date: "2026-05-10", waist: 74, chest: 88, hip: 96, thigh: 55, arm: 27 },
    ],
    nutrition: [],
    cardio: [],
    lifts: [
      { date: "2026-05-10", exercise: "Squat", weight: 35, reps: 10, sets: 3 },
    ],
  },
  david: {
    clientId: "david",
    weights: [
      { date: "2026-01-20", value: 92 },
      { date: "2026-02-15", value: 90 },
      { date: "2026-03-15", value: 88 },
      { date: "2026-04-15", value: 86 },
      { date: "2026-05-01", value: 85 },
      { date: "2026-05-12", value: 84.5 },
    ],
    workouts: [
      { date: "2026-05-08", type: "Upper A - Push", duration: 70, intensity: 9 },
      { date: "2026-05-09", type: "Lower A - Squat", duration: 75, intensity: 10 },
      { date: "2026-05-10", type: "Upper B - Pull", duration: 70, intensity: 9 },
      { date: "2026-05-11", type: "Lower B - Hinge", duration: 75, intensity: 10 },
      { date: "2026-05-12", type: "Full Body A", duration: 80, intensity: 9 },
    ],
    measurements: [
      { date: "2026-01-20", waist: 90, chest: 108, hip: 100, thigh: 62, arm: 38 },
      { date: "2026-05-10", waist: 82, chest: 110, hip: 98, thigh: 64, arm: 40 },
    ],
    nutrition: [
      { date: "2026-05-10", protein: 180, calories: 2400, water: 4.2 },
      { date: "2026-05-11", protein: 175, calories: 2350, water: 4.0 },
      { date: "2026-05-12", protein: 178, calories: 2380, water: 4.1 },
    ],
    cardio: [
      { date: "2026-05-08", distance: 6.0, time: "54:30", type: "Outdoor Run" },
      { date: "2026-05-10", distance: 5.5, time: "50:15", type: "Outdoor Run" },
    ],
    lifts: [
      { date: "2026-05-08", exercise: "Bench Press", weight: 92.5, reps: 4, sets: 5 },
      { date: "2026-05-09", exercise: "Squat", weight: 130, reps: 4, sets: 5 },
      { date: "2026-05-10", exercise: "Barbell Row", weight: 80, reps: 6, sets: 4 },
      { date: "2026-05-11", exercise: "RDL", weight: 140, reps: 5, sets: 4 },
      { date: "2026-05-12", exercise: "Bench Press", weight: 95, reps: 3, sets: 5 },
    ],
  },
}

// Summary stats for trainer dashboard
export function getTrainerStats(trainerId: string): {
  totalClients: number
  activeThisWeek: number
  avgCompliance: number
  clientsOnTrack: number
  clientsNeedingAttention: number
} {
  const clients = Object.values(DEMO_CLIENTS).filter(c => {
    // In production this would check trainerId
    return true
  })
  
  const activeThisWeek = clients.filter(c => c.workoutsThisWeek >= 3).length
  const avgCompliance = Math.round(clients.reduce((sum, c) => sum + c.compliance, 0) / clients.length)
  const clientsOnTrack = clients.filter(c => c.compliance >= 80).length
  const clientsNeedingAttention = clients.filter(c => c.compliance < 70 || c.streak === 0).length
  
  return {
    totalClients: clients.length,
    activeThisWeek,
    avgCompliance,
    clientsOnTrack,
    clientsNeedingAttention,
  }
}

// Get phase color
export function getPhaseColor(phase: string): string {
  const colors: Record<string, string> = {
    "Re-Entry": "var(--brand-green)",
    "Build": "var(--brand-blue)",
    "Load": "var(--brand-amber)",
    "Peak": "var(--brand-red)",
    "Forge": "var(--brand-purple)",
  }
  return colors[phase] || "var(--brand-green)"
}

// Get trend icon color
export function getTrendColor(trend: "up" | "down" | "flat"): string {
  if (trend === "down") return "text-brand-green"
  if (trend === "up") return "text-brand-red"
  return "text-muted-foreground"
}

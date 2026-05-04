import {
  CalendarDays,
  Dumbbell,
  Activity,
  Heart,
  Salad,
  Target,
  Scroll,
  LayoutGrid,
  PenLine,
  Scale,
  HeartPulse,
  Ruler,
  Apple,
  History,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  index: string
  label: string
  href: string
  icon: LucideIcon
  description: string
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export const PLAN_NAV: NavItem[] = [
  {
    index: "01",
    label: "Weekly Calendar",
    href: "/plan/weekly-calendar",
    icon: CalendarDays,
    description: "17-week schedule, day by day.",
  },
  {
    index: "02",
    label: "Workout Library",
    href: "/plan/workout-library",
    icon: Dumbbell,
    description: "Every session, every phase.",
  },
  {
    index: "03",
    label: "Strength Plan",
    href: "/plan/strength",
    icon: Activity,
    description: "Big-lift progression curve.",
  },
  {
    index: "04",
    label: "Cardio Plan",
    href: "/plan/cardio",
    icon: Heart,
    description: "C25K → 10km build.",
  },
  {
    index: "05",
    label: "Nutrition Guide",
    href: "/plan/nutrition",
    icon: Salad,
    description: "Mess + own food protocol.",
  },
  {
    index: "06",
    label: "Milestones",
    href: "/plan/milestones",
    icon: Target,
    description: "Five checkpoints to August.",
  },
  {
    index: "07",
    label: "Trainer's Rules",
    href: "/plan/trainers-rules",
    icon: Scroll,
    description: "Non-negotiables.",
  },
]

export const TRACKER_NAV: NavItem[] = [
  {
    index: "01",
    label: "Dashboard",
    href: "/tracker/dashboard",
    icon: LayoutGrid,
    description: "Today at a glance.",
  },
  {
    index: "02",
    label: "Log Today",
    href: "/tracker/log-today",
    icon: PenLine,
    description: "Capture every metric.",
  },
  {
    index: "03",
    label: "Weight",
    href: "/tracker/weight",
    icon: Scale,
    description: "Daily + weekly trend.",
  },
  {
    index: "04",
    label: "Strength",
    href: "/tracker/strength",
    icon: Dumbbell,
    description: "Lift progression.",
  },
  {
    index: "05",
    label: "Cardio",
    href: "/tracker/cardio",
    icon: HeartPulse,
    description: "Run distance & pace.",
  },
  {
    index: "06",
    label: "Measurements",
    href: "/tracker/measurements",
    icon: Ruler,
    description: "Waist, chest, arms.",
  },
  {
    index: "07",
    label: "Nutrition",
    href: "/tracker/nutrition",
    icon: Apple,
    description: "Protein & steps.",
  },
  {
    index: "08",
    label: "History",
    href: "/tracker/history",
    icon: History,
    description: "Full training log.",
  },
]

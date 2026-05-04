export type Verdict = "eat" | "skip" | "small" | "own"

export const VERDICT_META: Record<Verdict, { label: string; color: string; bg: string }> = {
  eat: { label: "Eat (modified)", color: "var(--brand-green)", bg: "var(--brand-green-dim)" },
  skip: { label: "Skip entirely", color: "var(--brand-red)", bg: "var(--brand-red-dim)" },
  small: { label: "Eat small", color: "var(--brand-amber)", bg: "var(--brand-amber-dim)" },
  own: { label: "Skip — eat own", color: "var(--brand-red)", bg: "var(--brand-red-dim)" },
}

export type MessMeal = [string, Verdict]

export type MessDay = {
  day: string
  dow: number // 0 = Mon
  breakfast: MessMeal
  lunch: MessMeal
  snacks: MessMeal
  dinner: MessMeal
}

export const MESS_MENU: MessDay[] = [
  {
    day: "Mon",
    dow: 0,
    breakfast: ["Bread Butter Jam Tea", "own"],
    lunch: ["Chole Boondi Raita Roti Rice Salad", "eat"],
    snacks: ["Namkeen Thandai", "small"],
    dinner: ["Mix Veg Masoor Dal Roti Rice Salad Milk", "eat"],
  },
  {
    day: "Tue",
    dow: 1,
    breakfast: ["Idli Sambhar Coconut Chutney Tea Cornflakes Milk", "eat"],
    lunch: ["Aloo Gobhi Chana Dal Roti Rice Salad", "eat"],
    snacks: ["Namkeen Jawa Sauce Tea", "skip"],
    dinner: ["Puri Aloo Tamatar Sabji Fried Chilli Rice Kheer Achar", "own"],
  },
  {
    day: "Wed",
    dow: 2,
    breakfast: ["Paw Bhaji Tea", "small"],
    lunch: ["Aloo Jeera Kadhi Pakora Roti Rice Salad", "eat"],
    snacks: ["Pasta Sauce Tea", "skip"],
    dinner: ["Aloo Gazar Mutter Rajma Masala Roti Rice Salad Custard", "eat"],
  },
  {
    day: "Thu",
    dow: 3,
    breakfast: ["Kulche Matar Tea", "small"],
    lunch: ["Aloo Soyabeen Arhar Dal Roti Rice Salad", "eat"],
    snacks: ["Rusk Tea", "skip"],
    dinner: ["Mater Paneer Dal Makhani Roti Rice Salad Sweet", "eat"],
  },
  {
    day: "Fri",
    dow: 4,
    breakfast: ["Tea Samosa With Chutney", "own"],
    lunch: ["Rajma Curd Roti Rice Salad", "eat"],
    snacks: ["Veg & Dry Poha Sauce Tea", "small"],
    dinner: ["Aloo Patta Gobhi Roti Rice Chana Dal Salad Milk", "eat"],
  },
  {
    day: "Sat",
    dow: 5,
    breakfast: ["Aloo Sabji Dhai Jalebi Aloo Kachori Tea", "own"],
    lunch: ["Kadhi Lal Mirch Achar Roti Rice Salad", "small"],
    snacks: ["Sandwich Sauce Tea", "skip"],
    dinner: ["Chole Roti Rice Salad", "eat"],
  },
  {
    day: "Sun",
    dow: 6,
    breakfast: ["Paneer Paratha Chatni Achar Sauce Tea", "eat"],
    lunch: ["Meggi Sauce Coffee", "own"],
    snacks: ["Shahi Paneer Arhar Dal Rice Roti Salad Sweet", "eat"],
    dinner: ["(Same as snacks / Shahi Paneer)", "eat"],
  },
]

export const MACROS = [
  { label: "Target kcal", value: "2,350", sub: "~600 deficit from TDEE", color: "var(--brand-green)" },
  { label: "Protein", value: "170g", sub: "non-negotiable daily", color: "var(--brand-blue)" },
  { label: "Carbs", value: "255g", sub: "front-load pre-training", color: "var(--brand-amber)" },
  { label: "Fats", value: "70g", sub: "don't cut — hormones need it", color: "var(--brand-orange)" },
  { label: "Expected loss", value: "9–12kg", sub: "over 17 weeks", color: "var(--brand-red)" },
  { label: "Water", value: "3.5L", sub: "4L on cardio days", color: "var(--brand-teal)" },
]

export const PROTEIN_SOURCES = [
  { source: "Whey (1 scoop)", protein: "26g", when: "Morning + post-workout or pre-bed", tier: "primary" },
  { source: "High protein milk (250ml)", protein: "18g", when: "Mix with morning whey or pre-bed", tier: "primary" },
  { source: "Soyabean (100g cooked)", protein: "36g", when: "Evening — your biggest protein weapon", tier: "primary" },
  { source: "Eggs ×2 (summers limit)", protein: "12g", when: "Morning — max 2/day in summers", tier: "primary" },
  { source: "Paneer (100g, occasional)", protein: "18g", when: "Replace soyabean when available", tier: "secondary" },
  { source: "Mess dal/rajma/chole", protein: "8–15g", when: "Lunch + dinner at mess", tier: "secondary" },
]

export const PROTEIN_BLUEPRINT = [
  {
    window: "Morning · 7–8 AM",
    eat: "1 scoop whey + 250ml HP milk + 2 boiled eggs",
    protein: "~56g",
    note: "Do this regardless of mess breakfast",
  },
  {
    window: "Mess lunch · 12–1 PM",
    eat: "Dal/rajma/chole + 2 roti + salad",
    protein: "~15–20g",
    note: "Skip rice always. Eat the legume fully.",
  },
  {
    window: "Evening · 5–6 PM",
    eat: "100g soyabean boiled (salt+chaat masala)",
    protein: "~36g",
    note: "Your most important own-meal. Never skip.",
  },
  {
    window: "Mess dinner · 7:30–8 PM",
    eat: "Dal/paneer + 2 roti + salad",
    protein: "~15–18g",
    note: "Skip rice. Eat legume/paneer fully.",
  },
  {
    window: "Pre-bed · 10 PM",
    eat: "1 scoop whey OR 250ml HP milk",
    protein: "~18–26g",
    note: "Slow absorption through the night",
  },
]

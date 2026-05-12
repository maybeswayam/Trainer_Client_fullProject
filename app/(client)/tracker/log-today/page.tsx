"use client"

import { useEffect, useState, useCallback } from "react"
import { PageContainer, SectionLabel } from "@/components/shared/ui-kit/section"
import { SurfaceCard } from "@/components/shared/ui-kit/cards"
import { FieldLabel, Input, Select, Textarea, PrimaryButton, GhostButton } from "@/components/shared/ui-kit/form-fields"
import {
  getData,
  saveData,
  todayStr,
  fmtDate,
  calcStreak,
  CHECKLIST_ITEMS,
  SESSION_TYPES,
  LIFT_TARGETS,
  type TrackerData,
} from "@/lib/tracker-store"
import { toast } from "sonner"
import { Check, Save, Dumbbell, Zap } from "lucide-react"

export default function LogTodayPage() {
  const [data, setData] = useState<TrackerData | null>(null)
  const [weight, setWeight] = useState("")
  const [steps, setSteps] = useState("")
  const [water, setWater] = useState("")
  const [protein, setProtein] = useState("")
  const [notes, setNotes] = useState("")
  const [sessionType, setSessionType] = useState("")
  const [duration, setDuration] = useState("")
  const [intensity, setIntensity] = useState("")
  const [liftName, setLiftName] = useState("bench")
  const [liftWeight, setLiftWeight] = useState("")
  const [liftReps, setLiftReps] = useState("")

  const reload = useCallback(() => setData(getData()), [])
  useEffect(() => { 
    reload()
    const handleUpdate = () => reload()
    window.addEventListener("tracker-updated", handleUpdate)
    return () => window.removeEventListener("tracker-updated", handleUpdate)
  }, [reload])

  if (!data) return null

  const today = todayStr()
  const todayLog = data.dailyLogs.find((l) => l.date === today)
  const checkedItems = todayLog?.checklist || []
  const doneCount = checkedItems.length
  const donePts = CHECKLIST_ITEMS.filter((item) => checkedItems.includes(item.id)).reduce((a, c) => a + c.pts, 0)

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const todayDate = new Date()
  const todayLabel = `${dayNames[todayDate.getDay()]}, ${fmtDate(todayDate)}`

  function toggleCheck(itemId: string) {
    const d = getData()
    let log = d.dailyLogs.find((l) => l.date === today)
    if (!log) { log = { date: today, checklist: [] }; d.dailyLogs.push(log) }
    if (!log.checklist) log.checklist = []

    const item = CHECKLIST_ITEMS.find((i) => i.id === itemId)!
    if (log.checklist.includes(itemId)) {
      log.checklist = log.checklist.filter((i) => i !== itemId)
      d.xp = Math.max(0, (d.xp || 0) - item.pts)
    } else {
      log.checklist.push(itemId)
      d.xp = (d.xp || 0) + item.pts
    }
    saveData(d)
    reload()
  }

  function handleLogWeight() {
    const v = parseFloat(weight)
    if (!v || v < 80 || v > 130) { toast.error("Enter a valid weight (80–130 kg)"); return }
    const d = getData()
    d.weights = d.weights.filter((w) => w.date !== today)
    d.weights.push({ date: today, val: v })
    d.weights.sort((a, b) => a.date.localeCompare(b.date))
    saveData(d)
    setWeight("")
    toast.success(`Weight logged: ${v} kg`)
    reload()
  }

  function handleLogSteps() {
    const v = parseInt(steps)
    if (!v || v < 0) { toast.error("Enter valid steps"); return }
    const d = getData()
    let log = d.dailyLogs.find((l) => l.date === today)
    if (!log) { log = { date: today }; d.dailyLogs.push(log) }
    log.steps = v
    saveData(d)
    setSteps("")
    toast.success(`Steps logged: ${v.toLocaleString()}`)
    reload()
  }

  function handleLogWater() {
    const v = parseFloat(water)
    if (!v || v < 0) { toast.error("Enter valid water intake"); return }
    const d = getData()
    let log = d.dailyLogs.find((l) => l.date === today)
    if (!log) { log = { date: today }; d.dailyLogs.push(log) }
    log.water = v
    saveData(d)
    setWater("")
    toast.success(`Water logged: ${v}L`)
    reload()
  }

  function handleLogProtein() {
    const v = parseInt(protein)
    if (!v || v < 0) { toast.error("Enter valid protein"); return }
    const d = getData()
    let log = d.dailyLogs.find((l) => l.date === today)
    if (!log) { log = { date: today }; d.dailyLogs.push(log) }
    log.protein = v
    saveData(d)
    setProtein("")
    toast.success(`Protein logged: ${v}g`)
    reload()
  }

  function handleSaveFullLog() {
    const d = getData()
    let log = d.dailyLogs.find((l) => l.date === today)
    if (!log) { log = { date: today }; d.dailyLogs.push(log) }
    if (notes) log.notes = notes
    const w = parseFloat(weight)
    if (w) { d.weights = d.weights.filter((x) => x.date !== today); d.weights.push({ date: today, val: w }); d.weights.sort((a, b) => a.date.localeCompare(b.date)) }
    const s = parseInt(steps)
    if (s) log.steps = s
    const wa = parseFloat(water)
    if (wa) log.water = wa
    const p = parseInt(protein)
    if (p) log.protein = p
    saveData(d)
    setWeight(""); setSteps(""); setWater(""); setProtein(""); setNotes("")
    toast.success("Full log saved! 🔥")
    reload()
  }

  function handleSaveWorkout() {
    if (!sessionType) { toast.error("Select a session type"); return }
    const d = getData()
    let log = d.dailyLogs.find((l) => l.date === today)
    if (!log) { log = { date: today }; d.dailyLogs.push(log) }
    log.session = sessionType
    log.duration = parseInt(duration) || undefined
    log.intensity = parseInt(intensity) || undefined
    if (sessionType !== "Rest Day") d.xp = (d.xp || 0) + 30
    const { streak, best } = calcStreak(d)
    d.streak = streak + (sessionType !== "Rest Day" ? 1 : 0)
    d.bestStreak = Math.max(best, d.streak)
    d.lastTrainDate = today
    saveData(d)
    setSessionType(""); setDuration(""); setIntensity("")
    toast.success(`Workout logged: ${sessionType} 💪`)
    reload()
  }

  function handleSaveLift() {
    const w = parseFloat(liftWeight)
    const r = parseInt(liftReps)
    if (!w || !r) { toast.error("Enter weight and reps"); return }
    const d = getData()
    d.lifts.push({ date: today, lift: liftName, weight: w, reps: r })
    d.lifts.sort((a, b) => a.date.localeCompare(b.date))
    d.xp = (d.xp || 0) + 10
    saveData(d)
    const def = LIFT_TARGETS[liftName]
    const pr = Math.max(...d.lifts.filter((l) => l.lift === liftName).map((l) => l.weight))
    setLiftWeight(""); setLiftReps("")
    if (w === pr) toast.success(`NEW PR! ${def.label}: ${w}${def.unit} 🏆`)
    else toast.success(`Lift saved: ${def.label} ${w}kg × ${r}`)
    reload()
  }

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="font-mono-ui text-[10px] text-primary uppercase tracking-[0.2em] mb-1.5">Log Today</div>
        <h1 className="font-display text-[34px] lg:text-[44px] leading-none tracking-wide" style={{ color: "var(--brand-green)" }}>
          {todayLabel}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Checklist */}
          <SurfaceCard>
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Today&apos;s Checklist</div>
            <ul className="space-y-0">
              {CHECKLIST_ITEMS.map((item) => {
                const isDone = checkedItems.includes(item.id)
                return (
                  <li
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 cursor-pointer hover:pl-1 transition-all group"
                  >
                    <div className={`w-[18px] h-[18px] rounded flex items-center justify-center border-[1.5px] transition-all shrink-0 ${isDone ? "bg-primary border-primary" : "border-border-strong group-hover:border-primary/50"}`}>
                      {isDone && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
                    </div>
                    <span className={`text-[13px] ${isDone ? "text-muted-foreground line-through" : ""}`}>{item.label}</span>
                    <span className="font-mono-ui text-[10px] text-muted-foreground ml-auto">+{item.pts} XP</span>
                  </li>
                )
              })}
            </ul>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
              <span className="font-mono-ui text-[10px] text-muted-foreground">{doneCount}/6 completed</span>
              <span className="font-display text-xl" style={{ color: "var(--brand-amber)" }}>+{donePts} XP</span>
            </div>
          </SurfaceCard>

          {/* Quick Log */}
          <SurfaceCard>
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Quick Log</div>
            <div className="space-y-3">
              <div>
                <FieldLabel>Weight today (kg)</FieldLabel>
                <div className="flex gap-2">
                  <Input type="number" step="0.1" min="80" max="130" placeholder="e.g. 111.5" value={weight} onChange={(e) => setWeight(e.target.value)} />
                  <GhostButton onClick={handleLogWeight}>Save</GhostButton>
                </div>
              </div>
              <div>
                <FieldLabel>Steps today</FieldLabel>
                <div className="flex gap-2">
                  <Input type="number" step="100" min="0" placeholder="e.g. 14500" value={steps} onChange={(e) => setSteps(e.target.value)} />
                  <GhostButton onClick={handleLogSteps}>Save</GhostButton>
                </div>
              </div>
              <div>
                <FieldLabel>Water intake (litres)</FieldLabel>
                <div className="flex gap-2">
                  <Input type="number" step="0.1" min="0" max="8" placeholder="e.g. 3.5" value={water} onChange={(e) => setWater(e.target.value)} />
                  <GhostButton onClick={handleLogWater}>Save</GhostButton>
                </div>
              </div>
              <div>
                <FieldLabel>Protein today (g)</FieldLabel>
                <div className="flex gap-2">
                  <Input type="number" step="1" min="0" max="300" placeholder="e.g. 165" value={protein} onChange={(e) => setProtein(e.target.value)} />
                  <GhostButton onClick={handleLogProtein}>Save</GhostButton>
                </div>
              </div>
              <div>
                <FieldLabel>Notes / mood</FieldLabel>
                <Textarea placeholder="How did training feel? Any pain? Energy level?" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <PrimaryButton className="w-full" onClick={handleSaveFullLog}>
                <Save className="w-4 h-4" /> Save Today&apos;s Log
              </PrimaryButton>
            </div>
          </SurfaceCard>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Workout Log */}
          <SurfaceCard>
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Log Workout</div>
            <div className="space-y-3">
              <div>
                <FieldLabel>Session type</FieldLabel>
                <Select value={sessionType} onChange={(e) => setSessionType(e.target.value)}>
                  <option value="">— select —</option>
                  {SESSION_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                </Select>
              </div>
              <div>
                <FieldLabel>Duration (minutes)</FieldLabel>
                <Input type="number" min="0" max="180" placeholder="e.g. 75" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
              <div>
                <FieldLabel>Intensity (1–10)</FieldLabel>
                <Input type="number" min="1" max="10" placeholder="e.g. 8" value={intensity} onChange={(e) => setIntensity(e.target.value)} />
              </div>
              <PrimaryButton className="w-full" onClick={handleSaveWorkout}>
                <Dumbbell className="w-4 h-4" /> Log Workout
              </PrimaryButton>
            </div>
          </SurfaceCard>

          {/* PR / Lift */}
          <SurfaceCard>
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Log a PR / Lift</div>
            <div className="space-y-3">
              <div>
                <FieldLabel>Lift</FieldLabel>
                <Select value={liftName} onChange={(e) => setLiftName(e.target.value)}>
                  {Object.entries(LIFT_TARGETS).map(([key, def]) => (
                    <option key={key} value={key}>{def.label}</option>
                  ))}
                </Select>
              </div>
              <div>
                <FieldLabel>Weight (kg) / Reps value</FieldLabel>
                <Input type="number" step="0.5" placeholder="e.g. 72.5" value={liftWeight} onChange={(e) => setLiftWeight(e.target.value)} />
              </div>
              <div>
                <FieldLabel>Reps</FieldLabel>
                <Input type="number" placeholder="e.g. 5" value={liftReps} onChange={(e) => setLiftReps(e.target.value)} />
              </div>
              <PrimaryButton className="w-full" onClick={handleSaveLift}>
                <Zap className="w-4 h-4" /> Save Lift
              </PrimaryButton>
            </div>
          </SurfaceCard>
        </div>
      </div>
    </PageContainer>
  )
}

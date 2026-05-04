import { TYPE_LABEL, type DayPlan } from "@/lib/data/weekly-plan"

const BADGE_STYLE: Record<DayPlan["type"], { color: string; bg: string; border: string }> = {
  full: { color: "var(--brand-orange)", bg: "var(--brand-orange-dim)", border: "rgba(245,160,96,0.2)" },
  strength: { color: "var(--brand-blue)", bg: "var(--brand-blue-dim)", border: "rgba(126,200,245,0.2)" },
  cardio: { color: "var(--brand-green)", bg: "var(--brand-green-dim)", border: "rgba(184,245,160,0.2)" },
  sport: { color: "var(--brand-purple)", bg: "var(--brand-purple-dim)", border: "rgba(200,168,245,0.2)" },
  rest: { color: "var(--muted-foreground)", bg: "rgba(255,255,255,0.04)", border: "var(--border)" },
  active: { color: "var(--brand-amber)", bg: "var(--brand-amber-dim)", border: "rgba(245,200,66,0.2)" },
  deload: { color: "var(--brand-teal)", bg: "var(--brand-teal-dim)", border: "rgba(94,240,216,0.2)" },
}

export function DayCard({
  day,
  date,
  dayName,
}: {
  day: DayPlan
  date: Date
  dayName: string
}) {
  const dateNum = date.getDate()
  const badge = BADGE_STYLE[day.type]
  const dateStr = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden transition-colors hover:border-border-strong">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="font-display text-[28px] leading-none text-faint shrink-0">{dateNum}</div>
          <div className="min-w-0">
            <div className="font-medium text-[13px] truncate">
              {dayName} · {dateStr}
            </div>
            <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider">
              {day.session}
            </div>
          </div>
        </div>
        <span
          className="font-mono-ui text-[9px] uppercase tracking-[0.1em] px-2.5 py-1 rounded border whitespace-nowrap shrink-0"
          style={{ color: badge.color, background: badge.bg, borderColor: badge.border }}
        >
          {TYPE_LABEL[day.type]}
        </span>
      </div>
      <div className="px-4 py-3.5">
        {day.detail && (
          <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{day.detail}</p>
        )}
        {day.exs.length > 0 && (
          <ul className="flex flex-col">
            {day.exs.map(([n, s], i) => (
              <li
                key={i}
                className="flex justify-between gap-3 py-1.5 border-b border-border last:border-b-0 text-[12px]"
              >
                <span>{n}</span>
                <span className="font-mono-ui text-[11px] text-muted-foreground whitespace-nowrap">{s}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

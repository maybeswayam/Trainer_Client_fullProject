import type { Rule, RuleType } from "@/lib/data/rules"
import { cn } from "@/lib/utils"

const STYLE: Record<RuleType, { dot: string; bg: string; border: string }> = {
  tip: {
    dot: "var(--brand-green)",
    bg: "var(--brand-green-dim)",
    border: "rgba(184,245,160,0.2)",
  },
  warn: {
    dot: "var(--brand-red)",
    bg: "var(--brand-red-dim)",
    border: "rgba(245,111,111,0.25)",
  },
  info: {
    dot: "var(--brand-blue)",
    bg: "var(--brand-blue-dim)",
    border: "rgba(126,200,245,0.2)",
  },
  deload: {
    dot: "var(--brand-teal)",
    bg: "var(--brand-teal-dim)",
    border: "rgba(94,240,216,0.2)",
  },
}

export function RuleList({ rules, className }: { rules: Rule[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {rules.map((r, i) => {
        const s = STYLE[r.type]
        return (
          <li
            key={i}
            className="flex gap-3 rounded-lg border px-4 py-3.5 text-[13px] leading-relaxed"
            style={{ background: s.bg, borderColor: s.border }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0 mt-[8px]"
              style={{ background: s.dot }}
              aria-hidden
            />
            <div>
              <strong className="font-medium text-foreground">{r.title}</strong>{" "}
              <span className="text-muted-foreground">{r.text}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

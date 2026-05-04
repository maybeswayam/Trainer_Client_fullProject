import { PageContainer, PageHeader, SectionLabel } from "@/components/ui-kit/section"
import { LIFT_PROGRESSION_TABLE, OVERLOAD_PROTOCOL } from "@/lib/data/strength"
import { RuleList } from "@/components/ui-kit/rule-list"
import type { Rule } from "@/lib/data/rules"
import { TrendingUp } from "lucide-react"

export default function StrengthPlanPage() {
  const rules: Rule[] = OVERLOAD_PROTOCOL.map((p) => ({
    type: p.type as Rule["type"],
    title: p.phase,
    text: p.text,
  }))

  return (
    <PageContainer>
      <PageHeader
        eyebrow="03 · Plan"
        title="Strength Plan"
        accent="var(--brand-green)"
        subtitle="The big-lift progression curve. Six anchor lifts. 17 weeks. Every number here is the destination — the path is double progression and clean form."
      />

      {/* Big lifts headline */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {LIFT_PROGRESSION_TABLE.slice(0, 3).map((lift) => (
          <div key={lift.lift} className="bg-surface border border-border rounded-xl p-5">
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
              {lift.lift}
            </div>
            <div className="flex items-end justify-between gap-2 mb-3">
              <div>
                <div className="font-mono-ui text-[10px] text-muted-foreground">START</div>
                <div className="font-display text-xl leading-none mt-1 text-muted-foreground">{lift.start}</div>
              </div>
              <TrendingUp className="h-4 w-4" style={{ color: lift.color }} strokeWidth={1.5} />
              <div className="text-right">
                <div className="font-mono-ui text-[10px] text-muted-foreground">END</div>
                <div className="font-display text-xl leading-none mt-1" style={{ color: lift.color }}>
                  {lift.end}
                </div>
              </div>
            </div>
            <div className="h-1 bg-faint rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${lift.pct}%`, background: lift.color }}
              />
            </div>
            <div className="font-mono-ui text-[9px] text-muted-foreground mt-1.5 uppercase tracking-wider">
              {lift.pct}% of total gain
            </div>
          </div>
        ))}
      </div>

      <SectionLabel eyebrow="The numbers" title="Lift progression — May 4 to Aug 31" />

      {/* Big progression table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Lift
                </th>
                <th className="text-left font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Start
                </th>
                <th className="text-left font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Wk 5
                </th>
                <th className="text-left font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Wk 11
                </th>
                <th className="text-left font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3">
                  Wk 15
                </th>
                <th className="text-left font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3">
                  End (Wk 17)
                </th>
                <th className="text-left font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 min-w-[140px]">
                  Trajectory
                </th>
              </tr>
            </thead>
            <tbody>
              {LIFT_PROGRESSION_TABLE.map((lift) => (
                <tr key={lift.lift} className="border-b border-border last:border-b-0 hover:bg-surface-2 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-[13px]">{lift.lift}</td>
                  <td className="px-4 py-3.5 text-[12px] font-mono-ui text-muted-foreground">{lift.start}</td>
                  <td className="px-4 py-3.5 text-[12px] font-mono-ui text-muted-foreground">{lift.wk5}</td>
                  <td className="px-4 py-3.5 text-[12px] font-mono-ui text-muted-foreground">{lift.wk11}</td>
                  <td className="px-4 py-3.5 text-[12px] font-mono-ui text-muted-foreground">{lift.wk15}</td>
                  <td className="px-4 py-3.5 text-[12px] font-mono-ui font-medium" style={{ color: lift.color }}>
                    {lift.end}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-faint rounded-full overflow-hidden min-w-[60px]">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${lift.pct}%`, background: lift.color }}
                        />
                      </div>
                      <span className="font-mono-ui text-[10px] text-muted-foreground tabular-nums">
                        {lift.pct}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SectionLabel eyebrow="How to push the numbers" title="Overload protocol per phase" />
      <RuleList rules={rules} />
    </PageContainer>
  )
}

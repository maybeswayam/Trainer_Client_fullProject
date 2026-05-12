import { PageContainer, PageHeader, SectionLabel, Divider } from "@/components/shared/ui-kit/section"
import { RUN_PROGRESSION, SPORT_INTEGRATION, STEPS_STRATEGY } from "@/lib/data/cardio"
import { Footprints, Trophy } from "lucide-react"

export default function CardioPlanPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="04 · Plan"
        title="Cardio Plan"
        accent="var(--brand-green)"
        subtitle="C25K to a 10 km run. The 400m grass field is your studio. Everything is built around laps, effort, and patience — pace is a lagging indicator of distance."
      />

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-9">
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Start
          </div>
          <div className="font-display text-3xl leading-none">2 KM</div>
          <div className="text-[11px] text-muted-foreground mt-1.5">jog/walk intervals</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Goal
          </div>
          <div className="font-display text-3xl leading-none" style={{ color: "var(--brand-green)" }}>
            10 KM
          </div>
          <div className="text-[11px] text-muted-foreground mt-1.5">25 laps · grass field</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            5K Target
          </div>
          <div className="font-display text-3xl leading-none" style={{ color: "var(--brand-blue)" }}>
            Sub-33
          </div>
          <div className="text-[11px] text-muted-foreground mt-1.5">min · by Wk 5</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
            Steps / day
          </div>
          <div className="font-display text-3xl leading-none" style={{ color: "var(--brand-amber)" }}>
            15K
          </div>
          <div className="text-[11px] text-muted-foreground mt-1.5">ambient cardio floor</div>
        </div>
      </div>

      <SectionLabel eyebrow="The build" title="Running progression — 400m grass field" />

      {/* Run progression table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <Th>Weeks</Th>
                <Th>Session type</Th>
                <Th>Distance / Volume</Th>
                <Th>Effort</Th>
                <Th>Field laps</Th>
              </tr>
            </thead>
            <tbody>
              {RUN_PROGRESSION.map((row) => (
                <tr key={row.weeks} className="border-b border-border last:border-b-0 hover:bg-surface-2 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-[12px] font-mono-ui" style={{ color: row.color }}>
                    {row.weeks}
                  </td>
                  <td className="px-4 py-3.5 text-[13px]">{row.type}</td>
                  <td className="px-4 py-3.5 text-[12px] font-mono-ui text-muted-foreground">{row.distance}</td>
                  <td className="px-4 py-3.5 text-[12px] text-muted-foreground">{row.effort}</td>
                  <td className="px-4 py-3.5 text-[12px] font-mono-ui text-muted-foreground">{row.laps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SectionLabel eyebrow="Sport replaces structured cardio" title="Sport integration" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
        {SPORT_INTEGRATION.map((s) => (
          <div
            key={s.sport}
            className="rounded-xl border p-5 flex gap-4"
            style={{
              background: "var(--brand-green-dim)",
              borderColor: "rgba(184,245,160,0.2)",
            }}
          >
            <Trophy className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--brand-green)" }} strokeWidth={1.5} />
            <div className="flex-1">
              <h3 className="font-display text-xl leading-none tracking-wide mb-2">{s.sport.toUpperCase()}</h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <SectionLabel eyebrow="Ambient cardio floor" title="Steps strategy — 15,000/day" />
      <div className="bg-surface border border-border rounded-xl p-5 max-w-[640px]">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
          <Footprints className="h-5 w-5" style={{ color: "var(--brand-green)" }} strokeWidth={1.5} />
          <div className="font-mono-ui text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            Where the steps come from
          </div>
        </div>
        <div className="flex flex-col">
          {STEPS_STRATEGY.map((row) => (
            <div
              key={row.source}
              className={`flex items-center justify-between gap-3 py-3 ${row.total ? "" : "border-b border-border"}`}
            >
              <span className={`text-[13px] ${row.total ? "font-medium" : "text-foreground"}`}>{row.source}</span>
              <span
                className="font-mono-ui text-[12px]"
                style={{ color: row.total ? "var(--brand-amber)" : "var(--brand-green)" }}
              >
                {row.steps}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3">
      {children}
    </th>
  )
}

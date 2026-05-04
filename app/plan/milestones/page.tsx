import { PageContainer, PageHeader, SectionLabel } from "@/components/ui-kit/section"
import { MILESTONES } from "@/lib/data/milestones"
import { Target } from "lucide-react"

export default function MilestonesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="06 · Plan"
        title="Milestones"
        accent="var(--brand-green)"
        subtitle="Five checkpoints to August. Hit them, the body follows. Miss them, the protocol updates — not the goal."
      />

      <SectionLabel eyebrow="The five gates" title="Phase end-states" />

      {/* Vertical timeline */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-[18px] top-3 bottom-3 w-px bg-border md:left-1/2"
        />
        <ol className="flex flex-col gap-4">
          {MILESTONES.map((m, i) => {
            const onLeft = i % 2 === 0
            return (
              <li key={m.phase} className="relative">
                <div className="grid md:grid-cols-2 md:gap-10">
                  {/* Card */}
                  <div className={onLeft ? "md:order-1" : "md:order-2 md:col-start-2"}>
                    <article
                      className="rounded-xl border bg-surface p-5 ml-10 md:ml-0 transition-colors hover:border-border-strong"
                      style={{ borderColor: `${m.hex}30` }}
                    >
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div
                          className="font-mono-ui text-[10px] uppercase tracking-[0.18em]"
                          style={{ color: m.hex }}
                        >
                          Phase {m.phase} · {m.shortName}
                        </div>
                        <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-wider">
                          {m.dateRange}
                        </div>
                      </div>
                      <h3 className="font-display text-xl tracking-wide leading-tight mb-3">
                        {m.title.toUpperCase()}
                      </h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {m.metrics.map((mt) => (
                          <li
                            key={mt.label}
                            className="bg-surface-2 border border-border rounded-md px-3 py-2"
                          >
                            <div className="font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground">
                              {mt.label}
                            </div>
                            <div className="text-[12px] mt-0.5 font-medium">{mt.value}</div>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                  {/* Spacer (other half) */}
                  <div className={onLeft ? "md:order-2" : "md:order-1 md:col-start-1"} />
                </div>
                {/* Dot */}
                <div
                  aria-hidden
                  className="absolute left-[18px] top-5 -translate-x-1/2 md:left-1/2"
                >
                  <div
                    className="h-3.5 w-3.5 rounded-full ring-4 ring-background"
                    style={{ background: m.hex }}
                  />
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      {/* Identity shift footer card */}
      <div className="mt-12 rounded-xl border border-primary/30 bg-primary/5 p-6 lg:p-8">
        <div className="flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">
          <Target className="h-4 w-4" strokeWidth={1.5} /> Identity shift
        </div>
        <p className="mt-4 font-display text-2xl lg:text-3xl tracking-wide leading-tight text-balance">
          From a 112KG body that hasn&apos;t trained → a 100KG athlete who runs 10K, benches 90KG, and shows up 6 days a week. Not a result. A baseline.
        </p>
      </div>
    </PageContainer>
  )
}

import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { PageContainer, PageHeader, SectionLabel, StatChip } from "@/components/shared/ui-kit/section"
import { PhaseBadge } from "@/components/shared/ui-kit/cards"
import { PHASES } from "@/lib/data/phases"
import { PLAN_NAV, TRACKER_NAV } from "@/lib/data/navigation"

export default function HomePage() {
  return (
    <PageContainer>
      <div className="relative">
        {/* Subtle ambient glow top-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-[-120px] w-[420px] h-[420px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(184,245,160,0.06) 0%, transparent 70%)",
          }}
        />

        <PageHeader
          eyebrow={
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                <span className="relative rounded-full bg-primary h-1.5 w-1.5" />
              </span>
              MAY 4 RESET · LIVE
            </span>
          }
          title="SAM. TRANSFORM"
          accent="var(--brand-green)"
          subtitle="17 weeks. 5 phases. One identity shift. From 112 kg to 100, bench 60→90, and a 10 km run. Plan, track, repeat — every metric in one quiet, deliberate place."
        >
          <div className="flex flex-wrap gap-3 items-center mb-6">
            <Link
              href="/plan/weekly-calendar"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-[13px] px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
            >
              Open the plan
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link
              href="/tracker/log-today"
              className="inline-flex items-center gap-2 border border-border-strong text-foreground font-medium text-[13px] px-4 py-2.5 rounded-md hover:border-primary hover:text-primary transition-colors"
            >
              Log today
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <StatChip label="Start" value="112 KG" accent="var(--foreground)" />
            <StatChip label="Target" value="100 KG" accent="var(--foreground)" />
            <StatChip label="Bench" value="60 → 90" accent="var(--foreground)" />
            <StatChip label="Run" value="2 → 10 KM" accent="var(--foreground)" />
          </div>
        </PageHeader>

        {/* Phases */}
        <section className="mb-14" aria-labelledby="phases-heading">
          <div
            id="phases-heading"
            className="font-mono-ui text-[10px] text-primary uppercase tracking-[0.22em] mb-3"
          >
            The Five Phases
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {PHASES.map((p) => (
              <PhaseBadge
                key={p.num}
                num={p.num}
                name={p.shortName}
                weeksLabel={p.weeksLabel}
                hex={p.hex}
              />
            ))}
          </div>
        </section>

        {/* Plan blueprint */}
        <section className="mb-14" aria-labelledby="plan-heading">
          <SectionLabel eyebrow="Your Blueprint" title="Plan" />
          <div id="plan-heading" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PLAN_NAV.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group bg-surface border border-border rounded-xl p-5 transition-all hover:border-border-strong hover:bg-surface-2 relative"
                >
                  <div className="flex items-start justify-between mb-5">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    <ArrowUpRight
                      className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="font-medium text-[13.5px] uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <div className="text-[12px] text-muted-foreground leading-relaxed">
                    {item.description}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Tracker */}
        <section className="mb-10" aria-labelledby="tracker-heading">
          <SectionLabel eyebrow="Your Daily Log" title="Tracker" />
          <div id="tracker-heading" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TRACKER_NAV.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group bg-surface border border-border rounded-xl p-5 transition-all hover:border-border-strong hover:bg-surface-2"
                >
                  <div className="flex items-start justify-between mb-5">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    <ArrowUpRight
                      className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="font-medium text-[13.5px] uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <div className="text-[12px] text-muted-foreground leading-relaxed">
                    {item.description}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <div className="mt-16 pt-6 border-t border-border flex items-center justify-between font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
          <span>Built for one job · Show up</span>
          <span>17 weeks · 5 phases</span>
        </div>
      </div>
    </PageContainer>
  )
}

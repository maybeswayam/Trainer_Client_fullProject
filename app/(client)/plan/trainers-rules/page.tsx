import { PageContainer, PageHeader, SectionLabel } from "@/components/shared/ui-kit/section"
import { RuleList } from "@/components/shared/ui-kit/rule-list"
import { RULES } from "@/lib/data/rules"
import { Scroll } from "lucide-react"

export default function TrainersRulesPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="07 · Plan"
        title="Trainer's Rules"
        accent="var(--brand-green)"
        subtitle="The non-negotiables. Read these on the days you don't want to read anything. They will save weeks of bad decisions."
      />

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 lg:p-6 mb-10 flex items-start gap-4">
        <Scroll className="h-5 w-5 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
        <div className="text-[13.5px] leading-relaxed">
          <span className="font-display text-base tracking-wide block mb-1.5">A QUIET CONTRACT WITH YOURSELF.</span>
          <span className="text-muted-foreground">
            None of these are clever. All of them are non-negotiable. The plan only works if these stay green for 17
            weeks straight.
          </span>
        </div>
      </div>

      {RULES.map((section, i) => (
        <section key={section.heading} className={i === RULES.length - 1 ? "mb-4" : "mb-10"}>
          <SectionLabel
            eyebrow={`Section ${String(i + 1).padStart(2, "0")}`}
            title={section.heading}
          />
          <RuleList rules={section.rules} />
        </section>
      ))}
    </PageContainer>
  )
}

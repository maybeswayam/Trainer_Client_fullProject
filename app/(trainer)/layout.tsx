import { TrainerShell } from "@/components/trainer/layout/trainer-shell"

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <TrainerShell>{children}</TrainerShell>
}

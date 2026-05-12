const fs = require('fs');

const rootLayoutPath = 'app/layout.tsx';
let rootLayoutStr = fs.readFileSync(rootLayoutPath, 'utf8');

rootLayoutStr = rootLayoutStr.replace(/import \{ AppShell \} from ".*";?\n/, '');
rootLayoutStr = rootLayoutStr.replace(/<AppShell>(\{children\})<\/AppShell>/, '$1');

fs.writeFileSync(rootLayoutPath, rootLayoutStr);

fs.mkdirSync('app/(client)', { recursive: true });
fs.writeFileSync('app/(client)/layout.tsx', `import { AppShell } from "@/components/client/layout/app-shell"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppShell>{children}</AppShell>
}
`);

fs.mkdirSync('app/(trainer)', { recursive: true });
fs.writeFileSync('app/(trainer)/layout.tsx', `import { TrainerShell } from "@/components/trainer/layout/trainer-shell"

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <TrainerShell>{children}</TrainerShell>
}
`);

fs.mkdirSync('components/trainer/layout', { recursive: true });

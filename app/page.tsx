import Link from "next/link"
import { ArrowRight, UserCircle, ShieldStar } from "lucide-react"

export default function RootLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(184,245,160,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-md text-center">
        <h1 className="font-bebas text-6xl tracking-wider mb-2">TRANSFORM OS</h1>
        <p className="font-mono-ui text-xs text-muted-foreground uppercase tracking-[0.2em] mb-12">
          The ultimate fitness tracking architecture
        </p>

        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="group flex flex-col items-center p-6 bg-surface border border-border rounded-xl hover:border-brand-green/50 hover:bg-surface-2 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <UserCircle className="w-8 h-8 text-brand-green mb-3 opacity-80 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-xl tracking-wide mb-1">Client Portal</h2>
            <p className="text-xs text-muted-foreground font-mono-ui uppercase tracking-wider">
              Log workouts & view plan
            </p>
          </Link>

          <Link
            href="/trainer/dashboard"
            className="group flex flex-col items-center p-6 bg-surface border border-border rounded-xl hover:border-brand-amber/50 hover:bg-surface-2 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-amber/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <ShieldStar className="w-8 h-8 text-brand-amber mb-3 opacity-80 group-hover:opacity-100 transition-opacity" />
            <h2 className="font-display text-xl tracking-wide mb-1">Trainer Portal</h2>
            <p className="text-xs text-muted-foreground font-mono-ui uppercase tracking-wider">
              Manage roster & programming
            </p>
          </Link>
        </div>

        <div className="mt-12 text-[10px] uppercase font-mono-ui text-muted-foreground tracking-widest opacity-50">
          Internal Demo Build v4.0
        </div>
      </div>
    </div>
  )
}

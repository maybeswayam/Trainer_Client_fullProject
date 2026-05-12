"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Loader2, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react"

export function TrainerLoginScreen() {
  const router = useRouter()
  const { login, checkCredentials } = useAuth()
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [shaking, setShaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isLoading) return
    setError("")
    
    const result = checkCredentials(user.trim(), pass)
    if (!result.valid) {
      setError("Invalid credentials")
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    } else if (result.user?.role !== "trainer") {
      setError("Access denied. Trainer credentials required.")
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        login(user.trim(), pass)
        router.push("/trainer/dashboard")
      }, 1500)
    }
  }

  const fillDemoCredentials = () => {
    setUser("krishna")
    setPass("trainer123")
  }

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-[100] overflow-hidden">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{ background: "radial-gradient(circle, rgba(245,200,66,0.12) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(184,245,160,0.1) 0%, transparent 70%)" }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain opacity-60 pointer-events-none" />

      <div className="relative w-full max-w-[380px] mx-4">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: "var(--brand-amber-dim)", border: "1px solid rgba(245,200,66,0.2)" }}>
            <ShieldCheck className="w-8 h-8 text-brand-amber" strokeWidth={1.5} />
          </div>
          <h1
            className="font-display text-4xl leading-none tracking-wider"
            style={{
              background: "linear-gradient(180deg, #f0ede8 30%, rgba(245,200,66,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TRAINER PORTAL
          </h1>
          <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.3em] mt-2">
            Transform OS - Professional Access
          </div>
        </div>

        {/* Card or Loading state */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in-95 duration-500">
            <Loader2 className="w-5 h-5 text-brand-amber animate-spin mb-4" strokeWidth={1.5} />
            <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.2em] animate-pulse">
              Authenticating Trainer
            </div>
            <div className="w-[120px] h-[2px] bg-border mt-6 rounded-full overflow-hidden">
              <div className="h-full bg-brand-amber animate-[load_1.5s_ease-in-out_forwards]" />
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`bg-surface border border-border rounded-xl p-6 transition-transform ${shaking ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "var(--brand-amber-dim)", border: "1px solid rgba(245,200,66,0.15)" }}>
                <Lock className="w-3.5 h-3.5" style={{ color: "var(--brand-amber)" }} strokeWidth={2} />
              </div>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Trainer Access Only</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5">Username</label>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="krishna"
                  autoComplete="username"
                  autoFocus
                  className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-[13px] text-foreground placeholder:text-faint focus:outline-none focus:border-brand-amber/40 transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="w-full bg-background border border-border rounded-md px-3 py-2.5 pr-10 text-[13px] text-foreground placeholder:text-faint focus:outline-none focus:border-brand-amber/40 transition-colors"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-3 font-mono-ui text-[11px] text-center" style={{ color: "var(--brand-red)" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-5 flex items-center justify-center gap-2 bg-brand-amber text-primary-foreground font-medium text-[13px] px-4 py-2.5 rounded-md hover:bg-brand-amber/90 active:scale-[0.98] transition-all"
            >
              Enter <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>

            {/* Demo credentials helper */}
            <div className="mt-4 pt-3 border-t border-border">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full text-center font-mono-ui text-[9px] uppercase tracking-wider text-muted-foreground hover:text-brand-amber transition-colors py-1"
              >
                Use demo credentials
              </button>
              <div className="text-center font-mono-ui text-[8px] text-faint mt-1">
                krishna / trainer123
              </div>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="text-center mt-6 font-mono-ui text-[9px] text-faint uppercase tracking-[0.2em]">
          Manage clients - Track progress - Build champions
        </div>

        {/* Back to portal link */}
        <div className="text-center mt-4">
          <a 
            href="/" 
            className="font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground hover:text-brand-amber transition-colors"
          >
            Back to Portal Selection
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes load {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react"

export function LoginScreen() {
  const { login } = useAuth()
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [shaking, setShaking] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const ok = login(user.trim(), pass)
    if (!ok) {
      setError("Invalid credentials")
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-[100] overflow-hidden">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{ background: "radial-gradient(circle, rgba(184,245,160,0.12) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(200,168,245,0.12) 0%, transparent 70%)" }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain opacity-60 pointer-events-none" />

      <div className="relative w-full max-w-[380px] mx-4">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="font-display text-[72px] leading-none tracking-wider"
            style={{
              background: "linear-gradient(180deg, #f0ede8 30%, rgba(184,245,160,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SAM.
          </h1>
          <div className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.3em] mt-1">
            Transformation OS
          </div>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className={`bg-surface border border-border rounded-xl p-6 transition-transform ${shaking ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "var(--brand-green-dim)", border: "1px solid rgba(184,245,160,0.15)" }}>
              <Lock className="w-3.5 h-3.5" style={{ color: "var(--brand-green)" }} strokeWidth={2} />
            </div>
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Private Access</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5">Username</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="username"
                autoComplete="username"
                autoFocus
                className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-[13px] text-foreground placeholder:text-faint focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-background border border-border rounded-md px-3 py-2.5 pr-10 text-[13px] text-foreground placeholder:text-faint focus:outline-none focus:border-primary/40 transition-colors"
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
            className="w-full mt-5 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium text-[13px] px-4 py-2.5 rounded-md hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            Enter <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 font-mono-ui text-[9px] text-faint uppercase tracking-[0.2em]">
          17 weeks · 5 phases · one identity shift
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
      `}</style>
    </div>
  )
}

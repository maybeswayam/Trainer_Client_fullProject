"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { 
  UserCircle, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Loader2,
  Dumbbell,
  Target,
  TrendingUp,
  Users,
  Lock,
  ChevronLeft
} from "lucide-react"

type LoginMode = "select" | "trainer" | "client"

export default function RootLandingPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [mode, setMode] = useState<LoginMode>("select")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    setError("")

    const success = login(username.trim(), password)
    if (!success) {
      setError("Invalid credentials")
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        if (mode === "trainer") {
          router.push("/trainer/dashboard")
        } else {
          router.push("/dashboard")
        }
      }, 1500)
    }
  }

  const demoCredentials = mode === "trainer" 
    ? { username: "krishna", password: "trainer123" }
    : { username: "sam", password: "client123" }

  const fillDemoCredentials = () => {
    setUsername(demoCredentials.username)
    setPassword(demoCredentials.password)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(184,245,160,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-8 md:mb-10">
          <h1 
            className="font-display text-5xl md:text-7xl tracking-wider"
            style={{
              background: "linear-gradient(180deg, #f0ede8 40%, rgba(184,245,160,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            TRANSFORM OS
          </h1>
          <p className="font-mono-ui text-[10px] md:text-xs text-muted-foreground uppercase tracking-[0.25em] mt-2">
            Professional Fitness Management Platform
          </p>
        </div>

        {/* Selection Mode */}
        {mode === "select" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Stats Banner */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div className="text-center p-3 bg-surface/50 rounded-lg border border-border/50">
                <div className="font-display text-lg md:text-xl text-primary">5</div>
                <div className="font-mono-ui text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">Clients</div>
              </div>
              <div className="text-center p-3 bg-surface/50 rounded-lg border border-border/50">
                <div className="font-display text-lg md:text-xl text-brand-blue">92%</div>
                <div className="font-mono-ui text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">Compliance</div>
              </div>
              <div className="text-center p-3 bg-surface/50 rounded-lg border border-border/50">
                <div className="font-display text-lg md:text-xl text-brand-amber">17</div>
                <div className="font-mono-ui text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">Weeks</div>
              </div>
              <div className="text-center p-3 bg-surface/50 rounded-lg border border-border/50">
                <div className="font-display text-lg md:text-xl text-brand-purple">5</div>
                <div className="font-mono-ui text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-wider">Phases</div>
              </div>
            </div>

            {/* Trainer Portal Card */}
            <button
              onClick={() => setMode("trainer")}
              className="group w-full flex items-start gap-4 p-5 md:p-6 bg-surface border border-border rounded-xl hover:border-brand-amber/50 hover:bg-surface-2 transition-all text-left relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-amber/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--brand-amber-dim)", border: "1px solid rgba(245,200,66,0.2)" }}>
                <ShieldCheck className="w-6 h-6 text-brand-amber" strokeWidth={1.5} />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-display text-xl md:text-2xl tracking-wide">Trainer Portal</h2>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-amber transition-colors" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Manage your roster, track client progress, and create personalized programs
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span>Client Management</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-muted-foreground">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Analytics</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Client Portal Card */}
            <button
              onClick={() => setMode("client")}
              className="group w-full flex items-start gap-4 p-5 md:p-6 bg-surface border border-border rounded-xl hover:border-brand-green/50 hover:bg-surface-2 transition-all text-left relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--brand-green-dim)", border: "1px solid rgba(184,245,160,0.2)" }}>
                <UserCircle className="w-6 h-6 text-brand-green" strokeWidth={1.5} />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-display text-xl md:text-2xl tracking-wide">Client Portal</h2>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-green transition-colors" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  View your plan, log workouts, track nutrition, and monitor your progress
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-muted-foreground">
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span>Workout Logs</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-muted-foreground">
                    <Target className="w-3.5 h-3.5" />
                    <span>Goals</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Footer */}
            <div className="text-center pt-6 font-mono-ui text-[9px] md:text-[10px] text-faint uppercase tracking-[0.2em]">
              Investor Demo v4.0 - Transform OS Platform
            </div>
          </div>
        )}

        {/* Login Form */}
        {(mode === "trainer" || mode === "client") && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Back Button */}
            <button
              onClick={() => {
                setMode("select")
                setError("")
                setUsername("")
                setPassword("")
              }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-mono-ui text-xs uppercase tracking-wider">Back to selection</span>
            </button>

            {/* Login Card */}
            {isLoading ? (
              <div className="bg-surface border border-border rounded-xl p-8 text-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                <div className="font-mono-ui text-xs text-muted-foreground uppercase tracking-wider animate-pulse">
                  Authenticating...
                </div>
                <div className="w-32 h-1 bg-border mt-4 mx-auto rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-[load_1.5s_ease-in-out_forwards]" />
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleLogin}
                className={`bg-surface border border-border rounded-xl p-6 transition-transform ${shaking ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ 
                      background: mode === "trainer" ? "var(--brand-amber-dim)" : "var(--brand-green-dim)",
                      border: mode === "trainer" 
                        ? "1px solid rgba(245,200,66,0.2)" 
                        : "1px solid rgba(184,245,160,0.2)"
                    }}
                  >
                    {mode === "trainer" 
                      ? <ShieldCheck className="w-5 h-5 text-brand-amber" strokeWidth={1.5} />
                      : <UserCircle className="w-5 h-5 text-brand-green" strokeWidth={1.5} />
                    }
                  </div>
                  <div>
                    <h2 className="font-display text-xl tracking-wide">
                      {mode === "trainer" ? "Trainer Login" : "Client Login"}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Enter your credentials to continue
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={mode === "trainer" ? "krishna" : "sam"}
                      autoComplete="username"
                      autoFocus
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-faint focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-ui text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 pr-11 text-sm text-foreground placeholder:text-faint focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="mt-4 text-center font-mono-ui text-xs text-brand-red">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-4 py-3 rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all"
                >
                  <Lock className="w-4 h-4" />
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Demo Credentials Helper */}
                <div className="mt-4 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="w-full text-center font-mono-ui text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors py-2"
                  >
                    Use demo credentials
                  </button>
                  <div className="text-center font-mono-ui text-[9px] text-faint mt-1">
                    {mode === "trainer" 
                      ? "krishna / trainer123" 
                      : "sam / client123"
                    }
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        @keyframes load {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

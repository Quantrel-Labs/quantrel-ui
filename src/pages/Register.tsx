// DOCS: Register page component

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { ROLES, Role } from "@/lib/roles"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [role, setRole] = useState<Role>(ROLES.CUSTOMER)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const { signUpEmail, signInGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }
    
    try {
      await signUpEmail(email, password, displayName, role)
      navigate("/verify-email")
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setError("")
    
    try {
      await signInGoogle()
      navigate("/")
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden py-24 min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.15),_transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(236,72,153,0.12),_transparent_70%)] blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-20 px-6 md:grid-cols-[1fr_1.2fr] lg:px-12 items-center">
        <div className="space-y-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
            Join Quantrel
          </div>
          
          <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Build cinematic
            <br />
            <span className="text-white">AI experiences</span>
            <br />
            without touching code
          </h1>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
            Quantrel pairs cutting-edge AI with production-ready components, so you can generate dashboards, marketplaces, and
            immersive storefronts in minutes.
          </p>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {["Role-based dashboards", "Realtime analytics", "AI-assisted workflows", "Launch-ready publishing"].map(
              (item, index) => (
                <div key={item} className="bg-white/5 border border-white/10 p-6 rounded-lg animate-fade-in-scale hover:bg-white/10 transition-colors" style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className="font-bold text-white">{item}</span>
                </div>
              )
            )}
          </div>
        </div>

        <Card className="relative w-full max-w-2xl justify-self-end animate-fade-in-scale bg-black border border-white/10" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="space-y-6">
            <CardTitle className="font-display text-4xl font-bold">Create your account</CardTitle>
            <p className="text-lg text-gray-400">Pick your role, invite your team, and start shipping with AI.</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-400/30 p-6 rounded-lg animate-fade-in-scale">
                <p className="text-red-200 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="displayName" className="text-base font-bold text-white">
                  Full name
                </label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Avery Chen"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="h-14 text-base"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="email" className="text-base font-bold text-white">
                  Work email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium text-white/80">
                  Role
                </label>
                <div className="rounded-3xl border border-white/12 bg-white/[0.05] p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {[ROLES.CUSTOMER, ROLES.STORE].map((option) => {
                      const isActive = role === option
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setRole(option)}
                          className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
                            isActive
                              ? "border border-white/30 bg-white/80 text-black shadow-[0_18px_45px_rgba(8,12,40,0.45)]"
                              : "border border-transparent bg-transparent text-white/70 hover:border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <span className="block font-semibold">
                            {option === ROLES.CUSTOMER ? "Customer" : "Store"}
                          </span>
                          <span className="text-xs text-white/60">
                            {option === ROLES.CUSTOMER ? "Browse models" : "Sell your AI"}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                <p className="text-xs text-white/60">
                  {role === ROLES.CUSTOMER
                    ? "Personalize your discovery feed, save favorites, and plug into agents instantly."
                    : "Launch storefronts, manage credits, and sync sales data with your stack."}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm font-medium text-white/80">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-white/80">
                    Confirm
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-1 text-xs text-white/55">
                <p>Password must contain:</p>
                <ul className="grid gap-1 text-white/45">
                  <li className={password.length >= 6 ? "text-white" : ""}>At least 6 characters</li>
                  <li className={/[A-Z]/.test(password) ? "text-white" : ""}>One uppercase letter</li>
                  <li className={/\d/.test(password) ? "text-white" : ""}>One number</li>
                </ul>
              </div>

              <Button type="submit" className="h-12 text-base" disabled={isLoading || password !== confirmPassword}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-black" />
                    <span>Creating account…</span>
                  </div>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.3em] text-white/40">
                <span className="bg-transparent px-3">Or</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="h-12 w-full text-base"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  <span>Connecting…</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </div>
              )}
            </Button>

            <div className="text-center text-sm text-white/60">
              Already have an account?{' '}
              <Link to="/login" className="text-white underline-offset-4 hover:text-white">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
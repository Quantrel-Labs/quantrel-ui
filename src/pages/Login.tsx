// DOCS: Login page component

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const { signInEmail, signInGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      await signInEmail(email, password)
      navigate("/")
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
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
      {/* Enhanced background effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,153,255,0.15),_transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.12),_transparent_75%)] blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-20 px-6 md:grid-cols-[1.2fr_1fr] lg:px-12 items-center">
        <div className="space-y-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
            Welcome back
          </div>
          
          <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Unlock your
            <br />
            <span className="text-white">AI marketplace</span>
          </h1>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
            Sign in to orchestrate product launches, monitor credit flows, and manage agents from a dashboard that feels as
            polished as your brand.
          </p>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {["Realtime dashboards", "AI-assisted automations", "Role-aware permissions", "Glassmorphic UI kit"].map((item, index) => (
              <div key={item} className="bg-white/5 border border-white/10 p-6 rounded-lg animate-fade-in-scale hover:bg-white/10 transition-colors" style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="font-bold text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="relative w-full max-w-lg justify-self-end animate-fade-in-scale bg-black border border-white/10" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="space-y-6">
            <CardTitle className="font-display text-4xl font-bold text-white">Sign in</CardTitle>
            <p className="text-lg text-gray-400">Continue to your personalized dashboard and AI toolkit.</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-400/30 p-6 rounded-lg animate-fade-in-scale">
                <p className="text-red-200 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="email" className="text-base font-bold text-white">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@quantrel.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 text-base"
                />
              </div>
              
              <div className="space-y-3">
                <label htmlFor="password" className="text-base font-bold text-white">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 text-base"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <input type="checkbox" className="h-5 w-5 rounded-lg bg-white/5 border border-white/10" />
                  <span className="font-medium">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-gray-400 hover:text-white font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" size="xl" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    <span>Signing in…</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-black px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">Or</span>
              </div>
            </div>

            <Button
              variant="secondary"
              size="xl"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Connecting…</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Continue with Google</span>
                </div>
              )}
            </Button>

            <div className="text-center text-lg">
              <span className="text-gray-400">New to Quantrel?</span>{' '}
              <Link to="/register" className="text-white hover:text-gray-300 font-bold transition-colors">
                Create an account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
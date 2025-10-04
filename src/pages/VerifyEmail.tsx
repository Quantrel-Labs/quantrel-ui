// DOCS: Email verification page component

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"

export default function VerifyEmail() {
  const [isResending, setIsResending] = useState(false)
  const [message, setMessage] = useState("")
  const { user, sendVerifyEmail, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.emailVerified) {
      navigate("/")
    }
  }, [user?.emailVerified, navigate])

  const handleResendEmail = async () => {
    setIsResending(true)
    setMessage("")
    
    try {
      await sendVerifyEmail()
      setMessage("Verification email sent successfully! Check your inbox.")
    } catch (error: any) {
      setMessage("Failed to send verification email. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate("/login")
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(95,78,255,0.35),_transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(0,242,254,0.25),_transparent_70%)] blur-3xl" />

      <Card className="w-full max-w-xl border-white/10 bg-white/[0.06]">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/[0.08]">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l9 5 9-5m-18 0l9 5 9-5m-18 0v8a2 2 0 002 2h14a2 2 0 002-2V8" />
            </svg>
          </div>
          <CardTitle className="text-3xl font-semibold text-white">Verify your email</CardTitle>
          <p className="text-sm text-white/65">
            We just sent a verification link to your inbox. Open it to activate your account and unlock the full Quantrel
            workspace.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          {message && (
            <div
              className={`rounded-2xl border p-4 text-sm ${
                message.includes("Failed")
                  ? "border-red-400/40 bg-red-500/20 text-red-100"
                  : "border-white/30 bg-white/10 text-white"
              }`}
            >
              {message}
            </div>
          )}

          <p className="text-sm text-white/70">
            Didn't receive the email? Check your spam folder or resend below. The link expires in 15 minutes for security.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button onClick={handleResendEmail} disabled={isResending} className="h-12">
              {isResending ? "Sending…" : "Resend verification"}
            </Button>
            <Button onClick={handleSignOut} variant="secondary" className="h-12">
              Sign out
            </Button>
          </div>

          <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-5 text-left text-xs text-white/60">
            <p className="text-white/70">Troubleshooting tips</p>
            <ul className="mt-3 space-y-2">
              <li>• Ensure your inbox allows emails from no-reply@quantrel.ai</li>
              <li>• Add us to your safe sender list to skip spam filters</li>
              <li>• Need help? Reach out via the Support menu above</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
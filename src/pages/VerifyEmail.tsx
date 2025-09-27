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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
          <p className="text-center text-sm text-gray-600">
            We've sent a verification email to your inbox. Please check your email and click the verification link.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            {message && (
              <div className={`mb-4 p-3 text-sm rounded-md ${
                message.includes("Failed") 
                  ? "text-red-600 bg-red-50 border border-red-200" 
                  : "text-green-600 bg-green-50 border border-green-200"
              }`}>
                {message}
              </div>
            )}
            <p className="text-sm text-gray-600 mb-6">
              Didn't receive the email? Check your spam folder or click below to resend.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleResendEmail} 
                disabled={isResending}
                variant="outline"
                className="w-full"
              >
                {isResending ? "Sending..." : "Resend Verification Email"}
              </Button>
              <Button 
                onClick={handleSignOut} 
                variant="ghost"
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
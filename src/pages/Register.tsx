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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Create Account</CardTitle>
          <p className="text-center text-sm text-gray-300">
            Enter your information to create your account
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 text-sm text-red-200 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium text-gray-200">
                Full Name
              </label>
              <Input
                id="displayName"
                type="text"
                placeholder="Enter your full name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-200">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-gray-200">
                Account Type
              </label>
              <select 
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-white/40"
              >
                <option value={ROLES.CUSTOMER} className="bg-gray-800 text-white">Customer</option>
                <option value={ROLES.STORE} className="bg-gray-800 text-white">Store Owner</option>
              </select>
              <p className="text-xs text-gray-400">
                {role === ROLES.CUSTOMER ? "Browse and purchase products" : "Sell products and manage inventory"}
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-200">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-white/20 to-gray-300/20 backdrop-blur-sm border border-white/20 text-white hover:from-white/30 hover:to-gray-300/30" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4 bg-white/5 backdrop-blur-sm border-white/20 text-gray-300 hover:bg-white/10 hover:text-white" 
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? "Signing in..." : (
                <>
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
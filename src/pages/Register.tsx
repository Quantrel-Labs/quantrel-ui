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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-dark"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-secondary rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <Card className="relative z-10 w-full max-w-lg card-glass animate-fade-in-up">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-3xl font-bold gradient-text">Join Us Today</CardTitle>
          <p className="text-gray-300 text-sm font-light">
            Create your account and start exploring AI models
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-4 text-sm text-red-100 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl animate-fade-in-up">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium text-white/90 block">
                Full Name
              </label>
              <Input
                id="displayName"
                type="text"
                placeholder="John Doe"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="glass-input text-white placeholder:text-white/50 border-0 h-12 text-base focus:ring-2 focus:ring-gradient-from-primary/50 transition-all duration-300"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white/90 block">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="glass-input text-white placeholder:text-white/50 border-0 h-12 text-base focus:ring-2 focus:ring-gradient-from-primary/50 transition-all duration-300"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-white/90 block">
                Account Type
              </label>
              <select 
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full h-12 px-4 glass-input text-white border-0 rounded-xl focus:ring-2 focus:ring-gradient-from-primary/50 transition-all duration-300"
              >
                <option value={ROLES.CUSTOMER} className="bg-dark-800 text-white">🛍️ Customer - Browse & Purchase</option>
                <option value={ROLES.STORE} className="bg-dark-800 text-white">🏪 Store Owner - Sell & Manage</option>
              </select>
              <p className="text-xs text-white/60 mt-1">
                {role === ROLES.CUSTOMER 
                  ? "Access our marketplace and discover amazing AI models" 
                  : "Create and sell your AI models to customers worldwide"
                }
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white/90 block">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="glass-input text-white placeholder:text-white/50 border-0 h-12 text-base focus:ring-2 focus:ring-gradient-from-primary/50 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-white/90 block">
                  Confirm
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="glass-input text-white placeholder:text-white/50 border-0 h-12 text-base focus:ring-2 focus:ring-gradient-from-primary/50 transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="text-xs text-white/60 space-y-1">
              <p>Password must contain:</p>
              <ul className="list-disc list-inside space-y-0.5 text-white/50">
                <li className={password.length >= 6 ? "text-green-400" : ""}>At least 6 characters</li>
                <li className={/[A-Z]/.test(password) ? "text-green-400" : ""}>One uppercase letter</li>
                <li className={/\d/.test(password) ? "text-green-400" : ""}>One number</li>
              </ul>
            </div>
            
            <Button 
              type="submit" 
              className="w-full btn-gradient h-12 text-base font-semibold rounded-xl transition-all duration-300" 
              disabled={isLoading || password !== confirmPassword}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black/20 px-3 text-white/60 font-medium tracking-wide">Or continue with</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full glass-input hover:glass border-0 text-white/90 hover:text-white h-12 text-base transition-all duration-300" 
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </div>
              )}
            </Button>
          </div>
          
          <div className="text-center text-sm text-white/60 pt-2">
            Already have an account?{" "}
            <Link to="/login" className="gradient-text-accent hover:underline font-medium transition-all duration-200">
              Sign in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
// DOCS: Register page component

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { ROLES, Role } from "@/lib/roles"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [role, setRole] = useState<Role>(ROLES.CUSTOMER)
  const [step, setStep] = useState<"email" | "details">("email")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const { signUpEmail, signInGoogle } = useAuth()
  const navigate = useNavigate()

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setStep("details")
    }
  }

  const handleDetailsSubmit = async (e: React.FormEvent) => {
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

  const handleBackClick = () => {
    setStep("email")
    setError("")
  }

  return (
    <div className="flex w-full flex-col min-h-screen bg-black relative overflow-hidden">
      {/* Pure CSS Animated Background - No WebGL needed */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>
        
        {/* Subtle grain texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_100%)]" />
        
        {/* Vignette effect */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Top navigation */}
        <MiniNavbar />

        {/* Main content container */}
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="w-full mt-[100px] max-w-md">
            {step === "email" ? (
              <div 
                key="email-step"
                className="space-y-6 text-center animate-[slideInLeft_0.3s_ease-out]"
              >
                  <div className="space-y-1">
                    <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">Join Quantrel</h1>
                    <p className="text-[1.8rem] text-white/70 font-light">Create your account</p>
                  </div>
                  
                  {error && (
                    <div className="bg-red-500/10 border border-red-400/30 p-4 rounded-lg">
                      <p className="text-red-200 text-sm font-medium">{error}</p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <button 
                      onClick={handleGoogleSignIn}
                      disabled={isGoogleLoading}
                      className="backdrop-blur-[2px] w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full py-3 px-4 transition-colors disabled:opacity-50"
                    >
                      {isGoogleLoading ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          <span>Connecting…</span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg">G</span>
                          <span>Sign up with Google</span>
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center gap-4">
                      <div className="h-px bg-white/10 flex-1" />
                      <span className="text-white/40 text-sm">or</span>
                      <div className="h-px bg-white/10 flex-1" />
                    </div>
                    
                    <form onSubmit={handleEmailSubmit}>
                      <div className="relative">
                        <input 
                          type="email" 
                          placeholder="you@quantrel.io"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full backdrop-blur-[1px] bg-transparent text-white border border-white/10 rounded-full py-3 px-4 focus:outline-none focus:border-white/30 text-center"
                          required
                        />
                        <button 
                          type="submit"
                          className="absolute right-1.5 top-1.5 text-white w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group overflow-hidden"
                        >
                          <span className="relative w-full h-full block overflow-hidden">
                            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
                              →
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0">
                              →
                            </span>
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <p className="text-xs text-white/40 pt-10">
                    Already have an account?{' '}
                    <Link to="/login" className="underline text-white/60 hover:text-white transition-colors">
                      Sign in
                    </Link>
                  </p>
                </div>
              ) : (
                <div 
                  key="details-step"
                  className="space-y-6 text-center animate-[slideInRight_0.3s_ease-out]"
                >
                  <div className="space-y-1">
                    <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">Complete Setup</h1>
                    <p className="text-[1.25rem] text-white/50 font-light">{email}</p>
                  </div>
                  
                  {error && (
                    <div className="bg-red-500/10 border border-red-400/30 p-4 rounded-lg">
                      <p className="text-red-200 text-sm font-medium">{error}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleDetailsSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="displayName" className="text-sm font-medium text-white/80 block text-left">
                        Full Name
                      </label>
                      <input 
                        id="displayName"
                        type="text" 
                        placeholder="Avery Chen"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        autoFocus
                        className="w-full backdrop-blur-[1px] bg-transparent text-white border border-white/10 rounded-full py-3 px-4 focus:outline-none focus:border-white/30 text-center"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium text-white/80 block text-left">
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
                                    ? "border border-white/30 bg-white/80 text-black"
                                    : "border border-transparent bg-transparent text-white/70 hover:border-white/10 hover:bg-white/10"
                                }`}
                              >
                                <span className="block font-semibold">
                                  {option === ROLES.CUSTOMER ? "Customer" : "Store"}
                                </span>
                                <span className="text-xs opacity-70">
                                  {option === ROLES.CUSTOMER ? "Browse models" : "Sell your AI"}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-white/80 block text-left">
                          Password
                        </label>
                        <input 
                          id="password"
                          type="password" 
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full backdrop-blur-[1px] bg-transparent text-white border border-white/10 rounded-full py-3 px-4 focus:outline-none focus:border-white/30 text-center"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-white/80 block text-left">
                          Confirm
                        </label>
                        <input 
                          id="confirmPassword"
                          type="password" 
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full backdrop-blur-[1px] bg-transparent text-white border border-white/10 rounded-full py-3 px-4 focus:outline-none focus:border-white/30 text-center"
                          required
                        />
                      </div>
                    </div>

                    <div className="text-xs text-white/55 text-left space-y-1">
                      <p>Password must contain:</p>
                      <ul className="space-y-1 text-white/45 pl-4">
                        <li className={password.length >= 6 ? "text-white" : ""}>✓ At least 6 characters</li>
                        <li className={/[A-Z]/.test(password) ? "text-white" : ""}>✓ One uppercase letter</li>
                        <li className={/\d/.test(password) ? "text-white" : ""}>✓ One number</li>
                      </ul>
                    </div>
                    
                    <div className="flex w-full gap-3 pt-2">
                      <button 
                        type="button"
                        onClick={handleBackClick}
                        className="rounded-full bg-white/10 text-white font-medium px-8 py-3 hover:bg-white/20 transition-all active:scale-95 w-[30%] border border-white/10"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isLoading || password !== confirmPassword}
                        className="flex-1 rounded-full font-medium py-3 bg-white text-black hover:bg-white/90 transition-all active:scale-95 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                            <span>Creating account…</span>
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20
                       flex flex-col items-center
                       pl-6 pr-6 py-3 backdrop-blur-sm
                       ${isOpen ? 'rounded-xl' : 'rounded-full'}
                       border border-[#333] bg-[#1f1f1f57]
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-300 ease-in-out`}>

      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="relative w-5 h-5 flex items-center justify-center">
                            <img src="/logo_dark_theme.png" alt="Q" className="w-5 h-5 rounded-sm" />
            </div>
          </Link>
        </div>

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
          <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
        </nav>

        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200">
            Sign up
          </Link>
        </div>

        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors w-full text-center">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors w-full text-center">About</Link>
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          <Link to="/login" className="px-4 py-2 text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors w-full text-center">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all w-full text-center">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}

// DOCS: Main navigation bar with authentication state

import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { ROLES } from "@/lib/roles"

export default function Navbar() {
  const { user, role, signOut, loading } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate("/")
  }

  const getDashboardPath = () => {
    return "/dashboard"
  }

  if (loading) {
    return (
      <nav className="bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AI Marketplace
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-8 bg-white/10 animate-pulse rounded-lg backdrop-blur-sm"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Marketplace
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/marketplace" 
                className="text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 px-3 py-2 rounded-lg backdrop-blur-sm"
              >
                Browse Models
              </Link>
              {user && (
                <Link 
                  to={getDashboardPath()} 
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/5 px-3 py-2 rounded-lg backdrop-blur-sm"
                >
                  Developer Hub
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-300 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                  {user.displayName || user.email}
                </span>
                
                {role && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-white/20 to-gray-300/20 backdrop-blur-sm text-white border border-white/20">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                )}

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white backdrop-blur-sm"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-sm">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="bg-gradient-to-r from-white/20 to-gray-300/20 backdrop-blur-sm border border-white/20 text-white hover:from-white/30 hover:to-gray-300/30">
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
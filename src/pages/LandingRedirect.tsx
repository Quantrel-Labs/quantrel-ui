// Component to redirect logged-in users from landing page
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { ROLES } from "@/lib/roles"
import NewLanding from "@/pages/NewLanding"

export default function LandingRedirect() {
  const { user, role, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user && role) {
      // Redirect based on role
      if (role === ROLES.CUSTOMER) {
        navigate("/marketplace", { replace: true })
      } else if (role === ROLES.STORE) {
        navigate("/seller/dashboard", { replace: true })
      } else if (role === ROLES.ADMIN) {
        navigate("/dashboard/admin", { replace: true })
      } else {
        // Fallback for any other roles
        navigate("/dashboard", { replace: true })
      }
    }
  }, [user, role, loading, navigate])

  // Show landing page only if not logged in
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (user) {
    // Return null while redirecting
    return null
  }

  return <NewLanding />
}

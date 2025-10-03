// DOCS: Main dashboard component that routes users based on their role

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { ROLES } from "@/lib/roles"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function Dashboard() {
  const { user, role, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user && role) {
      // Redirect to role-specific dashboard
      switch (role) {
        case ROLES.ADMIN:
          navigate("/dashboard/admin", { replace: true })
          break
        case ROLES.STORE:
          navigate("/dashboard/store", { replace: true })
          break
        case ROLES.CUSTOMER:
          navigate("/dashboard/customer", { replace: true })
          break
        default:
          navigate("/dashboard/customer", { replace: true })
      }
    }
  }, [user, role, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-white">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-white">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
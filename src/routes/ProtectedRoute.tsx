// DOCS: Blocks routes unless user is signed in AND email verified.

import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (!user.emailVerified) return <Navigate to="/verify-email" replace />
  return <>{children}</>
}

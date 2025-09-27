// DOCS: Only allow the provided roles to render children.

import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { hasRole, Role } from "@/lib/roles"

export default function RoleRoute({
  allow,
  children,
}: {
  allow: Role[]
  children: React.ReactNode
}) {
  const { role, loading } = useAuth()
  if (loading) return null
  return hasRole(role, ...allow) ? <>{children}</> : <Navigate to="/" replace />
}

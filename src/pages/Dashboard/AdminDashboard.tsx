// DOCS: Admin dashboard component

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getAllUsers, promoteUserToAdmin, updateUserRole } from "@/services/adminService"
import { ROLES, Role } from "@/lib/roles"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [promoteEmail, setPromoteEmail] = useState("")
  const [isPromoting, setIsPromoting] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    const result = await getAllUsers()
    if (result.success) {
      setUsers(result.users)
    }
    setLoading(false)
  }

  const handlePromoteToAdmin = async () => {
    if (!promoteEmail.trim()) return
    
    setIsPromoting(true)
    const result = await promoteUserToAdmin(promoteEmail)
    
    if (result.success) {
      setMessage("User promoted to admin successfully")
      setPromoteEmail("")
      loadUsers() // Reload users
    } else {
      setMessage(result.error || "Failed to promote user")
    }
    
    setIsPromoting(false)
    setTimeout(() => setMessage(""), 5000)
  }

  const handleRoleChange = async (userId: string, newRole: Role) => {
    const result = await updateUserRole(userId, newRole)
    if (result.success) {
      loadUsers() // Reload users
    }
  }

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      delta: "+12%",
      description: "month over month"
    },
    {
      label: "Store Owners",
      value: users.filter((user) => user.role === ROLES.STORE).length,
      delta: "+8%",
      description: "growing creator network"
    },
    {
      label: "Customers",
      value: users.filter((user) => user.role === ROLES.CUSTOMER).length,
      delta: "+15%",
      description: "active buyers this month"
    },
    {
      label: "Admin Seats",
      value: users.filter((user) => user.role === ROLES.ADMIN).length,
      delta: "",
      description: "core operators"
    }
  ]

  return (
    <section className="min-h-screen bg-black relative space-y-10 px-6 py-10 lg:px-12 pt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-white">Admin control center</h1>
          <p className="mt-2 text-sm text-white/60">
            Monitor growth, elevate trusted creators, and keep your marketplace balanced in real-time.
          </p>
        </div>
        <Button variant="ghost" className="border border-white/15 px-5 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          View audit logs
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden border-white/10 bg-white/5">
            <CardHeader className="relative z-10 space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-500">{stat.label}</p>
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                {stat.delta && <span className="text-white">{stat.delta}</span>}
                <span>{stat.description}</span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-white/5">
          <CardHeader className="space-y-2">
            <CardTitle className="text-white">Promote user to admin</CardTitle>
            <p className="text-xs text-white/60">Elevate a trusted creator or team member to help you manage operations.</p>
          </CardHeader>
          <CardContent className="space-y-5">
            {message && (
              <div
                className={`rounded-2xl border p-3 text-sm ${
                  message.includes("success")
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-red-400/40 bg-red-500/20 text-red-100"
                }`}
              >
                {message}
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="studio@quantrel.ai"
                value={promoteEmail}
                onChange={(e) => setPromoteEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handlePromoteToAdmin} disabled={isPromoting || !promoteEmail.trim()} className="h-12 px-6">
                {isPromoting ? "Promoting…" : "Promote"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.06]">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-white">User management</CardTitle>
            <p className="text-xs text-white/60">Update roles instantly. Changes apply across dashboards in real-time.</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-6">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white/90">{user.displayName || "No Name"}</p>
                      <p className="text-xs text-white/50">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="rounded-full bg-white/10 text-xs font-medium text-white/70">
                        {user.role}
                      </Badge>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                        className="rounded-full border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/80 focus:outline-none"
                      >
                        <option value={ROLES.CUSTOMER}>Customer</option>
                        <option value={ROLES.STORE}>Store</option>
                        <option value={ROLES.ADMIN}>Admin</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
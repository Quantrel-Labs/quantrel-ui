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

  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case ROLES.ADMIN:
        return "bg-red-100 text-red-800"
      case ROLES.STORE:
        return "bg-blue-100 text-blue-800"
      case ROLES.CUSTOMER:
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-green-600">
              <span className="inline-flex items-center">
                ↗ +12% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Store Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(user => user.role === ROLES.STORE).length}
            </div>
            <p className="text-xs text-green-600">
              <span className="inline-flex items-center">
                ↗ +8% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(user => user.role === ROLES.CUSTOMER).length}
            </div>
            <p className="text-xs text-green-600">
              <span className="inline-flex items-center">
                ↗ +15% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(user => user.role === ROLES.ADMIN).length}
            </div>
            <p className="text-xs text-gray-600">
              System administrators
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Promote User to Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {message && (
                <div className={`p-3 text-sm rounded-md ${
                  message.includes("success") 
                    ? "text-green-600 bg-green-50 border border-green-200"
                    : "text-red-600 bg-red-50 border border-red-200"
                }`}>
                  {message}
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter user email"
                  value={promoteEmail}
                  onChange={(e) => setPromoteEmail(e.target.value)}
                />
                <Button 
                  onClick={handlePromoteToAdmin}
                  disabled={isPromoting || !promoteEmail.trim()}
                >
                  {isPromoting ? "Promoting..." : "Promote"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user.displayName || "No Name"}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                        className="text-xs border rounded px-2 py-1"
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
    </div>
  )
}
// DOCS: App route table. Uses ProtectedRoute + RoleRoute for RBAC.

import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import Landing from "@/pages/Landing"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import VerifyEmail from "@/pages/VerifyEmail"
import ProtectedRoute from "@/routes/ProtectedRoute"
import RoleRoute from "@/routes/RolesRoute"
import { ROLES } from "@/lib/roles"
import Dashboard from "@/pages/Dashboard"
import AdminDashboard from "@/pages/Dashboard/AdminDashboard"
import StoreDashboard from "@/pages/Dashboard/StoreDashboard"
import CustomerDashboard from "@/pages/Dashboard/CustomerDashboard"
import MarketplaceListing from "@/pages/MarketplaceListing"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "marketplace", element: <MarketplaceListing /> },

      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admin",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.ADMIN]}>
              <AdminDashboard />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/store",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.STORE]}>
              <StoreDashboard />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/customer",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.CUSTOMER]}>
              <CustomerDashboard />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },
])

// DOCS: App route table. Uses ProtectedRoute + RoleRoute for RBAC.

import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import LandingRedirect from "@/pages/LandingRedirect"
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

// Customer Pages
import Chat from "@/pages/Customer/Chat"
import Marketplace from "@/pages/Customer/Marketplace"
import Billing from "@/pages/Customer/Billing"
import ManageAgents from "@/pages/Customer/ManageAgents"
import AITeams from "@/pages/Customer/AITeams"
import Settings from "@/pages/Customer/Settings"
import SettingsHelp from "@/pages/Customer/SettingsHelp"

// Seller Pages
import SellerDashboard from "@/pages/Seller/SellerDashboard"
import Tools from "@/pages/Seller/Tools"
import SellerBilling from "@/pages/Seller/SellerBilling"
import SellerSettings from "@/pages/Seller/SellerSettings"
import SellerHelp from "@/pages/Seller/SellerHelp"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingRedirect /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verify-email", element: <VerifyEmail /> },

      // Customer Routes
      {
        path: "chat",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.CUSTOMER]}>
              <Chat />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "marketplace",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.CUSTOMER]}>
              <Marketplace />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "billing",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.CUSTOMER]}>
              <Billing />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-agents",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.CUSTOMER]}>
              <ManageAgents />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "ai-teams",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.CUSTOMER]}>
              <AITeams />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.CUSTOMER, ROLES.STORE]}>
              <Settings />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings-help",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.CUSTOMER]}>
              <SettingsHelp />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },

      // Seller Routes
      {
        path: "seller/dashboard",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.STORE]}>
              <SellerDashboard />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "seller/tools",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.STORE]}>
              <Tools />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "seller/billing",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.STORE]}>
              <SellerBilling />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "seller/settings",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.STORE]}>
              <SellerSettings />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "seller/help",
        element: (
          <ProtectedRoute>
            <RoleRoute allow={[ROLES.STORE]}>
              <SellerHelp />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },

      // Legacy Routes (keeping for backwards compatibility)
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

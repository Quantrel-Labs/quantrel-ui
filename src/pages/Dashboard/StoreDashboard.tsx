// DOCS: Store dashboard component

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import LoadingSpinner from "@/components/LoadingSpinner"
import EnhancedProductManagement from "@/components/EnhancedProductManagement"
import { Bot, BarChart3, Settings } from "lucide-react"

export default function StoreDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("products")
  const [storeStats, setStoreStats] = useState({
    products: 24,
    orders: 156,
    revenue: 8432,
    rating: 4.8,
    pendingOrders: 8,
    completedOrders: 148
  })
  const [recentOrders] = useState([
    {
      id: "ORD-001",
      product: "Premium Widget",
      customer: "John Doe",
      amount: 299.99,
      status: "completed",
      date: "Dec 15, 2024"
    },
    {
      id: "ORD-002", 
      product: "Standard Widget",
      customer: "Jane Smith",
      amount: 199.99,
      status: "processing",
      date: "Dec 14, 2024"
    },
    {
      id: "ORD-003",
      product: "Basic Widget",
      customer: "Mike Johnson", 
      amount: 99.99,
      status: "shipped",
      date: "Dec 13, 2024"
    }
  ])

  const [topProducts] = useState([
    { name: "Premium Widget", sales: 45, revenue: 13497.55 },
    { name: "Standard Widget", sales: 32, revenue: 6399.68 },
    { name: "Basic Widget", sales: 28, revenue: 2799.72 },
    { name: "Pro Widget", sales: 22, revenue: 8799.78 }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-white/20 text-white border border-white/30 backdrop-blur-sm"
      case "processing":
        return "bg-white/10 text-gray-300 border border-white/20 backdrop-blur-sm"
      case "shipped":
        return "bg-white/15 text-gray-200 border border-white/25 backdrop-blur-sm"
      case "cancelled":
        return "bg-black/30 text-gray-400 border border-white/10 backdrop-blur-sm"
      default:
        return "bg-white/5 text-gray-300 border border-white/15 backdrop-blur-sm"
    }
  }
  const getTabIcon = (id: string) => {
    switch (id) {
      case "products":
        return <Bot className="w-4 h-4" />
      case "orders":
        return <BarChart3 className="w-4 h-4" />
      case "settings":
        return <Settings className="w-4 h-4" />
      default:
        return <Bot className="w-4 h-4" />
    }
  }

  const tabs = [
    { id: "products", label: "AI Models" },
    { id: "orders", label: "API Usage" },
    { id: "settings", label: "Settings" }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6 pt-24">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Developer Hub</h1>
          <p className="text-gray-400">Welcome back, {user?.displayName || "AI Developer"}!</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="secondary"
            onClick={() => setActiveTab("products")}
          >
            Manage AI Models
          </Button>
          <Button 
            onClick={() => setActiveTab("products")}
          >
            Publish New Model
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-md rounded-t-lg">
        <nav className="flex space-x-8 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "border-white text-white bg-white/10 backdrop-blur-sm px-4 rounded-t-lg"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:border-white/30 hover:bg-white/5 px-4 rounded-t-lg backdrop-blur-sm"
              }`}
            >
              {getTabIcon(tab.id)}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "products" && <EnhancedProductManagement />}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <Card className="hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white">Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Order management features coming soon...</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <Card className="hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white">Store Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Store configuration features coming soon...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
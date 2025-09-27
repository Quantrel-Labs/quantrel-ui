// DOCS: Store dashboard component

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import LoadingSpinner from "@/components/LoadingSpinner"
import EnhancedProductManagement from "@/components/EnhancedProductManagement"

export default function StoreDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
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
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "products", label: "AI Models", icon: "🤖" },
    { id: "orders", label: "API Usage", icon: "�" },
    { id: "analytics", label: "Performance", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">AI Developer Hub</h1>
          <p className="text-gray-400">Welcome back, {user?.displayName || "AI Developer"}!</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setActiveTab("products")}
            className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm"
          >
            Manage AI Models
          </Button>
          <Button 
            onClick={() => setActiveTab("products")}
            className="bg-gradient-to-r from-white/20 to-gray-300/20 backdrop-blur-sm border border-white/20 text-white hover:from-white/30 hover:to-gray-300/30"
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
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-white/5 to-gray-300/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-2xl">
            <h3 className="font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm">Monitor API Usage ({storeStats.pendingOrders})</Button>
              <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm">Update Model Status</Button>
              <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm">View Performance</Button>
              <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm">Developer Support</Button>
            </div>
          </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:bg-white/10 transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-300">AI Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{storeStats.products}</div>
            <p className="text-xs text-gray-400">Published models</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-white/10 transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-300">API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{storeStats.orders}K</div>
            <p className="text-xs text-gray-300">↗ +18% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-white/10 transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-300">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">${storeStats.revenue.toLocaleString()}</div>
            <p className="text-xs text-gray-300">↗ +23% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-white/10 transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-300">Model Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center">
              {storeStats.rating}
              <span className="text-gray-300 ml-1">⭐</span>
            </div>
            <p className="text-xs text-gray-400">From 234 reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="hover:bg-white/10 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Recent Orders</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 hover:scale-102">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white">{order.id}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300">{order.product}</p>
                      <p className="text-xs text-gray-400">Customer: {order.customer}</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">${order.amount}</p>
                      <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="hover:bg-white/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-102">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-white/20 to-gray-300/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

          {/* Performance Metrics */}
          <Card className="hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Store Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/15 hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{storeStats.completedOrders}</div>
                  <p className="text-sm text-gray-300">Completed Orders</p>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm border border-white/15 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{storeStats.pendingOrders}</div>
                  <p className="text-sm text-gray-400">Pending Orders</p>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/15 hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">98%</div>
                  <p className="text-sm text-gray-300">Order Accuracy</p>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm border border-white/15 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">2.3d</div>
                  <p className="text-sm text-gray-400">Avg. Ship Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && <EnhancedProductManagement />}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <Card className="hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Order management features coming soon...</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <Card className="hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Store Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Advanced analytics features coming soon...</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <Card className="hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Store Settings</CardTitle>
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
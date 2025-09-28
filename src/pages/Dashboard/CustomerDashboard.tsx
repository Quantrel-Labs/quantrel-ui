// DOCS: Customer dashboard component

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"

export default function CustomerDashboard() {
  const { user } = useAuth()
  const [customerStats] = useState({
    apiCalls: 12500,
    savedModels: 8,
    credits: 1245,
    savings: 320
  })

  const [recentUsage] = useState([
    {
      id: "API-C001",
      model: "GPT-4 Vision Pro",
      provider: "OpenAI Labs", 
      usage: 2500,
      cost: 75.00,
      status: "active",
      date: "Dec 15, 2024",
      image: "🤖"
    },
    {
      id: "API-C002",
      model: "CodeGen Assistant",
      provider: "DevTools AI",
      usage: 1200,
      cost: 24.00, 
      status: "active",
      date: "Dec 12, 2024",
      image: "�"
    },
    {
      id: "API-C003",
      model: "ImageAnalyzer Pro",
      provider: "VisionTech",
      usage: 800,
      cost: 12.00,
      status: "paused",
      date: "Dec 10, 2024", 
      image: "👁️"
    }
  ])

  const [wishlistItems] = useState([
    {
      name: "Deluxe Widget Pro",
      price: 399.99,
      originalPrice: 499.99,
      store: "Premium Store",
      image: "💎",
      discount: 20
    },
    {
      name: "Smart Widget Hub", 
      price: 249.99,
      originalPrice: 279.99,
      store: "Tech Hub",
      image: "🔌",
      discount: 11
    },
    {
      name: "Widget Accessories Kit",
      price: 79.99,
      originalPrice: 99.99,
      store: "Accessory World",
      image: "🛠️",
      discount: 20
    }
  ])

  const [recommendedProducts] = useState([
    {
      name: "Ultra Widget 2024",
      price: 449.99,
      rating: 4.8,
      reviews: 234,
      store: "Future Tech",
      image: "🚀"
    },
    {
      name: "Eco-Friendly Widget",
      price: 189.99,
      rating: 4.6,
      reviews: 156,
      store: "Green Gadgets", 
      image: "🌱"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Welcome back, {user?.displayName?.split(' ')[0] || "Customer"}! 🤖</h1>
          <p className="text-gray-300">Your AI models and usage dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm">
            Monitor Usage
          </Button>
          <Button className="bg-gradient-to-r from-white/20 to-gray-300/20 backdrop-blur-sm border border-white/20 text-white hover:from-white/30 hover:to-gray-300/30">
            Browse AI Models
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-white/5 to-gray-300/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 shadow-2xl">
        <h3 className="font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">🎯 Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm">
            Try Favorite Models
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm">
            Monitor APIs
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm">
            View Credits
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm">
            Customer Support
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center">
              � API Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.apiCalls.toLocaleString()}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-pink-50 to-pink-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center">
              🤖 Saved Models
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.savedModels}</div>
            <p className="text-xs text-gray-600">Favorited AI models</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center">
              💎 API Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.credits.toLocaleString()}</div>
            <p className="text-xs text-purple-600">≈ ${(customerStats.credits / 100).toFixed(2)} value</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center">
              💰 Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${customerStats.savings}</div>
            <p className="text-xs text-green-600">This year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                � Recent API Usage
              </CardTitle>
              <Button variant="outline" size="sm">View All Usage</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsage.map((usage) => (
                  <div key={usage.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="text-2xl">{usage.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{usage.model}</p>
                        <Badge className={getStatusColor(usage.status)}>
                          {usage.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">By {usage.provider}</p>
                      <p className="text-xs text-gray-500">{usage.date} • {usage.usage.toLocaleString()} calls • ${usage.cost}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button size="sm" variant="outline" className="h-8">
                        Monitor
                      </Button>
                      {usage.status === "active" && (
                        <Button size="sm" variant="ghost" className="h-8 text-xs">
                          Configure
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wishlist */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              ❤️ Wishlist
            </CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wishlistItems.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-xl">{item.image}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">by {item.store}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-500 line-through ml-1">
                          ${item.originalPrice}
                        </span>
                      )}
                      {item.discount && (
                        <Badge className="ml-1 text-xs bg-green-100 text-green-800 border-green-200">
                          -{item.discount}%
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" className="h-8 px-3">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ✨ Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="text-3xl">{product.image}</div>
                <div className="flex-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">by {product.store}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${product.price}</p>
                  <Button size="sm" className="mt-2">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
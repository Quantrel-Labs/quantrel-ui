// DOCS: Customer dashboard component

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/useAuth"
import { Bot, Code, Eye, Wrench, Rocket, Leaf } from "lucide-react"

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
      icon: "bot"
    },
    {
      id: "API-C002",
      model: "CodeGen Assistant",
      provider: "DevTools AI",
      usage: 1200,
      cost: 24.00, 
      status: "active",
      date: "Dec 12, 2024",
      icon: "code"
    },
    {
      id: "API-C003",
      model: "ImageAnalyzer Pro",
      provider: "VisionTech",
      usage: 800,
      cost: 12.00,
      status: "paused",
      date: "Dec 10, 2024", 
      icon: "eye"
    }
  ])

  const [wishlistItems] = useState([
    {
      name: "Deluxe Widget Pro",
      price: 399.99,
      originalPrice: 499.99,
      store: "Premium Store",
      icon: "bot",
      discount: 20
    },
    {
      name: "Smart Widget Hub", 
      price: 249.99,
      originalPrice: 279.99,
      store: "Tech Hub",
      icon: "code",
      discount: 11
    },
    {
      name: "Widget Accessories Kit",
      price: 79.99,
      originalPrice: 99.99,
      store: "Accessory World",
      icon: "wrench",
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
      icon: "rocket"
    },
    {
      name: "Eco-Friendly Widget",
      price: 189.99,
      rating: 4.6,
      reviews: 156,
      store: "Green Gadgets", 
      icon: "leaf"
    }
  ])

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "bot":
        return <Bot className="w-5 h-5" />
      case "code":
        return <Code className="w-5 h-5" />
      case "eye":
        return <Eye className="w-5 h-5" />
      case "wrench":
        return <Wrench className="w-5 h-5" />
      case "rocket":
        return <Rocket className="w-5 h-5" />
      case "leaf":
        return <Leaf className="w-5 h-5" />
      default:
        return <Bot className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-200 border border-emerald-400/40"
      case "paused":
        return "bg-amber-500/20 text-amber-200 border border-amber-400/40"
      case "error":
        return "bg-red-500/20 text-red-200 border border-red-400/40"
      default:
        return "bg-white/10 text-white/70 border border-white/20"
    }
  }

  return (
    <section className="min-h-screen bg-black space-y-10 px-6 py-10 text-white lg:px-12">
      <div className="flex flex-col gap-6 rounded-[32px] border border-white/12 bg-white/[0.04] p-8 shadow-[0_50px_120px_rgba(5,10,45,0.6)] lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Customer dashboard</p>
          <h1 className="text-4xl font-semibold">
            Welcome back, {user?.displayName?.split(" ")[0] || "Creator"}
          </h1>
          <p className="text-sm text-white/65">
            Track your favorite models, monitor API usage, and spin up new agent workflows in minutes.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button className="rounded-full px-5 text-sm font-semibold">Launch workspace</Button>
            <Button variant="ghost" className="rounded-full border border-white/15 px-5 text-sm text-white/70 hover:text-white">
              Browse marketplace
            </Button>
          </div>
        </div>
        <div className="grid gap-3 text-xs text-white/55">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
            <span>Favorite models</span>
            <span className="text-white/75">{customerStats.savedModels}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
            <span>API credits</span>
            <span className="text-white/75">{customerStats.credits.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "API calls",
            value: customerStats.apiCalls.toLocaleString(),
            hint: "This month",
            gradient: "from-[#8a7bff]/40 via-[#5a2cff]/30 to-transparent"
          },
          {
            label: "Saved models",
            value: customerStats.savedModels,
            hint: "Favorites",
            gradient: "from-[#ff3d81]/40 via-[#fb7185]/30 to-transparent"
          },
          {
            label: "Credits",
            value: customerStats.credits.toLocaleString(),
            hint: `≈ $${(customerStats.credits / 100).toFixed(2)}`,
            gradient: "from-[#00f2fe]/40 via-[#4facfe]/30 to-transparent"
          },
          {
            label: "Savings",
            value: `$${customerStats.savings}`,
            hint: "Lifetime",
            gradient: "from-[#fb923c]/40 via-[#f97316]/30 to-transparent"
          }
        ].map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden border-white/12 bg-white/[0.06]">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-70 blur-2xl`} />
            <CardHeader className="relative z-10 space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">{stat.label}</p>
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              <p className="text-xs text-white/55">{stat.hint}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="border-white/10 bg-white/[0.06]">
          <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-white">Recent API usage</CardTitle>
            <Button variant="ghost" className="rounded-full border border-white/15 px-4 text-xs font-semibold text-white/70 hover:text-white">
              View full history
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsage.map((usage) => (
                <div
                  key={usage.id}
                  className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.06] md:flex-row md:items-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
                    {getIcon(usage.icon)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <p className="text-base font-semibold text-white/90">{usage.model}</p>
                      <Badge className={`${getStatusColor(usage.status)} rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]`}> 
                        {usage.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/55">By {usage.provider}</p>
                    <p className="text-xs text-white/45">
                      {usage.date} • {usage.usage.toLocaleString()} calls • ${usage.cost}
                    </p>
                  </div>
                  <div className="flex gap-2 md:flex-col">
                    <Button size="sm" className="rounded-full px-4 text-xs">
                      Monitor
                    </Button>
                    {usage.status === "active" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full border border-white/15 px-4 text-xs text-white/70 hover:text-white"
                      >
                        Configure
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.06]">
          <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-white">Wishlist</CardTitle>
            <Button variant="ghost" size="sm" className="rounded-full border border-white/15 px-4 text-xs text-white/70 hover:text-white">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {wishlistItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white">
                      {getIcon(item.icon)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white/85">{item.name}</p>
                      <p className="text-xs text-white/45">by {item.store}</p>
                    </div>
                    {item.discount && (
                      <Badge className="rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                        -{item.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="space-x-2 text-sm">
                      <span className="font-semibold text-white/85">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-white/40 line-through">${item.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="rounded-full px-4 text-xs">
                      Add to cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-white/[0.06]">
        <CardHeader>
          <CardTitle className="text-white">Recommended for you</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendedProducts.map((product, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-inner transition hover:border-white/20 hover:bg-white/[0.06] md:flex-row md:items-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] text-white">
                  <div className="scale-150">
                    {getIcon(product.icon)}
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-base font-semibold text-white/90">{product.name}</p>
                  <p className="text-sm text-white/55">by {product.store}</p>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-300">★</span>
                      {product.rating}
                    </span>
                    <span>({product.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white/85">${product.price}</p>
                  <Button size="sm" className="mt-2 rounded-full px-4 text-xs">
                    Add to cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
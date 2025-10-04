import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Star, 
  TrendingUp,
  Zap,
  Filter,
  ArrowRight
} from "lucide-react"

interface Agent {
  id: string
  name: string
  description: string
  provider: string
  rating: number
  reviews: number
  priceModel: string
  price: string
  category: string
  icon: string
  trending?: boolean
}

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Text Generation", "Image Analysis", "Code Assistance", "Data Analysis", "Translation"]

  const [agents] = useState<Agent[]>([
    {
      id: "1",
      name: "GPT-4 Turbo",
      description: "Most advanced language model for complex reasoning and creative tasks",
      provider: "OpenAI",
      rating: 4.9,
      reviews: 2341,
      priceModel: "Pay per use",
      price: "$0.01 per 1K tokens",
      category: "Text Generation",
      icon: "",
      trending: true
    },
    {
      id: "2",
      name: "Claude 3 Opus",
      description: "Powerful AI for analysis, content creation, and complex problem-solving",
      provider: "Anthropic",
      rating: 4.8,
      reviews: 1872,
      priceModel: "Pay per use",
      price: "$0.015 per 1K tokens",
      category: "Text Generation",
      icon: "",
      trending: true
    },
    {
      id: "3",
      name: "DALL-E 3",
      description: "Create stunning, high-quality images from text descriptions",
      provider: "OpenAI",
      rating: 4.7,
      reviews: 3421,
      priceModel: "Per image",
      price: "$0.04 per image",
      category: "Image Analysis",
      icon: ""
    },
    {
      id: "4",
      name: "GitHub Copilot",
      description: "AI pair programmer that helps you write better code faster",
      provider: "GitHub",
      rating: 4.8,
      reviews: 5234,
      priceModel: "Subscription",
      price: "$10/month",
      category: "Code Assistance",
      icon: "",
      trending: true
    },
    {
      id: "5",
      name: "Gemini Pro Vision",
      description: "Multimodal AI for understanding images, videos, and text",
      provider: "Google",
      rating: 4.6,
      reviews: 1234,
      priceModel: "Pay per use",
      price: "$0.002 per 1K tokens",
      category: "Image Analysis",
      icon: ""
    },
    {
      id: "6",
      name: "Data Analyst Pro",
      description: "Advanced statistical analysis and data visualization AI",
      provider: "Quantrel",
      rating: 4.7,
      reviews: 892,
      priceModel: "Pay per use",
      price: "$0.05 per query",
      category: "Data Analysis",
      icon: ""
    }
  ])

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || agent.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                AI Marketplace
              </h1>
              <p className="text-xl text-gray-400">
                Discover and integrate the world's best AI tools
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools and agents..."
                  className="w-full h-14 pl-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <Button
                variant="outline"
                className="h-14 px-6 rounded-xl border-white/10 hover:bg-white/5"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-white text-black"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {agent.trending && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/10 text-white border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                </div>
              )}

              <div className="space-y-4">
                {/* Icon & Name */}
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{agent.provider}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {agent.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-medium">{agent.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({agent.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{agent.priceModel}</p>
                      <p className="text-white font-semibold mt-1">{agent.price}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 rounded-xl bg-white text-black hover:bg-gray-100">
                    Try Now
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-xl border-white/10 hover:bg-white/5"
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

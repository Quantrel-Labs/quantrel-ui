import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Star, 
  Filter
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
  logo: string
  trending?: boolean
  installed?: boolean
}

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Text Generation", "Image Analysis", "Code Assistance", "Data Analysis", "Translation"]

  const [agents] = useState<Agent[]>([
    {
      id: "1",
      name: "GPT-4 Turbo",
      description: "Most advanced language model for reasoning",
      provider: "OpenAI",
      rating: 4.9,
      reviews: 2341,
      priceModel: "Pay per use",
      price: "$0.01 per 1K tokens",
      category: "Text Generation",
      logo: "/logos/chatgpt.svg",
      trending: true,
      installed: true
    },
    {
      id: "2",
      name: "Claude 3 Opus",
      description: "Powerful AI for content creation",
      provider: "Anthropic",
      rating: 4.8,
      reviews: 1872,
      priceModel: "Pay per use",
      price: "$0.015 per 1K tokens",
      category: "Text Generation",
      logo: "/logos/anthropic.svg",
      trending: true
    },
    {
      id: "3",
      name: "DALL-E 3",
      description: "Create stunning images from text",
      provider: "OpenAI",
      rating: 4.7,
      reviews: 3421,
      priceModel: "Per image",
      price: "$0.04 per image",
      category: "Image Analysis",
      logo: "/logos/openai.png",
      installed: true
    },
    {
      id: "4",
      name: "Grok AI",
      description: "AI assistant with real-time knowledge",
      provider: "xAI",
      rating: 4.8,
      reviews: 5234,
      priceModel: "Subscription",
      price: "$10/month",
      category: "Text Generation",
      logo: "/logos/grok.png",
      trending: true
    },
    {
      id: "5",
      name: "Gemini Pro",
      description: "Understand images, videos, and text",
      provider: "Google",
      rating: 4.6,
      reviews: 1234,
      priceModel: "Pay per use",
      price: "$0.002 per 1K tokens",
      category: "Image Analysis",
      logo: "/logos/gemini.svg"
    },
    {
      id: "6",
      name: "Perplexity AI",
      description: "AI-powered search and research assistant",
      provider: "Perplexity",
      rating: 4.7,
      reviews: 892,
      priceModel: "Subscription",
      price: "$20/month",
      category: "Text Generation",
      logo: "/logos/perplexity.png"
    },
    {
      id: "7",
      name: "ChatGPT Plus",
      description: "Enhanced conversational AI with plugins",
      provider: "OpenAI",
      rating: 4.8,
      reviews: 1567,
      priceModel: "Subscription",
      price: "$20/month",
      category: "Text Generation",
      logo: "/logos/chatgpt.png"
    },
    {
      id: "8",
      name: "Claude Pro",
      description: "Advanced AI for complex tasks",
      provider: "Anthropic",
      rating: 4.6,
      reviews: 2890,
      priceModel: "Subscription",
      price: "$20/month",
      category: "Text Generation",
      logo: "/logos/claude.png"
    },
    {
      id: "9",
      name: "Gemini Advanced",
      description: "Google's most capable AI model",
      provider: "Google",
      rating: 4.9,
      reviews: 3421,
      priceModel: "Subscription",
      price: "$19.99/month",
      category: "Text Generation",
      logo: "/logos/gemini.png",
      installed: true
    },
    {
      id: "10",
      name: "GPT-4 Vision",
      description: "AI that understands images and text",
      provider: "OpenAI",
      rating: 4.5,
      reviews: 678,
      priceModel: "Pay per use",
      price: "$0.01 per request",
      category: "Image Analysis",
      logo: "/logos/openai.png"
    },
    {
      id: "11",
      name: "Claude Instant",
      description: "Fast and efficient AI assistant",
      provider: "Anthropic",
      rating: 4.7,
      reviews: 1234,
      priceModel: "Pay per use",
      price: "$0.008 per 1K tokens",
      category: "Text Generation",
      logo: "/logos/anthropic.svg"
    },
    {
      id: "12",
      name: "Grok Vision",
      description: "Multimodal AI with image understanding",
      provider: "xAI",
      rating: 4.6,
      reviews: 890,
      priceModel: "Subscription",
      price: "$15/month",
      category: "Image Analysis",
      logo: "/logos/grok.png"
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
      <div className="border-b border-white/[0.08] bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                AI Marketplace
              </h1>
              <p className="text-lg text-gray-400">
                Discover and integrate powerful AI tools into your workflow
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools..."
                  className="w-full h-12 pl-12 rounded-xl bg-[#1a1a1a] border-white/[0.08] text-white placeholder:text-gray-500 text-base focus:border-white/20"
                />
              </div>
              <Button
                variant="outline"
                className="h-12 px-6 rounded-xl border-white/[0.08] hover:bg-[#1a1a1a] hover:border-white/20"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-[#1a1a1a] text-gray-400 hover:bg-[#1f1f1f] hover:text-white border border-white/[0.08]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Grid - Plugin Gallery Style */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => {
            return (
              <div
                key={agent.id}
                className="group relative p-6 rounded-xl bg-[#1a1a1a] border border-white/[0.08] hover:bg-[#1f1f1f] hover:border-white/20 transition-all cursor-pointer"
              >
                {/* Header with Logo and Badge */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/10 border border-white/[0.08] flex items-center justify-center p-2.5 overflow-hidden">
                    <img 
                      src={agent.logo} 
                      alt={agent.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none'
                        const parent = e.currentTarget.parentElement
                        if (parent) {
                          parent.innerHTML = '<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>'
                        }
                      }}
                    />
                  </div>

                  {/* Title and Badge */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white leading-tight">
                        {agent.name}
                      </h3>
                      {agent.installed && (
                        <Badge className="bg-green-600/20 text-green-400 border-0 text-xs px-2.5 py-0.5 h-6 flex-shrink-0 font-medium">
                          Installed
                        </Badge>
                      )}
                      {agent.trending && !agent.installed && (
                        <Badge className="bg-orange-600/20 text-orange-400 border-0 text-xs px-2.5 py-0.5 h-6 flex-shrink-0 font-medium">
                          Trending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[15px] text-gray-400 leading-relaxed mb-4 min-h-[2.5rem]">
                  {agent.description}
                </p>
                
                {/* Footer with Rating and Action */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-white">{agent.rating}</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm text-gray-500">{agent.reviews.toLocaleString()} reviews</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-4 text-sm font-medium text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg"
                  >
                    {agent.installed ? 'Configure' : 'Install'}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-white/[0.08] flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No results found</h3>
            <p className="text-gray-400 text-base">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-16 pt-10 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{agents.length}+</div>
              <div className="text-sm text-gray-400">AI Tools Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {agents.filter(a => a.installed).length}
              </div>
              <div className="text-sm text-gray-400">Currently Installed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {agents.filter(a => a.trending).length}
              </div>
              <div className="text-sm text-gray-400">Trending Now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-sm text-gray-400">Platform Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Star, SlidersHorizontal, X, MessageSquare, Plug, ExternalLink, Code, Zap, BookOpen } from "lucide-react"

interface Plugin {
  id: string
  name: string
  description: string
  logo: string
  developer: string
  rating: number
  reviews: number
  fullDescription?: string
  capabilities?: string[]
  pricing?: string
}

export default function Marketplace() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null)

  const [plugins] = useState<Plugin[]>([
    {
      id: "1",
      name: "GPT-4 Turbo",
      description: "Advanced language model",
      logo: "/logos/chatgpt.png",
      developer: "OpenAI",
      rating: 4.9,
      reviews: 2341,
      fullDescription: "GPT-4 Turbo is OpenAI's most advanced language model, offering enhanced reasoning, coding, and creative capabilities. Perfect for complex tasks requiring deep understanding and nuanced responses.",
      capabilities: ["Text generation", "Code assistance", "Analysis", "Creative writing"],
      pricing: "$0.01 per 1K tokens"
    },
    {
      id: "2",
      name: "Claude 3 Opus",
      description: "Powerful AI assistant",
      logo: "/logos/claude.png",
      developer: "Anthropic",
      rating: 4.8,
      reviews: 1872,
      fullDescription: "Claude 3 Opus excels at complex reasoning, coding, and creative tasks. Built with safety in mind, it provides helpful, harmless, and honest responses.",
      capabilities: ["Long-form content", "Code generation", "Research", "Analysis"],
      pricing: "$0.015 per 1K tokens"
    },
    {
      id: "3",
      name: "Gemini Pro",
      description: "Multimodal AI model",
      logo: "/logos/gemini.png",
      developer: "Google",
      rating: 4.7,
      reviews: 3421,
      fullDescription: "Gemini Pro by Google combines text, image, and video understanding in a single model. Ideal for multimodal tasks and comprehensive analysis.",
      capabilities: ["Multimodal understanding", "Image analysis", "Video processing", "Text generation"],
      pricing: "$0.002 per 1K tokens"
    },
    {
      id: "4",
      name: "Grok AI",
      description: "Real-time knowledge AI",
      logo: "/logos/grok.png",
      developer: "xAI",
      rating: 4.8,
      reviews: 1234,
      fullDescription: "Grok AI provides real-time knowledge and witty responses. Trained on current data, it offers up-to-date information and engaging conversations.",
      capabilities: ["Real-time data", "Conversational AI", "Current events", "Web search"],
      pricing: "$10/month"
    },
    {
      id: "5",
      name: "Perplexity AI",
      description: "AI search assistant",
      logo: "/logos/perplexity.png",
      developer: "Perplexity",
      rating: 4.7,
      reviews: 892,
      fullDescription: "Perplexity AI combines search engine capabilities with conversational AI, providing accurate answers with source citations.",
      capabilities: ["Web search", "Source citations", "Research", "Fact-checking"],
      pricing: "$20/month"
    },
    {
      id: "6",
      name: "ChatGPT Plus",
      description: "Enhanced conversational AI",
      logo: "/logos/chatgpt.png",
      developer: "OpenAI",
      rating: 4.8,
      reviews: 1567,
      fullDescription: "ChatGPT Plus offers priority access to the latest models, faster response times, and exclusive features including plugins and browsing.",
      capabilities: ["Conversational AI", "Plugins", "Web browsing", "Advanced reasoning"],
      pricing: "$20/month"
    },
    {
      id: "7",
      name: "Claude Pro",
      description: "Advanced AI for tasks",
      logo: "/logos/claude.png",
      developer: "Anthropic",
      rating: 4.6,
      reviews: 2890,
      fullDescription: "Claude Pro provides priority access, higher usage limits, and early access to new features. Ideal for professionals requiring extensive AI assistance.",
      capabilities: ["Extended context", "Priority access", "Advanced analysis", "Code generation"],
      pricing: "$20/month"
    },
    {
      id: "8",
      name: "Gemini Advanced",
      description: "Google's capable AI",
      logo: "/logos/gemini.png",
      developer: "Google",
      rating: 4.9,
      reviews: 3421,
      fullDescription: "Gemini Advanced is Google's most capable AI model, offering superior reasoning, coding, and creative capabilities with extended context windows.",
      capabilities: ["Extended reasoning", "Multimodal", "Google integration", "Advanced coding"],
      pricing: "$19.99/month"
    },
    {
      id: "9",
      name: "GPT-4 Vision",
      description: "Image understanding AI",
      logo: "/logos/chatgpt.png",
      developer: "OpenAI",
      rating: 4.5,
      reviews: 678,
      fullDescription: "GPT-4 Vision combines language understanding with visual analysis, enabling comprehensive image interpretation and description.",
      capabilities: ["Image analysis", "Visual reasoning", "OCR", "Chart interpretation"],
      pricing: "$0.01 per request"
    },
    {
      id: "10",
      name: "Claude Instant",
      description: "Fast AI assistant",
      logo: "/logos/claude.png",
      developer: "Anthropic",
      rating: 4.7,
      reviews: 1234,
      fullDescription: "Claude Instant offers fast responses for time-sensitive tasks while maintaining high quality and safety standards.",
      capabilities: ["Fast responses", "Efficient processing", "Cost-effective", "Safe outputs"],
      pricing: "$0.008 per 1K tokens"
    },
    {
      id: "11",
      name: "Grok Vision",
      description: "Multimodal AI",
      logo: "/logos/grok.png",
      developer: "xAI",
      rating: 4.6,
      reviews: 890,
      fullDescription: "Grok Vision extends Grok's capabilities with image understanding, enabling visual analysis alongside conversational AI.",
      capabilities: ["Image understanding", "Real-time data", "Visual reasoning", "Multimodal chat"],
      pricing: "$15/month"
    },
    {
      id: "12",
      name: "Gemini Ultra",
      description: "Most powerful model",
      logo: "/logos/gemini.png",
      developer: "Google",
      rating: 4.8,
      reviews: 2156,
      fullDescription: "Gemini Ultra represents Google's most powerful AI model, designed for highly complex tasks requiring advanced reasoning and multimodal understanding.",
      capabilities: ["Ultra-long context", "Complex reasoning", "Multimodal mastery", "Enterprise-grade"],
      pricing: "$29.99/month"
    }
  ])

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.developer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handlePluginClick = (plugin: Plugin) => {
    setSelectedPlugin(plugin)
  }

  const handleStartChat = () => {
    if (selectedPlugin) {
      // Navigate to chat page with selected plugin
      navigate('/dashboard/chat', { state: { selectedModel: selectedPlugin.name } })
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Minimal Header with Search */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plugins..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#0a0a0a] border-white/[0.06] text-white text-sm placeholder:text-gray-600 focus:border-white/[0.12]"
              />
            </div>
            {/* Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[#0a0a0a] border border-white/[0.06] hover:bg-[#141414] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPlugins.map((plugin) => (
            <div
              key={plugin.id}
              onClick={() => handlePluginClick(plugin)}
              className="group relative p-4 rounded-xl bg-[#000] hover:bg-[#141414] transition-all cursor-pointer"
            >
              {/* Logo and Content */}
              <div className="flex items-start gap-3 mb-3">
                {/* Logo */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#000] border border-white/[0.06] flex items-center justify-center p-1.5 overflow-hidden">
                  <img 
                    src={plugin.logo} 
                    alt={plugin.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white mb-0.5 truncate">
                    {plugin.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {plugin.description}
                  </p>
                </div>
              </div>

              {/* Developer and Rating */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.04]">
                <span className="text-gray-600 truncate">{plugin.developer}</span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-3 h-3 fill-green-500 text-green-500" />
                  <span className="text-gray-400">{plugin.rating}</span>
                  <span className="text-gray-600">({plugin.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlugins.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No plugins found</p>
          </div>
        )}
      </div>

      {/* Detail Modal Overlay */}
      {selectedPlugin && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto"
          onClick={() => setSelectedPlugin(null)}
        >
          <div 
            className="relative w-full max-w-3xl mx-4 my-8 bg-[#0a0a0a] border border-white/[0.08] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlugin(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Header */}
            <div className="p-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-start gap-5">
                {/* Logo */}
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#000] border border-white/[0.08] flex items-center justify-center p-3 overflow-hidden">
                  <img 
                    src={selectedPlugin.logo} 
                    alt={selectedPlugin.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-semibold text-white mb-1">
                    {selectedPlugin.name}
                  </h2>
                  <p className="text-sm text-gray-400 mb-3">
                    by {selectedPlugin.developer}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-green-500 text-green-500" />
                      <span className="text-sm font-medium text-white">{selectedPlugin.rating}</span>
                      <span className="text-sm text-gray-500">({selectedPlugin.reviews} reviews)</span>
                    </div>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-400">{selectedPlugin.pricing}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">About</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedPlugin.fullDescription}
                </p>
              </div>

              {/* Capabilities */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3">Capabilities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedPlugin.capabilities?.map((capability, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#000] border border-white/[0.06]"
                    >
                      <span className="text-sm text-gray-300">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 flex gap-3">
                <Button
                  onClick={handleStartChat}
                  className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-11 bg-transparent border-white/[0.08] hover:bg-white/[0.05] text-white rounded-lg font-medium"
                  onClick={() => {
                    // Show integration options
                  }}
                >
                  <Plug className="w-4 h-4 mr-2" />
                  Integration
                </Button>
              </div>

              {/* Integration Options Preview */}
              <div className="pt-2 space-y-2">
                <button 
                  aria-label="One-Click Integration"
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-[#000] border border-white/[0.06] hover:bg-[#141414] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-green-400" />
                    <div>
                      <div className="text-sm font-medium text-white">One-Click Integration</div>
                      <div className="text-xs text-gray-500">Connect instantly with OAuth</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </button>

                <button 
                  aria-label="API Key Integration"
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-[#000] border border-white/[0.06] hover:bg-[#141414] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-sm font-medium text-white">API Key Integration</div>
                      <div className="text-xs text-gray-500">Use your own API credentials</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </button>

                <button 
                  aria-label="View Documentation"
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-[#000] border border-white/[0.06] hover:bg-[#141414] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-orange-400" />
                    <div>
                      <div className="text-sm font-medium text-white">Documentation</div>
                      <div className="text-xs text-gray-500">View integration guides and API docs</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

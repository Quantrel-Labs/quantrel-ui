import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import { 
  MessageSquare, 
  Send, 
  Plus, 
  Star,
  Clock,
  ChevronDown,
  Paperclip
} from "lucide-react"

interface Chat {
  id: string
  title: string
  lastMessage: string
  timestamp: string
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

interface Agent {
  id: string
  name: string
  description: string
  logo: string
  developer: string
  rating: number
  reviews: number
}

export default function Chat() {
  const navigate = useNavigate()
  
  const [chats] = useState<Chat[]>([
    { id: "1", title: "Product Launch Strategy", lastMessage: "Let me help you with that...", timestamp: "2m ago" },
    { id: "2", title: "Code Review Assistant", lastMessage: "The function looks good but...", timestamp: "1h ago" },
    { id: "3", title: "Marketing Copy Generation", lastMessage: "Here are 5 variations...", timestamp: "3h ago" },
    { id: "4", title: "Data Analysis Query", lastMessage: "Based on your dataset...", timestamp: "1d ago" }
  ])

  const [messages] = useState<Message[]>([])

  const [recommendedAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "GPT-4 Vision",
      description: "Image understanding AI",
      logo: "/logos/chatgpt.png",
      developer: "OpenAI",
      rating: 4.5,
      reviews: 678
    },
    {
      id: "2",
      name: "Code Assistant",
      description: "Expert programming help",
      logo: "/logos/claude.png",
      developer: "Anthropic",
      rating: 4.7,
      reviews: 1234
    },
    {
      id: "3",
      name: "Data Analyst",
      description: "Statistical analysis and insights",
      logo: "/logos/gemini.png",
      developer: "Google",
      rating: 4.8,
      reviews: 2156
    }
  ])

  const handleAgentClick = (agent: Agent) => {
    // Navigate to marketplace or open agent details
    navigate('/dashboard/marketplace')
  }

  const [inputValue, setInputValue] = useState("")
  const [selectedModel, setSelectedModel] = useState("GPT-4 Turbo")
  const [showModelDropdown, setShowModelDropdown] = useState(false)

  const models = [
    { id: "gpt-4-turbo", name: "GPT-4 Turbo", logo: "/logos/chatgpt.png" },
    { id: "claude-3-opus", name: "Claude 3 Opus", logo: "/logos/claude.png" },
    { id: "gemini-pro", name: "Gemini Pro", logo: "/logos/gemini.png" },
    { id: "grok-ai", name: "Grok AI", logo: "/logos/grok.png" },
    { id: "perplexity", name: "Perplexity AI", logo: "/logos/perplexity.png" }
  ]

  return (
    <div className="flex flex-col h-screen bg-black">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Chat History */}
        <div className="w-64 border-r border-white/[0.06] flex flex-col flex-shrink-0 h-full">
        {/* Header */}
        <div className="p-3 border-b border-white/[0.06]">
          <Button className="w-full rounded-lg h-9 bg-blue-800 text-blue-300 hover:bg-blue-600 hover:text-blue-900 font-medium text-sm">
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className="w-full p-2.5 rounded-lg hover:bg-[#0a0a0a] transition-colors text-left group"
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-blue-400 text-xs truncate">
                    {chat.title}
                  </div>
                  <div className="text-xs text-gray-600 truncate mt-0.5">
                    {chat.lastMessage}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-700 mt-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {chat.timestamp}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Center - Chat Interface */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Messages - Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 pb-48">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Start a new conversation</h3>
              <p className="text-sm text-gray-500 text-center max-w-md">
                Choose an AI model and start chatting. Your conversation will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-[#0a0a0a] border border-white/[0.06] flex items-center justify-center flex-shrink-0 p-1">
                      <img 
                        src={models.find(m => m.name === selectedModel)?.logo || "/logos/chatgpt.png"} 
                        alt="AI Assistant"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  
                  <div className={`max-w-2xl ${message.role === "user" ? "order-first" : ""}`}>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.role === "user"
                          ? "bg-white text-black"
                          : "bg-[#0a0a0a] text-white border border-white/[0.06]"
                      }`}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 px-1">{message.timestamp}</p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-[#0a0a0a] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-white/10" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area - Fixed at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent pt-8 pb-6">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex gap-2 items-end relative bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-3 shadow-2xl">
              {/* Model Selector Dropdown */}
              <div className="relative mb-0.5">
                <button
                  onClick={() => setShowModelDropdown(!showModelDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#000] border border-white/[0.06] hover:bg-[#141414] transition-colors"
                >
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <img 
                    src={models.find(m => m.name === selectedModel)?.logo || "/logos/chatgpt.png"} 
                    alt={selectedModel}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs text-white whitespace-nowrap">{selectedModel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              {showModelDropdown && (
                <div className="absolute bottom-full left-0 mb-2 w-56 bg-[#0a0a0a] border border-white/[0.08] rounded-lg shadow-2xl overflow-hidden z-50">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.name)
                        setShowModelDropdown(false)
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-[#141414] transition-colors ${
                        selectedModel === model.name ? 'bg-[#141414]' : ''
                      }`}
                    >
                      <div className="w-5 h-5 rounded bg-[#000] border border-white/[0.06] flex items-center justify-center p-0.5 overflow-hidden">
                        <img 
                          src={model.logo} 
                          alt={model.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs text-white">{model.name}</span>
                      {selectedModel === model.name && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
              </div>

              {/* Input with Attachment */}
              <div className="flex-1 flex flex-col gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="What can I do for you?"
                  className="flex-1 bg-transparent border-0 text-white text-sm placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-transparent px-0"
                />
              </div>

              <div className="flex gap-2 items-center mb-0.5">
                <button 
                  aria-label="Attach file"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#000] border border-white/[0.06] hover:bg-[#141414] transition-colors"
                >
                  <Paperclip className="w-4 h-4 text-gray-400" />
                </button>

                <Button className="h-9 px-4 rounded-xl bg-white text-black hover:bg-gray-100 font-medium">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Suggestions */}
      <div className="w-72 border-l border-white/[0.06] flex flex-col overflow-y-auto flex-shrink-0">
        <div className="p-3">
          <div className="mb-3">
            <h3 className="text-xs font-medium text-white">Recommended Agents</h3>
          </div>

          <div className="space-y-2.5">
            {recommendedAgents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => handleAgentClick(agent)}
                className="p-2.5 rounded-lg bg-[#0a0a0a] hover:bg-[#141414] border border-white/[0.06] transition-all cursor-pointer"
              >
                {/* Logo and Content */}
                <div className="flex items-start gap-2 mb-2">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#000] border border-white/[0.06] flex items-center justify-center p-1.5 overflow-hidden">
                    <img 
                      src={agent.logo} 
                      alt={agent.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-medium text-white mb-0.5 truncate">
                      {agent.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {agent.description}
                    </p>
                  </div>
                </div>

                {/* Developer and Rating */}
                <div className="flex items-center justify-between text-xs pt-1.5 border-t border-white/[0.04]">
                  <span className="text-gray-600 truncate text-xs">{agent.developer}</span>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-2.5 h-2.5 fill-green-500 text-green-500" />
                    <span className="text-gray-400 text-xs">{agent.rating}</span>
                    <span className="text-gray-600 text-xs">({agent.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-5">
            <h4 className="text-xs font-medium text-gray-400 mb-2">Quick Actions</h4>
            <div className="space-y-1.5">
              {["Analyze data", "Write code", "Generate content"].map((action, idx) => (
                <button
                  key={idx}
                  className="w-full p-2 rounded-lg bg-[#0a0a0a] hover:bg-[#141414] text-left text-xs text-gray-400 hover:text-white transition-colors border border-white/[0.06]"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

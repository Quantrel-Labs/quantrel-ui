import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  MessageSquare, 
  Send, 
  Plus, 
  Bot,
  Sparkles,
  Clock
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

export default function Chat() {
  const [chats] = useState<Chat[]>([
    { id: "1", title: "Product Launch Strategy", lastMessage: "Let me help you with that...", timestamp: "2m ago" },
    { id: "2", title: "Code Review Assistant", lastMessage: "The function looks good but...", timestamp: "1h ago" },
    { id: "3", title: "Marketing Copy Generation", lastMessage: "Here are 5 variations...", timestamp: "3h ago" },
    { id: "4", title: "Data Analysis Query", lastMessage: "Based on your dataset...", timestamp: "1d ago" }
  ])

  const [messages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?", timestamp: "10:30 AM" },
    { id: "2", role: "user", content: "I need help analyzing my product metrics", timestamp: "10:31 AM" },
    { id: "3", role: "assistant", content: "I'd be happy to help! Could you share what specific metrics you'd like to analyze? I can help with user engagement, conversion rates, retention, and more.", timestamp: "10:31 AM" }
  ])

  const [recommendedAgents] = useState([
    { name: "GPT-4 Vision", description: "Advanced image and text understanding" },
    { name: "Code Assistant", description: "Expert programming help" },
    { name: "Data Analyst", description: "Statistical analysis and insights" }
  ])

  const [inputValue, setInputValue] = useState("")

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-black">
      {/* Left Sidebar - Chat History */}
      <div className="w-80 border-r border-white/10 flex flex-col bg-white/[0.02]">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <Button className="w-full rounded-xl h-12 bg-white text-black hover:bg-gray-100 font-medium">
            <Plus className="w-5 h-5 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className="w-full p-4 rounded-xl hover:bg-white/5 transition-colors text-left group"
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm truncate group-hover:text-blue-400 transition-colors">
                    {chat.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate mt-1">
                    {chat.lastMessage}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                    <Clock className="w-3 h-3" />
                    {chat.timestamp}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Center - Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
              <p className="text-sm text-gray-400">Always ready to help</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}
            >
              {message.role === "assistant" && (
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div className={`max-w-2xl ${message.role === "user" ? "order-first" : ""}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    message.role === "user"
                      ? "bg-white text-black"
                      : "bg-white/5 text-white border border-white/10"
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2 px-1">{message.timestamp}</p>
              </div>

              {message.role === "user" && (
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-white/20" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10 bg-white/[0.02]">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
            <Button className="h-12 px-6 rounded-xl bg-white text-black hover:bg-gray-100">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Suggestions */}
      <div className="w-80 border-l border-white/10 flex flex-col bg-white/[0.02] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="font-semibold text-white">Recommended Agents</h3>
          </div>

          <div className="space-y-4">
            {recommendedAgents.map((agent, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm">
                      {agent.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {agent.description}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full mt-3 text-white hover:bg-white/5"
                >
                  Try Agent
                </Button>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Quick Actions</h4>
            <div className="space-y-2">
              {["Analyze data", "Write code", "Generate content", "Review document"].map((action, idx) => (
                <button
                  key={idx}
                  className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 text-left text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

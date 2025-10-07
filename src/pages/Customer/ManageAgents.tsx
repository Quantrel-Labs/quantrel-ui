import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Bot,
  Plus,
  Settings as SettingsIcon,
  Key,
  Activity,
  TrendingUp,
  Zap,
  Check,
  ExternalLink,
  Power,
  AlertCircle,
  BarChart3,
  Clock
} from "lucide-react"

interface Agent {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "error"
  logo: string
  isConnected: boolean
  apiKeyConfigured: boolean
  metrics: {
    totalCalls: number
    successRate: number
    avgResponseTime: string
    lastUsed: string
  }
}

export default function ManageAgents() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "ChatGPT",
      description: "OpenAI's advanced language model for natural conversations",
      status: "active",
      logo: "/logos/chatgpt.png",
      isConnected: true,
      apiKeyConfigured: true,
      metrics: {
        totalCalls: 1247,
        successRate: 98.5,
        avgResponseTime: "1.2s",
        lastUsed: "5 minutes ago"
      }
    },
    {
      id: "2",
      name: "Claude",
      description: "Anthropic's AI assistant for complex reasoning tasks",
      status: "active",
      logo: "/logos/claude.png",
      isConnected: true,
      apiKeyConfigured: true,
      metrics: {
        totalCalls: 892,
        successRate: 99.2,
        avgResponseTime: "0.9s",
        lastUsed: "1 hour ago"
      }
    },
    {
      id: "3",
      name: "Gemini",
      description: "Google's multimodal AI for text, images, and more",
      status: "inactive",
      logo: "/logos/gemini.png",
      isConnected: false,
      apiKeyConfigured: false,
      metrics: {
        totalCalls: 0,
        successRate: 0,
        avgResponseTime: "-",
        lastUsed: "Never"
      }
    },
    {
      id: "4",
      name: "Grok",
      description: "xAI's conversational AI with real-time knowledge",
      status: "inactive",
      logo: "/logos/grok.png",
      isConnected: false,
      apiKeyConfigured: false,
      metrics: {
        totalCalls: 0,
        successRate: 0,
        avgResponseTime: "-",
        lastUsed: "Never"
      }
    },
    {
      id: "5",
      name: "Perplexity",
      description: "AI-powered search and research assistant",
      status: "error",
      logo: "/logos/perplexity.png",
      isConnected: true,
      apiKeyConfigured: true,
      metrics: {
        totalCalls: 156,
        successRate: 87.3,
        avgResponseTime: "2.1s",
        lastUsed: "2 days ago"
      }
    }
  ])

  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [apiKey, setApiKey] = useState("")

  const handleConnect = (agent: Agent) => {
    setSelectedAgent(agent)
    setShowApiKeyModal(true)
  }

  const handleSaveApiKey = () => {
    if (selectedAgent && apiKey) {
      setAgents(agents.map(agent => 
        agent.id === selectedAgent.id 
          ? { ...agent, isConnected: true, apiKeyConfigured: true, status: "active" }
          : agent
      ))
      setShowApiKeyModal(false)
      setApiKey("")
      setSelectedAgent(null)
    }
  }

  const handleToggleAgent = (agentId: string) => {
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === "active" ? "inactive" : "active" }
        : agent
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-400 border-green-500/20"
      case "inactive": return "bg-gray-500/10 text-gray-400 border-gray-500/20"
      case "error": return "bg-red-500/10 text-red-400 border-red-500/20"
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen pt-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold">Manage Agents & Tools</h1>
            <Button className="bg-white text-black hover:bg-gray-100">
              <Plus className="w-4 h-4 mr-2" />
              Add New Agent
            </Button>
          </div>
          <p className="text-gray-400 text-lg">
            Configure and monitor your integrated AI agents and tools
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Bot className="w-5 h-5 text-blue-400" />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-400">Total Agents</p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-5 h-5 text-green-400" />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-gray-400">Active Connections</p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold">2,295</p>
            <p className="text-sm text-gray-400">Total API Calls</p>
          </div>
          
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-5 h-5 text-pink-400" />
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold">97.8%</p>
            <p className="text-sm text-gray-400">Avg Success Rate</p>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="space-y-4">
          {agents.map((agent) => (
            <div 
              key={agent.id}
              className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Agent Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {agent.logo ? (
                      <img src={agent.logo} alt={agent.name} className="w-10 h-10 object-contain" />
                    ) : (
                      <Bot className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{agent.name}</h3>
                      <Badge className={`${getStatusColor(agent.status)} border`}>
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-3">{agent.description}</p>
                    
                    {/* Connection Status */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        {agent.apiKeyConfigured ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">API Key Configured</span>
                          </>
                        ) : (
                          <>
                            <Key className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400">No API Key</span>
                          </>
                        )}
                      </div>
                      
                      {agent.status === "error" && (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <span className="text-red-400">Connection Error</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Total Calls</p>
                    <p className="text-lg font-semibold">{agent.metrics.totalCalls.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Success Rate</p>
                    <p className="text-lg font-semibold">{agent.metrics.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Avg Response</p>
                    <p className="text-lg font-semibold">{agent.metrics.avgResponseTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Last Used</p>
                    <p className="text-sm font-semibold">{agent.metrics.lastUsed}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:flex-col lg:items-stretch">
                  {!agent.apiKeyConfigured ? (
                    <Button 
                      onClick={() => handleConnect(agent)}
                      className="bg-white text-black hover:bg-gray-100 flex-1 lg:flex-initial"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline"
                        onClick={() => handleToggleAgent(agent.id)}
                        className="border-white/10 hover:bg-white/5 flex-1 lg:flex-initial"
                      >
                        <Power className="w-4 h-4 mr-2" />
                        {agent.status === "active" ? "Disable" : "Enable"}
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={() => handleConnect(agent)}
                        className="hover:bg-white/5"
                      >
                        <SettingsIcon className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Performance Chart Preview (placeholder) */}
              {agent.isConnected && agent.metrics.totalCalls > 0 && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-300">Performance Overview</h4>
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Details
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                  
                  {/* Simple bar chart visualization */}
                  <div className="h-20 flex items-end gap-2">
                    {[65, 80, 72, 90, 85, 78, 95, 88, 92, 87, 94, 89].map((height, idx) => {
                      const barHeightClass = height > 90 ? 'h-[95%]' : height > 80 ? 'h-[88%]' : height > 70 ? 'h-[78%]' : 'h-[65%]'
                      return (
                        <div 
                          key={idx}
                          className={`flex-1 bg-blue-700 rounded-t ${barHeightClass}`}
                        />
                      )
                    })}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Last 12 hours</span>
                    <span>{agent.metrics.totalCalls} calls</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add New Agent CTA */}
        <div className="mt-8 p-8 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 text-center">
          <Bot className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Need More Agents?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Expand your AI capabilities by integrating additional agents and tools. 
            Connect with various AI providers to suit your specific needs.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100">
            <Plus className="w-4 h-4 mr-2" />
            Browse Available Agents
          </Button>
        </div>
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && selectedAgent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-2">Configure {selectedAgent.name}</h3>
            <p className="text-gray-400 mb-6">
              Enter your API key to connect {selectedAgent.name} to your account
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  API Key
                </label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="h-12 bg-white/5 border-white/10 text-white"
                />
              </div>
              
              <div className="flex items-start gap-2 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-300">
                  Your API key is encrypted and stored securely. We never share your keys with third parties.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowApiKeyModal(false)
                  setApiKey("")
                  setSelectedAgent(null)
                }}
                className="flex-1 border-white/10 hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveApiKey}
                disabled={!apiKey}
                className="flex-1 bg-white text-black hover:bg-gray-100"
              >
                Save & Connect
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

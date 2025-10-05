import { useState } from "react"
import { 
  Plus, 
  Settings, 
  TrendingUp, 
  Activity,
  Power,
  Edit,
  Trash2,
  ExternalLink,
  Code,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Tool {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive' | 'draft'
  requests: number
  revenue: number
  apiKey: string
  createdAt: string
}

export default function Tools() {
  const [tools] = useState<Tool[]>([
    {
      id: "1",
      name: "Code Assistant Pro",
      description: "AI-powered code completion and refactoring tool",
      status: "active",
      requests: 45200,
      revenue: 4520.00,
      apiKey: "sk_live_**********************",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Image Analyzer",
      description: "Advanced image recognition and analysis",
      status: "active",
      requests: 32100,
      revenue: 3210.00,
      apiKey: "sk_live_**********************",
      createdAt: "2024-02-20"
    },
    {
      id: "3",
      name: "Data Processor",
      description: "Process and transform large datasets efficiently",
      status: "inactive",
      requests: 28900,
      revenue: 2890.00,
      apiKey: "sk_live_**********************",
      createdAt: "2024-03-10"
    },
    {
      id: "4",
      name: "Text Generator",
      description: "Generate high-quality text content",
      status: "draft",
      requests: 0,
      revenue: 0,
      apiKey: "sk_test_**********************",
      createdAt: "2024-11-01"
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'inactive':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My Tools
            </h1>
            <p className="text-xl text-gray-400">
              Manage and monitor your AI tools
            </p>
          </div>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Tool
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400 text-sm">Total Tools</span>
            </div>
            <div className="text-3xl font-bold text-white">{tools.length}</div>
          </div>
          
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Power className="w-5 h-5 text-green-400" />
              <span className="text-gray-400 text-sm">Active</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {tools.filter(t => t.status === 'active').length}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400 text-sm">Total Requests</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {tools.reduce((sum, tool) => sum + tool.requests, 0).toLocaleString()}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-gray-400 text-sm">Total Revenue</span>
            </div>
            <div className="text-3xl font-bold text-white">
              ${tools.reduce((sum, tool) => sum + tool.revenue, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Tools List */}
        <div className="space-y-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(tool.status)}`}>
                      {tool.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{tool.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-400">
                        {tool.requests.toLocaleString()} requests
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-400">
                        ${tool.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })} revenue
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-400 font-mono">
                        {tool.apiKey}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              {tool.status === 'active' && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Performance</span>
                    <span>{((tool.requests / 50000) * 100).toFixed(0)}% capacity</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${Math.min((tool.requests / 50000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State (if no tools) */}
        {tools.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tools yet</h3>
            <p className="text-gray-400 mb-6">
              Create your first AI tool to start earning
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Tool
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

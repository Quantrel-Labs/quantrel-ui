import { useState } from "react"
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Zap,
  BarChart3,
  Users,
  Plus,
  ChartBar,
  DollarSignIcon
} from "lucide-react"

export default function SellerDashboard() {
  const [stats] = useState({
    totalRevenue: 12450.80,
    monthlyRevenue: 2340.50,
    totalRequests: 145320,
    activeUsers: 892,
    uptime: 99.97,
    avgResponseTime: 245
  })

  const [revenueData] = useState([
    { month: "Jul", value: 1200 },
    { month: "Aug", value: 1500 },
    { month: "Sep", value: 1800 },
    { month: "Oct", value: 2100 },
    { month: "Nov", value: 1900 },
    { month: "Dec", value: 2340 }
  ])

  const [topTools] = useState([
    { name: "Code Assistant Pro", requests: 45200, revenue: 4520.00, growth: 12 },
    { name: "Image Analyzer", requests: 32100, revenue: 3210.00, growth: 8 },
    { name: "Data Processor", requests: 28900, revenue: 2890.00, growth: -3 },
    { name: "Text Generator", requests: 18400, revenue: 1840.00, growth: 15 }
  ])

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Developer Dashboard
          </h1>
          <p className="text-xl text-gray-400">
            Track your AI tools performance and earnings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Total Revenue */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Total Revenue</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              ${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-green-400">
              <span className="font-medium">↑ 18%</span> from last month
            </p>
          </div>

          {/* Monthly Revenue */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-gray-400 font-medium">This Month</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              ${stats.monthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-gray-500">
              December 2024
            </p>
          </div>

          {/* Total Requests */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Total Requests</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {stats.totalRequests.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">
              All time
            </p>
          </div>

          {/* Active Users */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Active Users</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {stats.activeUsers}
            </div>
            <p className="text-sm text-pink-400">
              <span className="font-medium">↑ 24</span> this week
            </p>
          </div>

          {/* Uptime */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Uptime</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {stats.uptime}%
            </div>
            <p className="text-sm text-cyan-400">
              Last 30 days
            </p>
          </div>

          {/* Response Time */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-gray-400 font-medium">Avg Response</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {stats.avgResponseTime}ms
            </div>
            <p className="text-sm text-green-400">
              <span className="font-medium">↓ 12ms</span> improvement
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Revenue Trend</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                View Details
              </button>
            </div>

            {/* Simple Bar Chart */}
            <div className="space-y-4">
              {revenueData.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{item.month}</span>
                    <span className="text-white font-medium">${item.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(item.value / 2500) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Tools */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Top Tools</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {topTools.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{tool.name}</h3>
                      <p className="text-sm text-gray-400">
                        {tool.requests.toLocaleString()} requests
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">
                        ${tool.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      <p className={`text-sm ${tool.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {tool.growth >= 0 ? '↑' : '↓'} {Math.abs(tool.growth)}%
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500  rounded-full"
                      style={{ width: `${(tool.requests / 50000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 p-8 rounded-2xl  bg-white/[0.02] border border-blue-500/20">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Add New Tool", icon: <Plus/> },
              { label: "Get Help", icon: <ChartBar/> },
              { label: "Manage Payouts", icon: <DollarSignIcon/> }
            ].map((action, idx) => (
              <button
                key={idx}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors text-left group"
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                  {action.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

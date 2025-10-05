import { useState } from "react"
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Activity,
  Users,
  Eye,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  const [metrics] = useState({
    totalRevenue: 12450.80,
    revenueChange: 18.2,
    totalRequests: 145320,
    requestsChange: 12.5,
    uniqueUsers: 892,
    usersChange: 24.1,
    avgResponseTime: 245,
    responseChange: -5.2
  })

  const [revenueData] = useState([
    { date: "Week 1", revenue: 2100, requests: 28000 },
    { date: "Week 2", revenue: 2450, requests: 32000 },
    { date: "Week 3", revenue: 2890, requests: 35200 },
    { date: "Week 4", revenue: 3210, requests: 38100 }
  ])

  const [toolPerformance] = useState([
    { name: "Code Assistant Pro", revenue: 4520, requests: 45200, users: 342, growth: 12 },
    { name: "Image Analyzer", revenue: 3210, requests: 32100, users: 256, growth: 8 },
    { name: "Data Processor", revenue: 2890, requests: 28900, users: 198, growth: -3 },
    { name: "Text Generator", revenue: 1840, requests: 18400, users: 96, growth: 15 }
  ])

  const [geographicData] = useState([
    { region: "North America", revenue: 5420, percentage: 43.5 },
    { region: "Europe", revenue: 3890, percentage: 31.2 },
    { region: "Asia Pacific", revenue: 2210, percentage: 17.8 },
    { region: "Other", revenue: 930, percentage: 7.5 }
  ])

  const timeRanges = [
    { label: "7 Days", value: "7d" as const },
    { label: "30 Days", value: "30d" as const },
    { label: "90 Days", value: "90d" as const },
    { label: "1 Year", value: "1y" as const }
  ]

  const renderMetricChange = (change: number) => {
    const isPositive = change >= 0
    return (
      <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4 inline mr-1" /> : <TrendingDown className="w-4 h-4 inline mr-1" />}
        {Math.abs(change)}%
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Analytics
            </h1>
            <p className="text-xl text-gray-400">
              Deep insights into your tools performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-1 rounded-lg bg-white/[0.05] border border-white/10">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    timeRange === range.value
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="lg"
              className="text-gray-400 hover:text-white"
            >
              <Download className="w-5 h-5 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-400 text-sm">Total Revenue</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ${metrics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            {renderMetricChange(metrics.revenueChange)}
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-gray-400 text-sm">Total Requests</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {metrics.totalRequests.toLocaleString()}
            </div>
            {renderMetricChange(metrics.requestsChange)}
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-gray-400 text-sm">Unique Users</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {metrics.uniqueUsers.toLocaleString()}
            </div>
            {renderMetricChange(metrics.usersChange)}
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-gray-400 text-sm">Avg Response</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {metrics.avgResponseTime}ms
            </div>
            {renderMetricChange(metrics.responseChange)}
          </div>
        </div>

        {/* Revenue Trend Chart */}
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <LineChart className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Revenue & Request Trends</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-400">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm text-gray-400">Requests</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {revenueData.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-medium">{item.date}</span>
                  <div className="flex items-center gap-6">
                    <span className="text-blue-400">${item.revenue.toLocaleString()}</span>
                    <span className="text-purple-400">{item.requests.toLocaleString()} req</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${(item.revenue / 4000) * 100}%` }}
                    />
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all"
                      style={{ width: `${(item.requests / 40000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tool Performance */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Tool Performance</h2>
            </div>

            <div className="space-y-6">
              {toolPerformance.map((tool, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold mb-1">{tool.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          {tool.requests.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {tool.users}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold mb-1">
                        ${tool.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <span className={`text-sm ${tool.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {tool.growth >= 0 ? '↑' : '↓'} {Math.abs(tool.growth)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all"
                      style={{ width: `${(tool.requests / 50000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <PieChart className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Geographic Distribution</h2>
            </div>

            <div className="space-y-6">
              {geographicData.map((geo, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{geo.region}</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        ${geo.revenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {geo.percentage}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${geo.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-medium">Total Revenue</span>
                <span className="text-2xl font-bold text-white">
                  ${geographicData.reduce((sum, geo) => sum + geo.revenue, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Performance Insights</h3>
              <p className="text-gray-400 mb-4">
                Your tools have seen a {metrics.revenueChange}% increase in revenue over the selected period. 
                The Code Assistant Pro is your top performer with {toolPerformance[0].growth}% growth.
                Consider optimizing response times to improve user experience.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <Calendar className="w-4 h-4" />
                <span>Updated {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

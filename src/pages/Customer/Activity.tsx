import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { 
  Activity as ActivityIcon,
  Zap,
  CreditCard,
  Settings,
  UserPlus,
  Shield,
  Clock
} from "lucide-react"

interface ActivityItem {
  id: string
  type: "api_call" | "payment" | "setting_change" | "signup" | "security"
  title: string
  description: string
  timestamp: string
  icon: string
}

export default function Activity() {
  const [activities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "api_call",
      title: "API Request Completed",
      description: "GPT-4 Turbo processed your request successfully",
      timestamp: "2 minutes ago",
      icon: "api_call"
    },
    {
      id: "2",
      type: "payment",
      title: "Credits Added",
      description: "Purchased $100.00 in credits",
      timestamp: "1 hour ago",
      icon: "payment"
    },
    {
      id: "3",
      type: "api_call",
      title: "API Request Completed",
      description: "DALL-E 3 generated 4 images",
      timestamp: "2 hours ago",
      icon: "api_call"
    },
    {
      id: "4",
      type: "setting_change",
      title: "Settings Updated",
      description: "Changed notification preferences",
      timestamp: "5 hours ago",
      icon: "setting_change"
    },
    {
      id: "5",
      type: "security",
      title: "Security Check",
      description: "Two-factor authentication enabled",
      timestamp: "1 day ago",
      icon: "security"
    },
    {
      id: "6",
      type: "api_call",
      title: "API Request Completed",
      description: "Claude 3 processed document analysis",
      timestamp: "1 day ago",
      icon: "api_call"
    },
    {
      id: "7",
      type: "signup",
      title: "Welcome to Quantrel",
      description: "Your account was successfully created",
      timestamp: "3 days ago",
      icon: "signup"
    }
  ])

  const getIconComponent = (type: string) => {
    switch (type) {
      case "api_call":
        return <Zap className="w-5 h-5" />
      case "payment":
        return <CreditCard className="w-5 h-5" />
      case "setting_change":
        return <Settings className="w-5 h-5" />
      case "signup":
        return <UserPlus className="w-5 h-5" />
      case "security":
        return <Shield className="w-5 h-5" />
      default:
        return <ActivityIcon className="w-5 h-5" />
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "api_call":
        return "bg-blue-500/10 text-blue-400"
      case "payment":
        return "bg-green-500/10 text-green-400"
      case "setting_change":
        return "bg-purple-500/10 text-purple-400"
      case "signup":
        return "bg-pink-500/10 text-pink-400"
      case "security":
        return "bg-yellow-500/10 text-yellow-400"
      default:
        return "bg-gray-500/10 text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Activity Feed
          </h1>
          <p className="text-xl text-gray-400">
            Track all your actions and events in one place
          </p>
        </div>

        {/* Activity Timeline */}
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="group relative"
            >
              {/* Connecting Line */}
              {index < activities.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-px bg-white/10" />
              )}

              {/* Activity Card */}
              <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-xl ${getIconColor(activity.type)} flex items-center justify-center flex-shrink-0`}>
                    {getIconComponent(activity.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {activity.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
                        <Clock className="w-4 h-4" />
                        {activity.timestamp}
                      </div>
                    </div>
                    <p className="text-gray-400">
                      {activity.description}
                    </p>

                    {/* Type Badge */}
                    <div className="mt-3">
                      <Badge className="capitalize border border-white/10 text-gray-400 bg-transparent">
                        {activity.type.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium transition-colors">
            Load More Activity
          </button>
        </div>
      </div>
    </div>
  )
}

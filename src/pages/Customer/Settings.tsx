import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  User,
  Mail,
  Shield,
  Bell,
  Key,
  Trash2,
  CheckCircle2
} from "lucide-react"

export default function Settings() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Inc."
  })

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
    apiUsageAlerts: true
  })

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Settings
          </h1>
          <p className="text-xl text-gray-400">
            Manage your account preferences and security
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Profile Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Company
                </label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white"
                />
              </div>

              <Button className="h-12 px-8 rounded-xl bg-white text-black hover:bg-gray-100">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Security</h2>
            </div>

            <div className="space-y-6">
              {/* Password Change */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Password</h3>
                    <p className="text-sm text-gray-400">Change your account password</p>
                  </div>
                  <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">
                    Change Password
                  </Button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Enabled
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">
                    Manage
                  </Button>
                </div>
              </div>

              {/* API Keys */}
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">API Keys</h3>
                    <p className="text-sm text-gray-400">Manage your API access keys</p>
                  </div>
                  <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">
                    <Key className="w-4 h-4 mr-2" />
                    View Keys
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <Bell className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: "emailUpdates", label: "Email Updates", description: "Receive updates about new features and improvements" },
                { key: "marketingEmails", label: "Marketing Emails", description: "Get tips, best practices, and product news" },
                { key: "securityAlerts", label: "Security Alerts", description: "Important notifications about your account security" },
                { key: "apiUsageAlerts", label: "API Usage Alerts", description: "Get notified when you reach usage thresholds" }
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10"
                >
                  <div>
                    <h3 className="text-white font-medium mb-1">{item.label}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setNotifications({
                      ...notifications,
                      [item.key]: !notifications[item.key as keyof typeof notifications]
                    })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications[item.key as keyof typeof notifications]
                        ? "bg-blue-500"
                        : "bg-white/10"
                    }`}
                    aria-label={`Toggle ${item.label}`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                        notifications[item.key as keyof typeof notifications]
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Danger Zone</h2>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Delete Account</h3>
                    <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-xl border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

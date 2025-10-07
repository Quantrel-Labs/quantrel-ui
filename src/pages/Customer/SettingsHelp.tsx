import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/useAuth"
import { updateUserProfile } from "@/services/userService"
import { updateProfile, updateEmail, sendEmailVerification } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { 
  MessageSquare,
  Send,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  Search,
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Video,
  Sparkles,
  Settings,
  User,
  Camera,
  Save,
  Trash2,
  Shield,
  Bell,
  Moon,
  Globe
} from "lucide-react"

interface FeedbackItem {
  id: string
  subject: string
  message: string
  type: "feedback" | "complaint" | "suggestion"
  status: "pending" | "reviewed" | "resolved"
  createdAt: string
}

interface HelpArticle {
  id: string
  title: string
  category: string
  icon: any
  readTime: string
}

export default function SettingsHelp() {
  const { user, profile } = useAuth()
  const [activeTab, setActiveTab] = useState<"settings" | "feedback" | "help" | "support">("settings")
  const [feedbackType, setFeedbackType] = useState<"feedback" | "complaint" | "suggestion">("feedback")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Profile settings state
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [photoURL, setPhotoURL] = useState(profile?.photoURL || user?.photoURL || "")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  
  // Preferences state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState("en")
  
  const [feedbackHistory] = useState<FeedbackItem[]>([
    {
      id: "1",
      subject: "Feature Request: Dark Mode Enhancement",
      message: "Would love to see more color theme options...",
      type: "suggestion",
      status: "reviewed",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      subject: "API Response Time Issue",
      message: "Experiencing slower response times during peak hours...",
      type: "complaint",
      status: "resolved",
      createdAt: "2024-01-10"
    },
    {
      id: "3",
      subject: "Great User Experience",
      message: "The new dashboard redesign is amazing!",
      type: "feedback",
      status: "reviewed",
      createdAt: "2024-01-08"
    }
  ])

  const helpArticles: HelpArticle[] = [
    {
      id: "1",
      title: "Getting Started with AI Agents",
      category: "Quick Start",
      icon: Sparkles,
      readTime: "5 min"
    },
    {
      id: "2",
      title: "Managing API Keys and Integrations",
      category: "Configuration",
      icon: FileText,
      readTime: "8 min"
    },
    {
      id: "3",
      title: "Understanding Billing and Credits",
      category: "Billing",
      icon: FileText,
      readTime: "6 min"
    },
    {
      id: "4",
      title: "Video Tutorial: Creating Your First AI Team",
      category: "Tutorials",
      icon: Video,
      readTime: "12 min"
    },
    {
      id: "5",
      title: "Troubleshooting Common Issues",
      category: "Support",
      icon: FileText,
      readTime: "10 min"
    },
    {
      id: "6",
      title: "Security Best Practices",
      category: "Security",
      icon: FileText,
      readTime: "7 min"
    }
  ]

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ feedbackType, subject, message })
    // Reset form
    setSubject("")
    setMessage("")
  }

  const handleSaveProfile = async () => {
    if (!user) return
    
    setIsSaving(true)
    setSaveMessage("")
    
    try {
      // Update Firebase Auth profile
      if (displayName !== user.displayName) {
        await updateProfile(user, { displayName })
      }
      
      // Update Firestore profile
      await updateUserProfile(user.uid, {
        displayName,
        photoURL: photoURL || null,
      })
      
      setSaveMessage("Profile updated successfully!")
      setIsEditingProfile(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      console.error("Error updating profile:", error)
      setSaveMessage("Failed to update profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePhotoURLChange = (url: string) => {
    setPhotoURL(url)
    setIsEditingProfile(true)
  }

  const handleRemovePhoto = () => {
    setPhotoURL("")
    setIsEditingProfile(true)
  }

  const getAvatarUrl = () => {
    if (photoURL) return photoURL
    if (user?.photoURL) return user.photoURL
    // Fallback to placeholder avatar based on user ID
    if (user?.uid) {
      const avatarIndex = (parseInt(user.uid.slice(0, 8), 16) % 8) + 1
      return `/avatars/a${avatarIndex}.png`
    }
    return '/avatars/a1.png'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Pending</Badge>
      case "reviewed":
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Reviewed</Badge>
      case "resolved":
        return <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Resolved</Badge>
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feedback":
        return <MessageSquare className="w-4 h-4 text-blue-400" />
      case "complaint":
        return <AlertCircle className="w-4 h-4 text-red-400" />
      case "suggestion":
        return <Sparkles className="w-4 h-4 text-purple-400" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pt-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings & Help</h1>
          <p className="text-gray-400 text-lg">
            Get support, submit feedback, and access helpful resources
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-3 font-medium transition-colors relative whitespace-nowrap ${
              activeTab === "settings"
                ? "text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Profile Settings
            {activeTab === "settings" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-6 py-3 font-medium transition-colors relative whitespace-nowrap ${
              activeTab === "feedback"
                ? "text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Feedback & Complaints
            {activeTab === "feedback" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("help")}
            className={`px-6 py-3 font-medium transition-colors relative whitespace-nowrap ${
              activeTab === "help"
                ? "text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Help Center
            {activeTab === "help" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("support")}
            className={`px-6 py-3 font-medium transition-colors relative whitespace-nowrap ${
              activeTab === "support"
                ? "text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Customer Support
            {activeTab === "support" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        </div>

        {/* Profile Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Profile Information */}
            <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Profile Information</h2>
                {!isEditingProfile && (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingProfile(true)}
                    className="border-white/10 hover:bg-white/5"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Picture */}
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/10">
                        <img
                          src={getAvatarUrl()}
                          alt={user?.displayName || "Profile"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/avatars/a1.png'
                          }}
                        />
                      </div>
                      {isEditingProfile && (
                        <button
                          className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                          title="Change photo"
                        >
                          <Camera className="w-5 h-5 text-white" />
                        </button>
                      )}
                    </div>
                    {isEditingProfile && (
                      <div className="w-full space-y-2">
                        <Input
                          value={photoURL}
                          onChange={(e) => handlePhotoURLChange(e.target.value)}
                          placeholder="Profile photo URL"
                          className="h-10 bg-white/5 border-white/10 text-white text-sm"
                        />
                        {photoURL && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleRemovePhoto}
                            className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Photo
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Display Name
                    </label>
                    <Input
                      value={displayName}
                      onChange={(e) => {
                        setDisplayName(e.target.value)
                        setIsEditingProfile(true)
                      }}
                      placeholder="Your display name"
                      className="h-12 bg-white/5 border-white/10 text-white"
                      disabled={!isEditingProfile}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Input
                        value={email}
                        className="h-12 bg-white/5 border-white/10 text-gray-400"
                        disabled
                      />
                      {user?.emailVerified ? (
                        <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    {!user?.emailVerified && (
                      <p className="text-xs text-yellow-400 mt-2">
                        Email not verified. <button className="underline hover:text-yellow-300">Resend verification</button>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      User ID
                    </label>
                    <Input
                      value={user?.uid || ""}
                      className="h-12 bg-white/5 border-white/10 text-gray-400 font-mono text-sm"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Account Role
                    </label>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2 text-sm">
                        {profile?.role?.toUpperCase() || "CUSTOMER"}
                      </Badge>
                    </div>
                  </div>

                  {isEditingProfile && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setDisplayName(user?.displayName || "")
                          setPhotoURL(profile?.photoURL || user?.photoURL || "")
                          setIsEditingProfile(false)
                        }}
                        disabled={isSaving}
                        className="border-white/10 hover:bg-white/5"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {saveMessage && (
                    <div className={`p-4 rounded-lg ${
                      saveMessage.includes("success") 
                        ? "bg-green-500/10 border border-green-500/20 text-green-400" 
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}>
                      <div className="flex items-center gap-2">
                        {saveMessage.includes("success") ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="text-sm font-medium">{saveMessage}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Preferences</h2>
              
              <div className="space-y-6">
                {/* Notifications */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">Notifications</h3>
                  </div>
                  <div className="space-y-4 pl-8">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/10">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive email updates about your account</p>
                      </div>
                      <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        aria-label="Toggle email notifications"
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          emailNotifications ? "bg-blue-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                          emailNotifications ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/10">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-400">Get real-time updates in your browser</p>
                      </div>
                      <button
                        onClick={() => setPushNotifications(!pushNotifications)}
                        aria-label="Toggle push notifications"
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          pushNotifications ? "bg-blue-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                          pushNotifications ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/10">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-400">Receive news and promotional content</p>
                      </div>
                      <button
                        onClick={() => setMarketingEmails(!marketingEmails)}
                        aria-label="Toggle marketing emails"
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          marketingEmails ? "bg-blue-500" : "bg-gray-600"
                        }`}
                      >
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                          marketingEmails ? "translate-x-6" : "translate-x-0.5"
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Appearance */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Moon className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold">Appearance</h3>
                  </div>
                  <div className="pl-8">
                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                      <label className="font-medium mb-3 block">Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => setDarkMode(true)}
                          className={`p-4 rounded-lg border transition-all ${
                            darkMode
                              ? "bg-blue-500/10 border-blue-500/50 text-white"
                              : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <Moon className="w-5 h-5 mx-auto mb-2" />
                          <span className="text-sm">Dark</span>
                        </button>
                        <button
                          onClick={() => setDarkMode(false)}
                          className={`p-4 rounded-lg border transition-all ${
                            !darkMode
                              ? "bg-blue-500/10 border-blue-500/50 text-white"
                              : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <span className="text-2xl mb-2 block">☀️</span>
                          <span className="text-sm">Light</span>
                        </button>
                        <button className="p-4 rounded-lg border bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20 opacity-50 cursor-not-allowed">
                          <span className="text-2xl mb-2 block">🔄</span>
                          <span className="text-sm">Auto</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Language */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold">Language & Region</h3>
                  </div>
                  <div className="pl-8">
                    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                      <label htmlFor="language-select" className="font-medium mb-3 block">Display Language</label>
                      <select
                        id="language-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        aria-label="Select display language"
                        className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-bold">Security</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-gray-400">Update your password regularly for better security</p>
                    </div>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      Update
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      Enable
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-gray-400">Manage devices where you're currently logged in</p>
                    </div>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="p-8 rounded-xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-bold text-red-400">Danger Zone</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Delete Account</p>
                      <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback & Complaints Tab */}
        {activeTab === "feedback" && (
          <div className="space-y-8">
            {/* Submit Feedback Form */}
            <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Submit Feedback or Complaint</h2>
              
              <form onSubmit={handleSubmitFeedback} className="space-y-6">
                {/* Type Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">
                    Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setFeedbackType("feedback")}
                      className={`p-4 rounded-lg border transition-all ${
                        feedbackType === "feedback"
                          ? "bg-blue-500/10 border-blue-500/50 text-white"
                          : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      <MessageSquare className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm font-medium">Feedback</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackType("complaint")}
                      className={`p-4 rounded-lg border transition-all ${
                        feedbackType === "complaint"
                          ? "bg-red-500/10 border-red-500/50 text-white"
                          : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      <AlertCircle className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm font-medium">Complaint</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackType("suggestion")}
                      className={`p-4 rounded-lg border transition-all ${
                        feedbackType === "suggestion"
                          ? "bg-purple-500/10 border-purple-500/50 text-white"
                          : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      <Sparkles className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-sm font-medium">Suggestion</span>
                    </button>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Subject
                  </label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary of your feedback"
                    className="h-12 bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide detailed information..."
                    className="w-full h-40 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-gray-100">
                  <Send className="w-4 h-4 mr-2" />
                  Submit {feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}
                </Button>
              </form>
            </div>

            {/* Feedback History */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Submissions</h2>
              <div className="space-y-3">
                {feedbackHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="font-semibold">{item.subject}</h3>
                            {getStatusBadge(item.status)}
                          </div>
                          <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.message}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{item.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="hover:bg-white/5">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Help Center Tab */}
        {activeTab === "help" && (
          <div className="space-y-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles..."
                className="h-14 pl-12 bg-white/5 border-white/10 text-white text-lg"
              />
            </div>

            {/* Help Articles Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Browse Help Articles</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {helpArticles.map((article) => (
                  <div
                    key={article.id}
                    className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <article.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-gray-400 uppercase tracking-wider">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{article.readTime}</span>
                        </div>
                        <h3 className="font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                          {article.title}
                        </h3>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
                <BookOpen className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Documentation</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Comprehensive guides and API references
                </p>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0">
                  View Docs
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10">
                <Video className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Video Tutorials</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Step-by-step video guides and demos
                </p>
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 p-0">
                  Watch Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-white/10">
                <HelpCircle className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">FAQs</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Answers to commonly asked questions
                </p>
                <Button variant="ghost" className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 p-0">
                  View FAQs
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Customer Support Tab */}
        {activeTab === "support" && (
          <div className="space-y-8">
            {/* Support Options */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Live Chat */}
              <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                  <MessageCircle className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Chat with our support team in real-time
                </p>
                <div className="flex items-center gap-2 mb-6 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Available now</span>
                </div>
                <Button className="w-full bg-white text-black hover:bg-gray-100">
                  Start Chat
                </Button>
              </div>

              {/* Email Support */}
              <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                  <Mail className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Get detailed help via email
                </p>
                <div className="flex items-center gap-2 mb-6 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Response in 24h</span>
                </div>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                  Send Email
                </Button>
              </div>

              {/* Phone Support */}
              <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                <div className="w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6">
                  <Phone className="w-7 h-7 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone Support</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Speak directly with our team
                </p>
                <div className="flex items-center gap-2 mb-6 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Mon-Fri, 9AM-6PM</span>
                </div>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                  Call Now
                </Button>
              </div>
            </div>

            {/* Support Info */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold mb-4">Need Urgent Help?</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our support team is here to help you 24/7. For urgent issues, please use live chat 
                  or call our emergency hotline. We typically respond to all inquiries within 1-2 hours 
                  during business hours.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <p className="font-semibold">support@quantrel.com</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Emergency Hotline</p>
                    <p className="font-semibold">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
              <p className="text-gray-400 mb-6">
                Connect with other users, share experiences, and get help from the community
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord Community
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Community Forum
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  GitHub Discussions
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

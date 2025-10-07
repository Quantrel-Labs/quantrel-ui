import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Store,
  DollarSign
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

export default function SellerHelp() {
  const [activeTab, setActiveTab] = useState<"feedback" | "help" | "support">("feedback")
  const [feedbackType, setFeedbackType] = useState<"feedback" | "complaint" | "suggestion">("feedback")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  
  const [feedbackHistory] = useState<FeedbackItem[]>([
    {
      id: "1",
      subject: "Feature Request: Enhanced Analytics",
      message: "Would love to see more detailed sales analytics...",
      type: "suggestion",
      status: "reviewed",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      subject: "Payment Processing Delay",
      message: "Experiencing delays in receiving payments...",
      type: "complaint",
      status: "resolved",
      createdAt: "2024-01-10"
    },
    {
      id: "3",
      subject: "Great Seller Dashboard",
      message: "The new seller dashboard is very intuitive!",
      type: "feedback",
      status: "reviewed",
      createdAt: "2024-01-08"
    }
  ])

  const helpArticles: HelpArticle[] = [
    {
      id: "1",
      title: "Setting Up Your Store",
      category: "Quick Start",
      icon: Store,
      readTime: "7 min"
    },
    {
      id: "2",
      title: "Listing Your AI Tools & Agents",
      category: "Products",
      icon: Sparkles,
      readTime: "10 min"
    },
    {
      id: "3",
      title: "Understanding Seller Payments",
      category: "Billing",
      icon: DollarSign,
      readTime: "6 min"
    },
    {
      id: "4",
      title: "Video Tutorial: Creating Your First Listing",
      category: "Tutorials",
      icon: Video,
      readTime: "15 min"
    },
    {
      id: "5",
      title: "Best Practices for Successful Sales",
      category: "Tips",
      icon: FileText,
      readTime: "8 min"
    },
    {
      id: "6",
      title: "Managing Customer Reviews & Feedback",
      category: "Support",
      icon: FileText,
      readTime: "5 min"
    }
  ]

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ feedbackType, subject, message })
    // Reset form
    setSubject("")
    setMessage("")
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
          <h1 className="text-4xl font-bold mb-2">Seller Help & Support</h1>
          <p className="text-gray-400 text-lg">
            Get support, submit feedback, and access helpful seller resources
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-6 py-3 font-medium transition-colors relative ${
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
            className={`px-6 py-3 font-medium transition-colors relative ${
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
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === "support"
                ? "text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Seller Support
            {activeTab === "support" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
            )}
          </button>
        </div>

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
                <h3 className="font-bold text-lg mb-2">Seller Documentation</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Comprehensive guides for sellers and store owners
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
                  Step-by-step video guides for selling successfully
                </p>
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 p-0">
                  Watch Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-white/10">
                <HelpCircle className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Seller FAQs</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Answers to frequently asked seller questions
                </p>
                <Button variant="ghost" className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 p-0">
                  View FAQs
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Seller Support Tab */}
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
                  Chat with our seller support team in real-time
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
                <h3 className="text-xl font-bold mb-2">Priority Phone Support</h3>
                <p className="text-gray-400 mb-4 text-sm">
                  Speak directly with seller support
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
                <h2 className="text-2xl font-bold mb-4">Dedicated Seller Support</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  As a valued seller on our platform, you have access to priority support. Our dedicated 
                  seller support team is here to help you 24/7 with store setup, listings, payments, and more. 
                  We typically respond to all seller inquiries within 1 hour during business hours.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Seller Support Email</p>
                    <p className="font-semibold">sellers@quantrel.com</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Priority Hotline</p>
                    <p className="font-semibold">+1 (555) 789-0123</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Community */}
            <div className="p-8 rounded-xl bg-white/[0.02] border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Join the Seller Community</h2>
              <p className="text-gray-400 mb-6">
                Connect with other sellers, share best practices, and learn from successful store owners
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Seller Discord
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Seller Forum
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Success Stories
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

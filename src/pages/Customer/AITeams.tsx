import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Clock,
  Users,
  Mail,
  Sparkles
} from "lucide-react"
import { useState } from "react"

export default function AITeams() {
  const [email, setEmail] = useState("")
  const [idea, setIdea] = useState("")

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle waitlist submission
    console.log("Waitlist:", email)
  }

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle idea submission
    console.log("Idea:", idea)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20">
        {/* Coming Soon Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Under Construction</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">AI Teams &</span>
            <br />
            <span className="text-white">
              AI Manager
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Build collaborative teams of AI agents, managed by an intelligent coordinator that delegates tasks, 
            validates outputs, and prevents hallucinations.
          </p>

          {/* Visual Representation */}
          <div className="relative max-w-4xl mx-auto mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {/* AI Manager - Center */}
              <div className="col-span-2 md:col-start-2 md:col-span-2">
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                  <Users className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">AI Manager</h3>
                  <p className="text-sm text-gray-400">Orchestrates & validates</p>
                </div>
              </div>

              {/* Agent Cards */}
              {[
                { name: "Researcher" },
                { name: "Writer" },
                { name: "Analyst" },
                { name: "Coder" }
              ].map((agent, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                  <p className="text-sm font-medium text-white">{agent.name}</p>
                </div>
              ))}
            </div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 pointer-events-none -z-10">
              <line x1="50%" y1="40%" x2="25%" y2="80%" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="40%" x2="40%" y2="80%" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="40%" x2="60%" y2="80%" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="50%" y1="40%" x2="75%" y2="80%" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>

        {/* Key Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: "Task Delegation",
              description: "AI Manager intelligently distributes work across your agent team"
            },
            {
              title: "Output Validation",
              description: "Automatic quality checks and cross-validation between agents"
            },
            {
              title: "Hallucination Detection",
              description: "Advanced algorithms prevent and flag AI-generated inaccuracies"
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Join Waitlist */}
          <div className="p-10 rounded-2xl bg-white/[0.02] border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Join the Waitlist</h2>
            <p className="text-gray-400 mb-6">
              Be among the first to experience AI Teams when we launch. Get early access and exclusive perks.
            </p>
            
            <form onSubmit={handleWaitlist} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                required
              />
              <Button 
                type="submit"
                className="w-full h-12 rounded-xl bg-white text-black hover:bg-gray-100 font-medium"
              >
                <Mail className="w-4 h-4 mr-2" />
                Join Waitlist
              </Button>
            </form>
          </div>

          {/* Share Your Idea */}
          <div className="p-10 rounded-2xl bg-white/[0.02] border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Share Your Idea</h2>
            <p className="text-gray-400 mb-6">
              Have a use case or feature request? We'd love to hear from you and build what you need.
            </p>
            
            <form onSubmit={handleIdeaSubmit} className="space-y-4">
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your use case or feature idea..."
                className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
              <Button 
                type="submit"
                variant="outline"
                className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 font-medium"
              >
                Submit Idea
              </Button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-20 p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to learn more?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Check out our blog for in-depth articles about AI agent orchestration, 
            team collaboration patterns, and the technology behind AI Teams.
          </p>
          <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
            Read the Documentation
          </Button>
        </div>
      </div>
    </div>
  )
}

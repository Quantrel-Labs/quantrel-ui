import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThermalEffect } from "@/components/ui/thermal-shader"
import { 
  Clock,
  Users,
  Mail,
  Sparkles,
  GitBranch,
  CheckCircle2,
  Shield,
  Zap,
  Brain,
  Target,
  AlertCircle,
  FileCheck
} from "lucide-react"
import { useState, useEffect } from "react"

export default function AITeams() {
  const [email, setEmail] = useState("")
  const [idea, setIdea] = useState("")

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

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
    <div className="relative min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20">
        {/* Thermal Effect Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
          <ThermalEffect 
            logoUrl="/logo.png"
            width={1000}
            height={1000}
            className="scale-150"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-20 w-full">
          {/* Coming Soon Badge */}
          <div className="text-center mb-12 animate-[fadeInUp_0.6s_ease-out]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-300">Under Construction</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold leading-[1.1] tracking-tight text-white animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              AI Teams &<br />AI Manager
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              Build collaborative teams of AI agents, managed by an intelligent coordinator that delegates tasks, 
              validates outputs, and prevents hallucinations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-white text-black hover:bg-gray-100 rounded-xl transition-all"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="w-4 h-4 mr-2" />
                Join Waitlist
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-white/20 text-white hover:bg-white/10 rounded-xl transition-all"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* Visual Architecture Section */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-on-scroll">
              {/* AI Manager - Center */}
              <div className="col-span-2 md:col-start-2 md:col-span-2">
                <div className="p-10 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
                  <Users className="w-14 h-14 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">AI Manager</h3>
                  <p className="text-sm text-gray-400">Orchestrates & validates</p>
                </div>
              </div>

              {/* Agent Cards */}
              {[
                { name: "Researcher", icon: Brain },
                { name: "Writer", icon: FileCheck },
                { name: "Analyst", icon: Target },
                { name: "Coder", icon: Zap }
              ].map((agent, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:bg-white/[0.05] transition-all">
                  <agent.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-white text-center">{agent.name}</p>
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
      </section>

      {/* Key Features Section */}
      <section id="features" className="relative py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight animate-on-scroll">
              Intelligent AI Orchestration
            </h2>
            <p className="text-lg md:text-xl text-gray-400 animate-on-scroll stagger-1">
              Everything you need to build and manage collaborative AI teams
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Task Delegation",
                description: "AI Manager intelligently distributes work across your agent team",
                icon: GitBranch,
                color: "blue"
              },
              {
                title: "Output Validation",
                description: "Automatic quality checks and cross-validation between agents",
                icon: CheckCircle2,
                color: "green"
              },
              {
                title: "Hallucination Detection",
                description: "Advanced algorithms prevent and flag AI-generated inaccuracies",
                icon: AlertCircle,
                color: "pink"
              }
            ].map((feature, idx) => {
              const colorClasses = {
                blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
                green: { bg: 'bg-green-500/10', text: 'text-green-400' },
                pink: { bg: 'bg-pink-500/10', text: 'text-pink-400' }
              }
              const colors = colorClasses[feature.color as keyof typeof colorClasses]
              
              return (
                <div 
                  key={idx} 
                  className={`p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm animate-on-scroll ${idx === 1 ? 'stagger-1' : idx === 2 ? 'stagger-2' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-6`}>
                    <feature.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section id="waitlist" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Join Waitlist */}
            <div className="p-10 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm animate-on-scroll">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Join the Waitlist</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Be among the first to experience AI Teams when we launch. Get early access and exclusive perks.
              </p>
              
              <form onSubmit={handleWaitlist} className="space-y-4">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/50"
                  required
                />
                <Button 
                  type="submit"
                  className="w-full h-12 rounded-xl bg-white text-black hover:bg-gray-100 font-semibold"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join Waitlist
                </Button>
              </form>
            </div>

            {/* Share Your Idea */}
            <div className="p-10 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm animate-on-scroll stagger-1">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Share Your Idea</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Have a use case or feature request? We'd love to hear from you and build what you need.
              </p>
              
              <form onSubmit={handleIdeaSubmit} className="space-y-4">
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Describe your use case or feature idea..."
                  className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  required
                />
                <Button 
                  type="submit"
                  variant="outline"
                  className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 font-semibold text-white"
                >
                  Submit Idea
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 p-12 md:p-16 text-center overflow-hidden animate-on-scroll">
            <div className="relative z-10">
              <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Want to learn more?
              </h3>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Check out our blog for in-depth articles about AI agent orchestration, 
                team collaboration patterns, and the technology behind AI Teams.
              </p>
              <Button 
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-semibold border-white/20 text-white hover:bg-white/10 rounded-xl transition-all"
              >
                Read the Documentation
              </Button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  )
}

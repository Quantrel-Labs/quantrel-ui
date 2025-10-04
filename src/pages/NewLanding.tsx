import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight,
  Code2,
  Lock,
  Network,
  CheckCircle2
} from "lucide-react"

export default function NewLanding() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-sm font-medium text-gray-400">Introducing Quantrel AI Ecosystem</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-white">
              The AI operating system for everyone
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover, integrate, and orchestrate the world's best AI tools in one unified platform. 
              No complexity, just intelligence.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="h-12 px-6 text-sm font-medium bg-white text-black hover:bg-gray-100 rounded-lg"
              >
                <Link to="/register">
                  Get Started Free
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="h-12 px-6 text-sm font-medium border-white/20 hover:bg-white/5 rounded-lg"
              >
                <Link to="/marketplace">
                  Explore Marketplace
                </Link>
              </Button>
            </div>
            
            {/* Trust Badge */}
            <p className="text-sm text-gray-500 pt-4">
              Trusted by 10,000+ developers and growing
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Built for the AI-first future
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to leverage AI, without the friction
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Feature 1 - Single Click Integration */}
            <div className="group relative p-12 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
              <div className="relative space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white">
                  Single-Click Integration
                </h3>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  Embed any AI tool into your product with a simple code snippet. 
                  Our SDK handles all backend communication, authentication, and scaling automatically.
                </p>
                
                <div className="pt-4">
                  <code className="px-4 py-3 rounded-xl bg-black/50 text-sm text-blue-300 font-mono inline-block">
                    &lt;QuantrelEmbed model="gpt-4" /&gt;
                  </code>
                </div>
              </div>
            </div>

            {/* Feature 2 - AI Privacy Shield */}
            <div className="group relative p-12 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
              <div className="relative space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white">
                  AI Data Privacy Shield
                </h3>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  Your data stays secure with our anonymization layer. 
                  We replace sensitive information with placeholders before AI processing.
                </p>
                
                <div className="flex items-center gap-3 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-gray-400 font-medium">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-gray-400 font-medium">SOC 2 Type II</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - AI Teams */}
            <div className="group relative p-12 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
              <div className="relative space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white">
                  AI Teams & Manager
                </h3>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  Orchestrate multiple AI agents that work together. 
                  Our AI Manager delegates tasks, validates outputs, and prevents hallucinations.
                </p>
                
                <div className="space-y-2 pt-4">
                  {["Task delegation", "Output validation", "Hallucination detection"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 4 - AI Appstore */}
            <div className="group relative p-12 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
              <div className="relative space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Network className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white">
                  Unified AI Marketplace
                </h3>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  Access hundreds of AI tools through one platform. 
                  Pay-as-you-go pricing and prepaid credits make AI affordable for everyone.
                </p>
                
                <Button 
                  asChild 
                  variant="ghost" 
                  className="text-gray-400 hover:text-white hover:bg-white/5 p-0 h-auto font-medium"
                >
                  <Link to="/marketplace">
                    Browse Marketplace →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Get started in minutes
            </h2>
            <p className="text-xl text-gray-400">
              No credit card required. Start building with AI today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign up free",
                description: "Create your account and get $10 in free credits to explore the platform"
              },
              {
                step: "02",
                title: "Choose your tools",
                description: "Browse our marketplace and select the AI models that fit your needs"
              },
              {
                step: "03",
                title: "Integrate & build",
                description: "Copy the snippet, paste it in your code, and start building intelligent features"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                {/* Connector Line */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-white/10" />
                )}
                
                <div className="relative p-8 space-y-4">
                  <div className="text-5xl font-bold text-white/10">{item.step}</div>
                  
                  <h3 className="text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="relative p-16 rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden">
            <div className="relative grid md:grid-cols-4 gap-12">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "500+", label: "AI Models" },
                { value: "99.9%", label: "Uptime SLA" },
                { value: "50M+", label: "API Calls/Month" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center space-y-2">
                  <div className="text-5xl md:text-6xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
          <div className="relative p-16 rounded-3xl bg-white/[0.02] border border-white/10">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                Ready to build with AI?
              </h2>
              
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join thousands of developers who are building the future with Quantrel
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="h-12 px-6 text-sm font-medium bg-white text-black hover:bg-gray-100 rounded-lg"
                >
                  <Link to="/register">
                    Start Building Free
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="h-12 px-6 text-sm font-medium border-white/20 hover:bg-white/5 rounded-lg"
                >
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

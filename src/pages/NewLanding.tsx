import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThermalEffect } from "@/components/ui/thermal-shader"
import { useEffect, useRef } from "react"
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

  return (
    <div className="relative bg-black">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden py-20">
        {/* Thermal Effect Background */}
        <div className="absolute opacity-70 pointer-events-none">
          <ThermalEffect 
            logoUrl="/rectangle.png"
            height={800}
            width={800}
            className="scale-150"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            {/* Badge */}
            <div className="animate-[fadeInUp_0.6s_ease-out]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Introducing Quantrel AI Ecosystem</span>
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold leading-[1.1] tracking-tight text-white animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              The AI Appstore for everyone
            </h1>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              Discover, integrate, and orchestrate the world's best AI tools in one unified platform. No complexity, just intelligence.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-white text-black hover:bg-gray-100 rounded-xl transition-all"
              >
                <Link to="/register">
                  Get Started Free
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-white/20 text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <Link to="/marketplace">
                  Explore Marketplace
                </Link>
              </Button>
            </div>
            
            {/* Trust Badge */}
            <p className="text-sm text-gray-500 pt-6 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              Trusted by 10,000+ developers and growing
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="relative py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight animate-on-scroll">
              Built for the AI-first future
            </h2>
            <p className="text-lg md:text-xl text-gray-400 animate-on-scroll stagger-1">
              Everything you need to leverage AI, without the friction
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Feature 1 - Single Click Integration */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm animate-on-scroll stagger-2">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                One-Click Integration
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Connect to ChatGPT, Claude, Gemini, and more with a single click. No API keys, no setup headaches.
              </p>
            </div>

            {/* Feature 2 - Unified Interface */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm animate-on-scroll stagger-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Network className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Unified Interface
              </h3>
              <p className="text-gray-400 leading-relaxed">
                One dashboard to rule them all. Switch between AI models seamlessly without leaving your workflow.
              </p>
            </div>

            {/* Feature 3 - Enterprise Security */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm animate-on-scroll stagger-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Enterprise Security
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Bank-grade encryption, SOC 2 compliant, and fully auditable. Your data stays yours.
              </p>
            </div>

            {/* Feature 4 - Smart Marketplace */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm animate-on-scroll stagger-5">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Smart Marketplace
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Discover and deploy pre-built AI agents from our marketplace. Or build and monetize your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight animate-on-scroll">
              Get started in minutes
            </h2>
            <p className="text-lg md:text-xl text-gray-400 animate-on-scroll stagger-1">
              Three simple steps to AI superpowers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center animate-on-scroll stagger-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Sign Up</h3>
              <p className="text-gray-400">
                Create your account in seconds. No credit card required.
              </p>
            </div>

            <div className="text-center animate-on-scroll stagger-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Connect</h3>
              <p className="text-gray-400">
                Link your favorite AI tools with one-click integrations.
              </p>
            </div>

            <div className="text-center animate-on-scroll stagger-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Create</h3>
              <p className="text-gray-400">
                Start building, automating, and scaling with AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 p-12 md:p-16 text-center overflow-hidden animate-on-scroll">
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Ready to supercharge your AI workflow?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of developers and teams who are building the future with Quantrel.
              </p>
              <Button 
                asChild 
                size="lg"
                className="h-14 px-8 text-base font-semibold bg-white text-black hover:bg-gray-100 rounded-xl transition-all"
              >
                <Link to="/register">
                  Start Free Today <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
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

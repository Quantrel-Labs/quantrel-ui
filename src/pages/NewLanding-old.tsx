import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThermalEffect } from "@/components/ui/thermal-shader"
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
    <div className="relative bg-black">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden py-20">
        {/* Thermal Effect Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
          <ThermalEffect 
            logoUrl="/logo.png"
            width={1000}
            height={1000}
            className="scale-150"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 py-20">
          <motion.div 
            className="max-w-4xl mx-auto text-center space-y-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Introducing Quantrel AI Ecosystem</span>
              </div>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold leading-[1.1] tracking-tight text-white"
              variants={fadeInUp}
            >
              The AI Appstore for everyone
            </motion.h1>
            
            {/* Subheading */}
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Discover, integrate, and orchestrate the world's best AI tools in one unified platform. No complexity, just intelligence.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
              variants={fadeInUp}
            >
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
            </motion.div>
            
            {/* Trust Badge */}
            <motion.p 
              className="text-sm text-gray-500 pt-6"
              variants={fadeInUp}
            >
              Trusted by 10,000+ developers and growing
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="relative py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Section Header */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight"
              variants={fadeInUp}
            >
              Built for the AI-first future
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-400"
              variants={fadeInUp}
            >
              Everything you need to leverage AI, without the friction
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Feature 1 - Single Click Integration */}
            <motion.div 
              className="group relative p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative space-y-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Single-Click Integration
                </h3>
                
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  Embed any AI tool into your product with a simple code snippet. 
                  Our SDK handles all backend communication, authentication, and scaling automatically.
                </p>
                
                <div className="pt-2">
                  <code className="px-4 py-2.5 rounded-lg bg-black/50 text-sm text-blue-300 font-mono inline-block">
                    &lt;QuantrelEmbed model="gpt-4" /&gt;
                  </code>
                </div>
              </div>
            </motion.div>

            {/* Feature 2 - AI Privacy Shield */}
            <motion.div 
              className="group relative p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative space-y-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  AI Data Privacy Shield
                </h3>
                
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  Your data stays secure with our anonymization layer. 
                  We replace sensitive information with placeholders before AI processing.
                </p>
                
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-gray-400 font-medium">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-gray-400 font-medium">SOC 2 Type II</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 3 - AI Teams */}
            <motion.div 
              className="group relative p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative space-y-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  AI Teams & Manager
                </h3>
                
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  Orchestrate multiple AI agents that work together. 
                  Our AI Manager delegates tasks, validates outputs, and prevents hallucinations.
                </p>
                
                <div className="space-y-2 pt-2">
                  {["Task delegation", "Output validation", "Hallucination detection"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="text-sm md:text-base text-gray-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Feature 4 - AI Appstore */}
            <motion.div 
              className="group relative p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative space-y-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Network className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Unified AI Marketplace
                </h3>
                
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  Access hundreds of AI tools through one platform. 
                  Pay-as-you-go pricing and prepaid credits make AI affordable for everyone.
                </p>
                
                <Button 
                  asChild 
                  variant="ghost" 
                  className="text-gray-400 hover:text-white hover:bg-white/5 p-0 h-auto font-medium text-sm md:text-base"
                >
                  <Link to="/marketplace">
                    Browse Marketplace <ArrowRight className="w-4 h-4 ml-1 inline" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-white leading-tight"
              variants={fadeInUp}
            >
              Get started in minutes
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-400"
              variants={fadeInUp}
            >
              No credit card required. Start building with AI today.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
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
              <motion.div 
                key={idx} 
                className="relative"
                variants={fadeInUp}
              >
                {/* Connector Line */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-white/10" />
                )}
                
                <div className="relative p-6 md:p-8 space-y-4">
                  <div className="text-4xl md:text-5xl font-bold text-white/10">{item.step}</div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  
                  <p className="text-base text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div 
            className="relative p-10 md:p-16 rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "500+", label: "AI Models" },
                { value: "99.9%", label: "Uptime SLA" },
                { value: "50M+", label: "API Calls/Month" }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  className="text-center space-y-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base lg:text-lg">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div 
            className="relative p-10 md:p-16 rounded-2xl bg-white/[0.02] border border-white/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="space-y-6 md:space-y-8">
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
                variants={fadeInUp}
              >
                Ready to build with AI?
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
                variants={fadeInUp}
              >
                Join thousands of developers who are building the future with Quantrel
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                variants={fadeInUp}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-white text-black hover:bg-gray-100 rounded-xl transition-all"
                >
                  <Link to="/register">
                    Start Building Free
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-white/20 text-white hover:bg-white/10 rounded-xl transition-all"
                >
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

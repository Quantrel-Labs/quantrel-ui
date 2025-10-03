// DOCS: Landing page component

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

const categoryTags = ["Personal Page", "Landing Page", "Product", "Resource", "Portfolio"]

const featurePanels = [
  {
    title: "Wireframer",
    description: "Skip the blank canvas and spark ideas with Quantrel AI. Generate structure, sections, and copy in seconds.",
    cta: "Try Wireframer",
    color: "from-[#1c1d40] to-[#111326]",
    accent: "bg-[radial-gradient(circle_at_center,_rgba(87,92,255,0.8),_transparent_70%)]"
  },
  {
    title: "Workshop",
    description: "Powerful components, gradients, tabs, and interactions rendered in real-time with zero-code overhead.",
    cta: "Open Workshop",
    color: "from-[#181933] to-[#0f1124]",
    accent: "bg-[radial-gradient(circle_at_top,_rgba(255,61,129,0.6),_transparent_70%)]"
  },
  {
    title: "AI Translate",
    description: "Localize every section of your site with neural translations that stay on brand in minutes.",
    cta: "Try AI Translate",
    color: "from-[#0f1024] to-[#0a0b1a]",
    accent: "bg-[radial-gradient(circle_at_center,_rgba(0,242,254,0.6),_transparent_75%)]"
  }
]

const glowTiles = [
  {
    title: "AI Plugins",
    description: "Bring OpenAI, Anthropic, and Gemini into your workflow with plugins that ship instantly.",
    gradient: "from-[#4facfe]/80 via-[#8a7bff]/70 to-transparent"
  },
  {
    title: "Visual Stack",
    description: "Magnetic gallery sections with cinematic lighting, ideal for showcasing product shots.",
    gradient: "from-[#ff3d81]/80 via-[#fb923c]/70 to-transparent"
  }
]

export default function Landing() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-40 pt-20 sm:pt-32">
        {/* Enhanced background effects */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(circle_at_top,_rgba(0,153,255,0.15),_transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-0 top-64 -z-10 h-[400px] bg-[radial-gradient(circle_at_bottom,_rgba(139,92,246,0.12),_transparent_75%)] blur-3xl" />
        
        <div className="relative mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-12">
          <div className="space-y-12 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-card px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
              <div className="h-2 w-2 rounded-full bg-gradient-primary animate-glow"></div>
              Quantrel AI Site Builder
            </div>
            
            {/* Main heading */}
            <h1 className="font-display text-6xl font-bold leading-[1.02] tracking-tight text-text-primary md:text-7xl lg:text-8xl">
              Never start
              <br />
              <span className="gradient-text">from scratch</span>
            </h1>
            
            <div className="space-y-8 text-xl text-text-secondary leading-relaxed">
              <p className="max-w-2xl">
                Generate stunning product experiences, ship entire marketplaces, and orchestrate AI agents with a canvas that
                understands modern design.
              </p>
              
              {/* Enhanced input */}
              <div className="glass-strong flex items-center gap-4 rounded-3xl px-8 py-6 text-base backdrop-blur-strong border-2 border-glass-border-strong">
                <span className="text-text-muted font-medium">Create a landing page for…</span>
                <input
                  type="text"
                  placeholder="Nova Studio"
                  className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none font-medium"
                />
                <Button size="lg" className="h-12 px-8 text-sm font-bold">Generate</Button>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-3 pt-2">
                {categoryTags.map((tag) => (
                  <span
                    key={tag}
                    className="glass rounded-2xl px-4 py-2 text-xs font-semibold text-text-muted hover:text-text-secondary transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <Button asChild size="xl" className="font-bold">
                  <Link to="/register">Start for free</Link>
                </Button>
                <Button
                  variant="secondary"
                  asChild
                  size="xl"
                  className="font-bold"
                >
                  <Link to="/login">Start with AI</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced demo window */}
          <div className="relative animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.2),_transparent_80%)] blur-3xl" />
            <div className="glass-strong relative overflow-hidden rounded-[40px] border-2 border-glass-border-strong p-8 shadow-glass-xl backdrop-blur-strong">
              <div className="rounded-[32px] border border-glass-border bg-surface-secondary/80 p-8 shadow-inner backdrop-blur-glass">
                {/* Window controls */}
                <div className="flex items-center justify-between text-sm text-text-muted mb-8">
                  <span className="font-medium">Quantrel • AI Canvas</span>
                  <div className="flex gap-3">
                    <span className="h-3 w-3 rounded-full bg-red-400 shadow-lg" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400 shadow-lg" />
                    <span className="h-3 w-3 rounded-full bg-green-400 shadow-lg" />
                  </div>
                </div>
                
                <div className="grid gap-8 md:grid-cols-[0.6fr_1fr]">
                  {/* Left panel - Wireframe */}
                  <div className="space-y-6 glass-card p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <div className="h-4 w-4 rounded bg-white/20" />
                      </div>
                      <p className="font-display font-semibold text-text-primary">Wireframe</p>
                    </div>
                    
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Quantrel AI turns prompts into real layouts with variants, states, and developer-ready code.
                    </p>
                    
                    <div className="glass rounded-3xl p-6 text-sm text-text-secondary border-2 border-glass-border-strong">
                      "Generate a marketplace hero with gradient cards, featured creators, and a subscribe form."
                    </div>
                    
                    <Button className="w-full font-bold bg-white text-black hover:bg-white/90">
                      Design with AI
                    </Button>
                  </div>
                  
                  {/* Right panel - Preview */}
                  <div className="relative overflow-hidden rounded-[32px] border-2 border-glass-border bg-surface-secondary/60 shadow-inner backdrop-blur-glass">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.15),_transparent_80%)]" />
                    <div className="absolute -left-1/4 top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(6,182,212,0.3),_transparent_80%)] blur-2xl" />
                    
                    <div className="relative px-8 py-10 text-text-primary">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-text-muted mb-8">
                        <span>Create Review</span>
                        <span>Nova Studio</span>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="glass-card p-6 hover:scale-[1.02] transition-transform">
                          <p className="font-display font-semibold text-text-primary mb-3">AI Automation</p>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            Nova Studio is a design agency that uses Quantrel to generate interactive flows for clients in hours.
                          </p>
                        </div>
                        
                        <div className="glass-card p-6 hover:scale-[1.02] transition-transform">
                          <p className="font-display font-semibold text-text-primary mb-3">Cookie Banner</p>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            Compliant, editable modals with glassmorphism baked in. Ship it live with one click.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-10 flex gap-4">
                        <Button size="sm" className="bg-white text-black hover:bg-white/90 font-bold">
                          Publish
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="font-bold"
                        >
                          Animate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Feature Panorama */}
      <section className="relative mx-auto max-w-8xl px-6 pb-40 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-12 animate-fade-in-up">
            <div className="space-y-6">
              <h2 className="font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl lg:text-7xl">
                Wired for the
                <br />
                <span className="gradient-text-primary">creative era of AI</span>
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                Every dashboard, marketplace listing, and admin flow has been reimagined with cinematic gradients, glassmorphic
                depth, and tactile interactions that feel alive.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {featurePanels.map((panel, index) => (
                <Card key={panel.title} className="feature-card group animate-fade-in-scale" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardHeader className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow-blue">
                        <div className="h-6 w-6 rounded-lg bg-white/20 backdrop-blur" />
                      </div>
                      <CardTitle className="text-xl font-display font-bold">{panel.title}</CardTitle>
                    </div>
                    <p className="text-text-secondary leading-relaxed">{panel.description}</p>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="secondary" className="font-bold group-hover:scale-105 transition-transform">
                      {panel.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {glowTiles.map((tile, index) => (
              <div
                key={tile.title}
                className="feature-card p-10 group hover:scale-[1.02] transition-all duration-500"
                style={{ animationDelay: `${0.6 + index * 0.2}s` }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="glass px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
                      Featured
                    </span>
                  </div>
                  
                  <h3 className="font-display text-3xl font-bold text-text-primary">{tile.title}</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">{tile.description}</p>
                  
                  <Button variant="secondary" size="lg" className="font-bold group-hover:scale-105 transition-transform">
                    Start with AI
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="relative isolate overflow-hidden py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(0,153,255,0.1),_transparent_70%)] blur-3xl" />
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 text-center lg:px-0 animate-fade-in-up">
          <h2 className="font-display text-5xl font-bold leading-tight text-text-primary md:text-6xl lg:text-7xl">
            The site builder
            <br />
            <span className="gradient-text-accent">that gets design</span>
          </h2>
          <p className="max-w-3xl text-xl text-text-secondary leading-relaxed">
            Deploy role-based dashboards, launch your AI marketplace, and iterate in real-time alongside your team. Quantrel is
            the canvas for ambitious builders.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Button size="xl" className="font-bold">
              Start for free
            </Button>
            <Button variant="secondary" size="xl" className="font-bold">
              Start with AI
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
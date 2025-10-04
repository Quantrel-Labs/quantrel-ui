// DOCS: Landing page component

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

const categoryTags = ["Personal Page", "Landing Page", "Product", "Resource", "Portfolio"]

const featurePanels = [
  {
    title: "Wireframer",
    description: "Skip the blank canvas and spark ideas with Quantrel AI. Generate structure, sections, and copy in seconds.",
    cta: "Try Wireframer"
  },
  {
    title: "Workshop",
    description: "Powerful components, gradients, tabs, and interactions rendered in real-time with zero-code overhead.",
    cta: "Open Workshop"
  },
  {
    title: "AI Translate",
    description: "Localize every section of your site with neural translations that stay on brand in minutes.",
    cta: "Try AI Translate"
  }
]

const glowTiles = [
  {
    title: "AI Plugins",
    description: "Bring OpenAI, Anthropic, and Gemini into your workflow with plugins that ship instantly."
  },
  {
    title: "Visual Stack",
    description: "Magnetic gallery sections with cinematic lighting, ideal for showcasing product shots."
  }
]

export default function Landing() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden pb-40 pt-20 sm:pt-32">
        <div className="relative mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:px-12">
          <div className="space-y-12 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Quantrel AI Site Builder
            </div>
            
            {/* Main heading */}
            <h1 className="font-display text-6xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl lg:text-8xl">
              Never start
              <br />
              <span className="text-white">from scratch</span>
            </h1>
            
            <div className="space-y-8 text-xl text-gray-400 leading-relaxed">
              <p className="max-w-2xl">
                Generate stunning product experiences, ship entire marketplaces, and orchestrate AI agents with a canvas that
                understands modern design.
              </p>
              
              {/* Enhanced input */}
              <div className="flex items-center gap-4 rounded-2xl px-6 py-4 text-base bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-gray-400 font-medium">Create a landing page for…</span>
                <input
                  type="text"
                  placeholder="Nova Studio"
                  className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none font-medium"
                />
                <Button size="lg" className="h-10 px-6 text-sm font-medium">Generate</Button>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-3 pt-2">
                {categoryTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg px-4 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <Button asChild size="xl">
                  <Link to="/register">Start for free</Link>
                </Button>
                <Button
                  variant="secondary"
                  asChild
                  size="xl"
                >
                  <Link to="/login">Start with AI</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced demo window */}
          <div className="relative animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
            <div className="relative overflow-hidden rounded-[40px] border-2 border-white/10 p-8 bg-white/5">
              <div className="rounded-[32px] border border-white/10 bg-black/40 p-8">
                {/* Window controls */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-8">
                  <span className="font-medium">Quantrel • AI Canvas</span>
                  <div className="flex gap-3">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                </div>
                
                <div className="grid gap-8 md:grid-cols-[0.6fr_1fr]">
                  {/* Left panel - Wireframe */}
                  <div className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <div className="h-4 w-4 rounded bg-white/20" />
                      </div>
                      <p className="font-display font-semibold text-white">Wireframe</p>
                    </div>
                    
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Quantrel AI turns prompts into real layouts with variants, states, and developer-ready code.
                    </p>
                    
                    <div className="rounded-2xl p-6 text-sm text-gray-400 bg-white/5 border border-white/10">
                      "Generate a marketplace hero with gradient cards, featured creators, and a subscribe form."
                    </div>
                    
                    <Button className="w-full">
                      Design with AI
                    </Button>
                  </div>
                  
                  {/* Right panel - Preview */}
                  <div className="relative overflow-hidden rounded-[32px] border-2 border-white/10 bg-black/40">
                    <div className="relative px-8 py-10 text-white">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">
                        <span>Create Review</span>
                        <span>Nova Studio</span>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                          <p className="font-display font-semibold text-white mb-3">AI Automation</p>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            Nova Studio is a design agency that uses Quantrel to generate interactive flows for clients in hours.
                          </p>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                          <p className="font-display font-semibold text-white mb-3">Cookie Banner</p>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            Compliant, editable modals with glassmorphism baked in. Ship it live with one click.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-10 flex gap-4">
                        <Button size="sm">
                          Publish
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
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
              <h2 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                Wired for the
                <br />
                <span className="text-white">creative era of AI</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                Every dashboard, marketplace listing, and admin flow has been reimagined with cinematic gradients, glassmorphic
                depth, and tactile interactions that feel alive.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {featurePanels.map((panel, index) => (
                <Card key={panel.title} className="feature-card group animate-fade-in-scale" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardHeader className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                        <div className="h-6 w-6 rounded-lg bg-white/20 backdrop-blur" />
                      </div>
                      <CardTitle className="text-xl font-display font-bold">{panel.title}</CardTitle>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{panel.description}</p>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="secondary">
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
                className="feature-card p-10 group"
                style={{ animationDelay: `${0.6 + index * 0.2}s` }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 bg-white/5 border border-white/10 rounded-lg">
                      Featured
                    </span>
                  </div>
                  
                  <h3 className="font-display text-3xl font-bold text-white">{tile.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{tile.description}</p>
                  
                  <Button variant="secondary" size="lg">
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
          <h2 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            The site builder
            <br />
            <span className="text-white">that gets design</span>
          </h2>
          <p className="max-w-3xl text-xl text-gray-400 leading-relaxed">
            Deploy role-based dashboards, launch your AI marketplace, and iterate in real-time alongside your team. Quantrel is
            the canvas for ambitious builders.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Button size="xl">
              Start for free
            </Button>
            <Button variant="secondary" size="xl">
              Start with AI
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
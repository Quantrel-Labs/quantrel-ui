import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

const footerLinks = {
  product: [
    { label: "AI Marketplace", href: "/marketplace" },
    { label: "AI Teams", href: "/ai-teams" },
    { label: "Privacy Shield", href: "/#privacy" },
    { label: "Pricing", href: "/#pricing" }
  ],
  developers: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api" },
    { label: "Integrations", href: "/integrations" },
    { label: "SDKs", href: "/sdks" }
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" }
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "GDPR", href: "/gdpr" }
  ]
}

const LinkColumn = ({ title, items }: { title: string; items: { label: string; href: string }[] }) => (
  <div>
    <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">{title}</h4>
    <ul className="space-y-3 text-sm text-gray-400">
      {items.map((item) => {
        const isExternal = item.href.startsWith("http")
        const linkClass = cn(
          "inline-flex items-center text-gray-400 transition-colors hover:text-white"
        )

        return (
          <li key={item.label}>
            {isExternal ? (
              <a href={item.href} className={linkClass} target="_blank" rel="noreferrer">
                <span>{item.label}</span>
              </a>
            ) : (
              <Link to={item.href} className={linkClass}>
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  </div>
)

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "relative mt-20 border-t border-white/10 bg-black",
        className
      )}
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-16 md:grid-cols-5 lg:px-12">
        <div className="md:col-span-2">
          <Link to="/" className="relative inline-flex items-center text-2xl font-semibold">
            <span className="text-white">
              Quantrel
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-gray-400">
            The next-generation AI marketplace for creators, builders, and teams. Ship faster with curated tools,
            glassmorphic dashboards, and a cinematic experience across every page.
          </p>
          <div className="mt-8 flex items-center gap-4 text-xs text-gray-500">
            <span>© {new Date().getFullYear()} Quantrel</span>
            <span className="inline-block h-1 w-1 rounded-full bg-gray-600" />
            <Link to="/legal" className="hover:text-gray-300 transition-colors">
              Legal
            </Link>
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>

        <LinkColumn title="Product" items={footerLinks.product} />
        <LinkColumn title="Developers" items={footerLinks.developers} />
        <LinkColumn title="Company" items={footerLinks.company} />
        <LinkColumn title="Legal" items={footerLinks.legal} />
      </div>

      {/* Social Links Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@quantrel.com"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

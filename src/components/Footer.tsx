import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const footerLinks = {
  product: [
    { label: "Overview", href: "/" },
    { label: "Features", href: "/marketplace" },
    { label: "Pricing", href: "/pricing" },
    { label: "Releases", href: "/changelog" }
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" }
  ],
  resources: [
    { label: "Community", href: "/community" },
    { label: "Support", href: "/support" },
    { label: "Documentation", href: "/docs" },
    { label: "Status", href: "/status" }
  ],
  social: [
    { label: "X", href: "https://x.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Dribbble", href: "https://dribbble.com" }
  ]
}

const LinkColumn = ({ title, items }: { title: string; items: { label: string; href: string }[] }) => (
  <div>
    <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">{title}</h4>
    <ul className="space-y-3 text-sm text-white/70">
      {items.map((item) => {
        const isExternal = item.href.startsWith("http")
        const linkClass = cn(
          "group relative inline-flex items-center gap-2 text-white/70 transition-all duration-300 hover:text-white/95"
        )

        return (
          <li key={item.label}>
            {isExternal ? (
              <a href={item.href} className={linkClass} target="_blank" rel="noreferrer">
                <span>{item.label}</span>
                <span className="inline-flex h-1 w-1 rounded-full bg-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            ) : (
              <Link to={item.href} className={linkClass}>
                <span>{item.label}</span>
                <span className="inline-flex h-1 w-1 rounded-full bg-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
        "relative mt-20 border-t border-white/10 bg-transparent/40 backdrop-blur-2xl",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(110,94,255,0.2),_transparent_65%)] before:opacity-60 before:blur-3xl before:content-['']",
        className
      )}
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-16 md:grid-cols-5 lg:px-12">
        <div className="md:col-span-2">
          <Link to="/" className="relative inline-flex items-center text-2xl font-semibold">
            <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
              Quantrel
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/60">
            The next-generation AI marketplace for creators, builders, and teams. Ship faster with curated tools,
            glassmorphic dashboards, and a cinematic experience across every page.
          </p>
          <div className="mt-8 flex items-center gap-4 text-xs text-white/40">
            <span>© {new Date().getFullYear()} Quantrel</span>
            <span className="inline-block h-1 w-1 rounded-full bg-white/30" />
            <Link to="/legal" className="hover:text-white/70">
              Legal
            </Link>
            <Link to="/privacy" className="hover:text-white/70">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white/70">
              Terms
            </Link>
          </div>
        </div>

        <LinkColumn title="Product" items={footerLinks.product} />
        <LinkColumn title="Company" items={footerLinks.company} />
        <LinkColumn title="Resources" items={footerLinks.resources} />
        <LinkColumn title="Social" items={footerLinks.social} />
      </div>
    </footer>
  )
}

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
        <LinkColumn title="Company" items={footerLinks.company} />
        <LinkColumn title="Resources" items={footerLinks.resources} />
        <LinkColumn title="Social" items={footerLinks.social} />
      </div>
    </footer>
  )
}

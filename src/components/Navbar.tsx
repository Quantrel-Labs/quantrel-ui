// DOCS: Main navigation bar with authentication state

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { ROLES } from "@/lib/roles"

export default function Navbar() {
  const { user, role, signOut, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate("/")
  }

  const getDashboardPath = () => {
    if (role === ROLES.CUSTOMER) return "/chat"
    if (role === ROLES.STORE) return "/seller/dashboard"
    if (role === ROLES.ADMIN) return "/dashboard/admin"
    return "/dashboard"
  }

  const getHomePath = () => {
    if (!user) return "/"
    if (role === ROLES.CUSTOMER) return "/marketplace"
    if (role === ROLES.STORE) return "/seller/dashboard"
    if (role === ROLES.ADMIN) return "/dashboard/admin"
    return "/dashboard"
  }

  const getNavLinks = () => {
    if (!user) {
      return [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" }
      ]
    }

    if (role === ROLES.CUSTOMER) {
      return [
        { label: "Chat", href: "/chat" },
        { label: "Marketplace", href: "/marketplace" },
        { label: "AI Teams", href: "/ai-teams" },
        { label: "Billing", href: "/billing" },
        { label: "Activity", href: "/activity" }
      ]
    }

    if (role === ROLES.STORE) {
      return [
        { label: "Dashboard", href: "/seller/dashboard" },
        { label: "Tools", href: "/seller/tools" },
        { label: "Analytics", href: "/seller/analytics" },
        { label: "Billing", href: "/seller/billing" }
      ]
    }

    return []
  }

  const navLinks = getNavLinks()

  const renderAuthSection = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-3">
          <div className="h-10 w-24 animate-pulse rounded-lg bg-white/[0.05]" />
          <div className="h-10 w-28 animate-pulse rounded-lg bg-white/[0.05]" />
        </div>
      )
    }

    if (user) {
      return (
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right text-sm">
            <span className="font-medium text-white">{user.displayName || user.email}</span>
            {role && <span className="text-xs uppercase tracking-wider text-gray-400">{role}</span>}
          </div>
          <Button
            variant="ghost"
            size="default"
            onClick={handleSignOut}
            className="font-medium text-white"
          >
            Sign Out
          </Button>
          <Button
            size="default"
            asChild
          >
            <Link to={getDashboardPath()}>Dashboard</Link>
          </Button>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="default"
          asChild
          className="font-medium text-white"
        >
          <Link to="/login">Login</Link>
        </Button>
        <Button
          size="default"
          asChild
        >
          <Link to="/register">Sign up</Link>
        </Button>
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/[0.05]">
      <div className="relative py-4">
        <nav className="relative mx-auto max-w-7xl px-8 flex h-16 items-center justify-between text-sm">
          <Link to={getHomePath()} className="flex items-center gap-3 text-xl font-display font-semibold text-white hover:opacity-80 transition-opacity">
            <div className="relative h-10 w-10 rounded-xl overflow-hidden  flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Quantrel Logo" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Fallback to gradient with Q if image fails to load
                  e.currentTarget.style.display = 'none'
                  const parent = e.currentTarget.parentElement
                  if (parent) {
                    parent.innerHTML = '<span class="flex items-center justify-center h-full w-full text-base font-bold text-white">Q</span>'
                  }
                }}
              />
            </div>
            <span className="hidden sm:inline-block">
              Quantrel
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`transition duration-300 font-medium ${
                  location.pathname === link.href
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex">{renderAuthSection()}</div>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="mx-6 mt-4 rounded-2xl bg-black border border-white/[0.05] p-6 md:hidden">
          <div className="space-y-6">
            <div className="grid gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    location.pathname === link.href
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/[0.02] hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.05]">{renderAuthSection()}</div>
          </div>
        </div>
      )}
    </header>
  )
}
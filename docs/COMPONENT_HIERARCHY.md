# Framer-Inspired Component Hierarchy

## Design System Architecture

This document outlines the hierarchical structure of components following Framer's design principles.

```
┌─────────────────────────────────────────────────────────────┐
│                       DESIGN SYSTEM                          │
│                   (Tailwind Config + Base CSS)              │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬────────────────┐
        │              │               │                 │
┌───────▼────────┐ ┌──▼─────────┐ ┌──▼───────────┐ ┌──▼─────────┐
│   FOUNDATIONS  │ │   TOKENS   │ │  ANIMATIONS  │ │  UTILITIES │
│                │ │            │ │              │ │            │
│ - Typography   │ │ - Colors   │ │ - Keyframes  │ │ - Glass    │
│ - Spacing      │ │ - Shadows  │ │ - Transitions│ │ - Gradient │
│ - Breakpoints  │ │ - Blur     │ │ - Easing     │ │ - Text FX  │
└────────────────┘ └────────────┘ └──────────────┘ └────────────┘
        │              │               │                 │
        └──────────────┴───────────────┴─────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   BASE COMPONENTS   │
                    │   (UI Primitives)   │
                    └──────────┬──────────┘
                               │
        ┌──────────┬───────────┼───────────┬──────────┐
        │          │           │           │          │
   ┌────▼────┐ ┌──▼──┐  ┌─────▼─────┐ ┌──▼───┐ ┌───▼────┐
   │ Button  │ │Input│  │   Card    │ │ Badge│ │ Avatar │
   └─────────┘ └─────┘  └───────────┘ └──────┘ └────────┘
        │          │           │           │          │
        └──────────┴───────────┴───────────┴──────────┘
                              │
                    ┌─────────▼──────────┐
                    │ COMPOSITE COMPONENTS│
                    │  (Feature Modules)  │
                    └──────────┬──────────┘
                               │
        ┌──────────┬───────────┼───────────┬──────────┐
        │          │           │           │          │
   ┌────▼────┐ ┌──▼──────┐ ┌─▼──────┐ ┌──▼─────┐ ┌──▼─────┐
   │ Navbar  │ │  Hero   │ │FeatureCard│ Footer│ │  Form  │
   └─────────┘ └─────────┘ └────────┘ └────────┘ └────────┘
        │          │           │           │          │
        └──────────┴───────────┴───────────┴──────────┘
                              │
                    ┌─────────▼──────────┐
                    │   PAGE LAYOUTS      │
                    │   (Full Pages)      │
                    └──────────┬──────────┘
                               │
        ┌──────────┬───────────┼───────────┬──────────┐
        │          │           │           │          │
   ┌────▼────┐ ┌──▼──────┐ ┌─▼────────┐ ┌▼────────┐ ┌▼────────┐
   │ Landing │ │Dashboard│ │Marketplace│ │  Login  │ │Register │
   └─────────┘ └─────────┘ └──────────┘ └─────────┘ └─────────┘
```

---

## 1. FOUNDATIONS LAYER

### Typography Hierarchy
```tsx
// Display (Hero Headings)
className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight"

// H1
className="font-display text-5xl md:text-6xl font-bold leading-tight"

// H2
className="font-display text-4xl md:text-5xl font-bold leading-tight"

// H3
className="font-display text-3xl md:text-4xl font-semibold"

// H4
className="font-display text-2xl md:text-3xl font-semibold"

// Body Large
className="text-xl text-white/80 leading-relaxed"

// Body
className="text-base text-white/70 leading-relaxed"

// Small
className="text-sm text-white/60"

// Caption
className="text-xs text-white/50 uppercase tracking-[0.2em]"
```

### Spacing Scale
```tsx
// Micro: 4px, 8px, 12px
gap-1, gap-2, gap-3

// Small: 16px, 20px, 24px
gap-4, gap-5, gap-6

// Medium: 32px, 40px, 48px
gap-8, gap-10, gap-12

// Large: 64px, 80px, 96px
gap-16, gap-20, gap-24

// XL: 128px, 160px, 192px
gap-32, gap-40, gap-48
```

---

## 2. TOKENS LAYER

### Color Tokens
```typescript
// Semantic Colors
const tokens = {
  surface: {
    primary: 'bg-black',
    secondary: 'bg-slate-900/50',
    tertiary: 'bg-slate-800/30',
  },
  text: {
    primary: 'text-white',
    secondary: 'text-white/80',
    muted: 'text-white/60',
    accent: 'text-blue-500',
  },
  border: {
    default: 'border-white/10',
    subtle: 'border-white/5',
    strong: 'border-white/20',
  },
  glass: {
    bg: 'bg-slate-900/40',
    border: 'border-white/15',
    shadow: 'shadow-glass',
  }
}
```

### Gradient Tokens
```typescript
const gradients = {
  primary: 'bg-gradient-to-r from-[#0099ff] via-[#8b5cf6] to-[#ec4899]',
  secondary: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600',
  accent: 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500',
  surface: 'bg-gradient-to-br from-slate-900/90 to-slate-800/70',
  glass: 'bg-gradient-to-br from-slate-900/60 to-slate-800/40',
}
```

---

## 3. ANIMATIONS LAYER

### Animation Presets
```tsx
// Fade In Up (Hero Elements)
className="animate-fade-in-up"

// Fade In Scale (Cards)
className="animate-fade-in-scale"

// Float (Decorative Elements)
className="animate-float"

// Glow (Interactive Elements)
className="transition-shadow duration-300 hover:animate-glow"

// Shimmer (Loading States)
className="relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:animate-shimmer"
```

### Transition Presets
```tsx
// Quick: UI Feedback
className="transition-all duration-200"

// Standard: Most Interactions
className="transition-all duration-300"

// Smooth: Card Hovers
className="transition-all duration-[400ms]"

// Slow: Complex Animations
className="transition-all duration-500"

// Easing
className="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
```

---

## 4. UTILITIES LAYER

### Glass Utility Classes
```tsx
// Basic Glass
const glass = "bg-slate-900/40 backdrop-blur-glass border border-white/15 shadow-glass rounded-2xl"

// Strong Glass
const glassStrong = "bg-slate-900/70 backdrop-blur-strong border border-white/30 shadow-glass-xl rounded-2xl"

// Glass Card (Interactive)
const glassCard = `
  bg-gradient-to-br from-slate-900/60 to-slate-800/40 
  backdrop-blur-[50px] 
  border border-white/15 
  shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] 
  rounded-3xl 
  transition-all duration-[400ms] 
  hover:-translate-y-1 hover:scale-[1.01] 
  hover:shadow-[0_35px_80px_-20px_rgba(0,0,0,0.6)]
  relative overflow-hidden
  before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 
  before:h-px before:bg-gradient-to-r before:from-transparent 
  before:via-white/20 before:to-transparent
`.replace(/\s+/g, ' ').trim()
```

### Gradient Text Utilities
```tsx
const gradientText = {
  default: "bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent",
  primary: "bg-gradient-to-r from-[#0099ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent",
  accent: "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent",
}
```

---

## 5. BASE COMPONENTS

### Button Component
```tsx
// src/components/ui/button-variants.ts
export const buttonVariants = {
  // Primary: Gradient with glow
  primary: `
    px-6 py-3 md:px-8 md:py-4
    bg-gradient-to-r from-[#0099ff] via-[#8b5cf6] to-[#ec4899]
    border border-white/10
    text-white font-bold rounded-2xl
    shadow-[0_8px_32px_rgba(0,153,255,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]
    transition-all duration-300
    hover:-translate-y-0.5 hover:scale-[1.02]
    hover:shadow-[0_20px_60px_rgba(0,153,255,0.3),0_8px_32px_rgba(139,92,246,0.2)]
    active:scale-[0.98]
  `,
  
  // Secondary: Glass with subtle hover
  secondary: `
    px-6 py-3 md:px-8 md:py-4
    bg-slate-900/60 backdrop-blur-[30px]
    border border-white/20
    text-white/90 font-bold rounded-2xl
    shadow-[0_4px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]
    transition-all duration-300
    hover:bg-slate-800/60 hover:-translate-y-px
    hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]
    active:scale-[0.98]
  `,
  
  // Ghost: Minimal
  ghost: `
    px-6 py-3
    text-white/70 font-medium
    transition-all duration-200
    hover:text-white hover:bg-white/5
    rounded-xl
  `,
}
```

### Card Component
```tsx
// src/components/ui/card-variants.ts
export const cardVariants = {
  // Glass Card: Standard interactive card
  glass: `
    bg-gradient-to-br from-slate-900/60 to-slate-800/40
    backdrop-blur-[50px]
    border border-white/15
    shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
    rounded-3xl p-8
    transition-all duration-[400ms]
    hover:-translate-y-1 hover:scale-[1.01]
    relative overflow-hidden
    before:content-[''] before:absolute before:top-0 before:left-0 before:right-0
    before:h-px before:bg-gradient-to-r before:from-transparent
    before:via-white/20 before:to-transparent
  `,
  
  // Feature Card: For feature highlights
  feature: `
    bg-gradient-to-br from-slate-900/90 to-slate-800/70
    backdrop-blur-[50px]
    border border-white/10
    rounded-4xl p-10
    relative overflow-hidden
    transition-all duration-500
    after:content-[''] after:absolute after:inset-0
    after:bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]
    after:opacity-0 after:transition-opacity after:duration-500
    hover:after:opacity-100
  `,
  
  // Product Card: For marketplace items
  product: `
    group bg-slate-900/60 backdrop-blur-glass
    border border-white/10
    rounded-3xl overflow-hidden
    transition-all duration-300
    hover:border-white/20 hover:-translate-y-1
    hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
  `,
}
```

### Input Component
```tsx
// src/components/ui/input-variants.ts
export const inputVariants = {
  default: `
    w-full px-6 py-4
    bg-slate-900/40 backdrop-blur-[30px]
    border border-white/15 rounded-2xl
    text-white placeholder:text-white/40
    shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]
    transition-all duration-300
    focus:bg-slate-900/60
    focus:border-blue-500/50
    focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1),0_8px_40px_-8px_rgba(59,130,246,0.2)]
    focus:outline-none
  `,
}
```

---

## 6. COMPOSITE COMPONENTS

### Navbar Structure
```
Navbar/
├── Container (glass background with sticky positioning)
├── Logo (gradient text with hover effect)
├── Navigation Links (glass pill hover states)
├── Auth Section
│   ├── User Avatar (with dropdown)
│   ├── Sign Out Button (ghost variant)
│   └── Dashboard Button (primary variant)
└── Mobile Menu Toggle
```

### Hero Section Structure
```
Hero/
├── Background Effects Layer
│   ├── Radial Gradient (top, blue)
│   ├── Radial Gradient (middle, purple)
│   └── Noise Texture
├── Content Container
│   ├── Badge (glass card, animated glow)
│   ├── Headline (display typography, gradient text)
│   ├── Description (body-large, muted text)
│   ├── Input Field (glass input with gradient button)
│   ├── Tags (glass pills)
│   └── CTA Buttons (primary + secondary)
└── Demo Window (glass-strong card with nested content)
```

### Feature Card Structure
```
FeatureCard/
├── Container (feature-card variant, hover glow)
├── Header
│   ├── Icon (gradient background, rounded)
│   └── Title (H4 typography)
├── Description (body text, secondary color)
└── Footer
    └── CTA Button (secondary variant, group-hover scale)
```

---

## 7. PAGE LAYOUTS

### Landing Page Structure
```
Landing/
├── Hero Section
│   ├── Background gradients
│   ├── Main content grid
│   │   ├── Left: Text content + CTAs
│   │   └── Right: Demo window
│   └── Animated elements (fade-in-up)
├── Feature Panorama Section
│   ├── Section heading
│   ├── Feature panels grid
│   │   ├── Feature cards (3 columns)
│   │   └── Glow tiles (side column)
│   └── Staggered animations
├── Additional Sections (as needed)
└── Footer
```

### Dashboard Structure
```
Dashboard/
├── Sidebar Navigation (glass panel, fixed)
│   ├── Logo
│   ├── Nav items (glass hover states)
│   └── User profile
├── Main Content Area
│   ├── Header
│   │   ├── Page title (gradient text)
│   │   ├── Breadcrumbs
│   │   └── Actions
│   ├── Stats Grid (glass cards with gradients)
│   ├── Content Cards (product/feature cards)
│   └── Pagination
└── Modals/Overlays (glass-strong background)
```

### Marketplace Structure
```
Marketplace/
├── Header
│   ├── Search (glass input, full width)
│   ├── Filters (glass pills, multi-select)
│   └── Sort dropdown (glass dropdown)
├── Product Grid
│   └── Product Cards (4 columns, responsive)
│       ├── Image (with shimmer loading)
│       ├── Title + Description
│       ├── Price (gradient text)
│       ├── Stats (badge components)
│       └── CTA Button (primary variant)
└── Load More (ghost button with spinner)
```

---

## 8. RESPONSIVE PATTERNS

### Mobile-First Approach
```tsx
// Stack on mobile, side-by-side on desktop
className="flex flex-col md:flex-row gap-6 md:gap-12"

// Hide on mobile, show on desktop
className="hidden md:block"

// Full width on mobile, constrained on desktop
className="w-full md:max-w-lg"

// Smaller text on mobile
className="text-2xl md:text-4xl lg:text-6xl"

// Responsive padding
className="px-6 py-20 md:px-12 md:py-32"
```

### Breakpoint System
- **sm**: 640px (Mobile landscape)
- **md**: 768px (Tablet)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large desktop)
- **2xl**: 1536px (Extra large)

---

## 9. ACCESSIBILITY PATTERNS

### Focus States
```tsx
// Visible focus ring
className="focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-black"

// Focus within (for containers)
className="focus-within:border-blue-500/50"
```

### Screen Reader Only
```tsx
className="sr-only"
```

### ARIA Attributes
```tsx
<button aria-label="Close modal" aria-pressed="false">
<nav aria-label="Main navigation">
<section aria-labelledby="features-heading">
```

---

## 10. PERFORMANCE OPTIMIZATIONS

### Lazy Loading
```tsx
const Dashboard = lazy(() => import('./pages/Dashboard'))
```

### Memoization
```tsx
const MemoizedCard = memo(FeatureCard)
```

### Conditional Animations
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

className={`transition-all ${!prefersReducedMotion && 'duration-300 hover:-translate-y-1'}`}
```

---

## Usage Example: Complete Landing Page Component

See `TAILWIND_MIGRATION_GUIDE.md` for detailed class mappings.

---

## Quick Reference Card

| Element | Base Classes | Hover Effect | Animation |
|---------|--------------|--------------|-----------|
| Glass Card | `bg-slate-900/60 backdrop-blur-[50px] border border-white/15 rounded-3xl` | `-translate-y-1 scale-[1.01]` | `animate-fade-in-scale` |
| Primary Button | `bg-gradient-primary border border-white/10 rounded-2xl` | `-translate-y-0.5 scale-[1.02]` | `transition-all duration-300` |
| Gradient Text | `bg-gradient-primary bg-clip-text text-transparent` | N/A | `animate-fade-in-up` |
| Input Field | `bg-slate-900/40 border border-white/15 rounded-2xl` | `border-blue-500/50 shadow-glow-blue` | `transition-all duration-300` |

---

*Follow this hierarchy when building new components to maintain consistency*

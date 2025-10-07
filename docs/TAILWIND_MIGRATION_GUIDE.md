# Framer-Inspired Design System - Tailwind CSS Migration Guide

## Overview
This document provides a comprehensive mapping of custom CSS classes to Tailwind CSS utilities, following Framer's design principles.

## Design Principles
1. **Glassmorphism** - Semi-transparent backgrounds with backdrop blur
2. **Gradient Accents** - Bold, multi-stop gradients for emphasis
3. **Smooth Animations** - Subtle, physics-based transitions
4. **Depth & Layering** - Strategic use of shadows and z-index
5. **Typography Hierarchy** - Clear visual hierarchy with Space Grotesk & Inter

---

## CSS Class Replacements

### Glass Morphism Classes

#### `.glass` → Tailwind Equivalent
```tsx
// Old:
className="glass"

// New:
className="bg-glass-bg backdrop-blur-glass border border-glass-border shadow-glass rounded-2xl transition-all duration-300 hover:bg-glass-bg-light hover:border-glass-border-strong hover:shadow-glass-xl hover:-translate-y-0.5"
```

#### `.glass-strong` → Tailwind Equivalent
```tsx
// Old:
className="glass-strong"

// New:
className="bg-glass-bg-strong backdrop-blur-strong border border-glass-border-strong shadow-glass-xl rounded-2xl"
```

#### `.glass-card` → Tailwind Equivalent
```tsx
// Old:
className="glass-card"

// New:
className="bg-gradient-glass backdrop-blur-[50px] border border-white/[0.15] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl transition-all duration-[400ms] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_35px_80px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] hover:border-white/25"
```

#### `.glass-input` → Tailwind Equivalent
```tsx
// Old:
className="glass-input"

// New:
className="bg-slate-900/40 backdrop-blur-[30px] border border-white/[0.15] rounded-2xl transition-all duration-300 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] focus:bg-slate-900/60 focus:border-blue-500/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1),0_8px_40px_-8px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] focus:outline-none"
```

### Gradient Text Classes

#### `.gradient-text` → Tailwind Equivalent
```tsx
// Old:
className="gradient-text"

// New:
className="bg-gradient-text bg-clip-text text-transparent"
```

#### `.gradient-text-primary` → Tailwind Equivalent
```tsx
// Old:
className="gradient-text-primary"

// New:
className="bg-gradient-primary bg-clip-text text-transparent"
// OR use inline gradient:
className="bg-gradient-to-r from-[#0099ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent"
```

#### `.gradient-text-accent` → Tailwind Equivalent
```tsx
// Old:
className="gradient-text-accent"

// New:
className="bg-gradient-secondary bg-clip-text text-transparent"
// OR:
className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent"
```

### Card Components

#### `.card-glass` → Tailwind Equivalent
```tsx
// Old:
className="card-glass"

// New:
className="bg-gradient-surface backdrop-blur-glass border border-white/[0.15] rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-[400ms] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_35px_80px_-20px_rgba(0,0,0,0.7),0_0_40px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] hover:border-white/25"
```

#### `.feature-card` → Tailwind Equivalent
```tsx
// Old:
className="feature-card"

// New:
className="bg-gradient-to-br from-slate-900/90 to-slate-800/70 backdrop-blur-[50px] border border-white/10 rounded-4xl relative overflow-hidden transition-all duration-500 after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.1)_0%,_transparent_50%)] after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100"
```

### Button Styles

#### `.btn-gradient` → Tailwind Equivalent
```tsx
// Old:
className="btn-gradient"

// New:
className="bg-gradient-primary border border-white/10 text-white transition-all duration-300 relative overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,153,255,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:transition-[left] before:duration-600 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,153,255,0.3),0_8px_32px_rgba(139,92,246,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] hover:border-white/20 hover:before:left-full"
```

#### `.btn-secondary` → Tailwind Equivalent
```tsx
// Old:
className="btn-secondary"

// New:
className="bg-slate-900/60 backdrop-blur-[30px] border border-white/20 text-white/90 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-slate-800/60 hover:border-white/30 hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
```

### Animation Classes

#### `.animate-fade-in-up` → Tailwind Equivalent
```tsx
// Already supported:
className="animate-fade-in-up"
```

#### `.animate-fade-in-scale` → Tailwind Equivalent
```tsx
// Already supported:
className="animate-fade-in-scale"
```

#### `.animate-float` → Tailwind Equivalent
```tsx
// Already supported:
className="animate-float"
```

#### `.animate-glow` → Tailwind Equivalent
```tsx
// Old:
className="animate-glow"

// New:
className="transition-shadow duration-300 hover:animate-glow"
```

#### `.shimmer` → Tailwind Equivalent
```tsx
// Old:
className="shimmer"

// New:
className="relative overflow-hidden before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:animate-shimmer"
```

### Utility Classes

#### `.text-shadow` → Tailwind Equivalent
```tsx
// Old:
className="text-shadow"

// New:
className="[text-shadow:0_2px_10px_rgba(0,0,0,0.5)]"
```

#### `.text-shadow-glow` → Tailwind Equivalent
```tsx
// Old:
className="text-shadow-glow"

// New:
className="[text-shadow:0_0_20px_rgba(59,130,246,0.5)]"
```

#### `.interactive-hover` → Tailwind Equivalent
```tsx
// Old:
className="interactive-hover"

// New:
className="transition-all duration-300 hover:-translate-y-0.5"
```

---

## Component Pattern Examples

### Hero Section Pattern
```tsx
<section className="relative isolate overflow-hidden pb-40 pt-20 sm:pt-32">
  {/* Background Effects */}
  <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(circle_at_top,_rgba(0,153,255,0.15),_transparent_70%)] blur-3xl" />
  <div className="absolute inset-x-0 top-64 -z-10 h-[400px] bg-[radial-gradient(circle_at_bottom,_rgba(139,92,246,0.12),_transparent_75%)] blur-3xl" />
  
  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
    {/* Your content */}
  </div>
</section>
```

### Glass Card Pattern
```tsx
<div className="bg-gradient-glass backdrop-blur-[50px] border border-white/[0.15] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl transition-all duration-[400ms] relative overflow-hidden p-8 hover:-translate-y-1 hover:scale-[1.01]">
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  {/* Card content */}
</div>
```

### Input Field Pattern
```tsx
<input
  type="text"
  className="w-full bg-slate-900/40 backdrop-blur-[30px] border border-white/[0.15] rounded-2xl px-6 py-4 transition-all duration-300 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] text-white placeholder:text-white/40 focus:bg-slate-900/60 focus:border-blue-500/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1),0_8px_40px_-8px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] focus:outline-none"
  placeholder="Enter text..."
/>
```

### Button Pattern (Primary)
```tsx
<button className="px-8 py-4 bg-gradient-primary border border-white/10 text-white font-bold rounded-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,153,255,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,153,255,0.3),0_8px_32px_rgba(139,92,246,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] hover:border-white/20">
  Click Me
</button>
```

### Typography Patterns

#### Hero Heading
```tsx
<h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight text-white">
  Your Amazing
  <br />
  <span className="bg-gradient-primary bg-clip-text text-transparent">
    Product
  </span>
</h1>
```

#### Section Heading
```tsx
<h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
  Feature Title
</h2>
```

#### Body Text
```tsx
<p className="text-xl text-white/80 leading-relaxed">
  Your descriptive text content here...
</p>
```

---

## Color System

### Surface Colors
- `bg-surface-primary` → `bg-black`
- `bg-surface-secondary` → `bg-slate-900/50`
- `bg-surface-tertiary` → `bg-slate-800/30`

### Glass Colors
- `bg-glass-bg` → `bg-slate-900/40`
- `bg-glass-bg-light` → `bg-slate-800/30`
- `bg-glass-bg-strong` → `bg-slate-900/70`
- `border-glass-border` → `border-white/20`
- `border-glass-border-strong` → `border-white/30`

### Text Colors
- `text-text-primary` → `text-white`
- `text-text-secondary` → `text-white/80`
- `text-text-muted` → `text-white/60`
- `text-text-accent` → `text-blue-500/90`

### Accent Colors
- Blueaccent-blue` → `#0099ff` or `text-[#0099ff]`
- `accent-purple` → `#8b5cf6` or `text-purple-600`
- `accent-pink` → `#ec4899` or `text-pink-500`
- `accent-cyan` → `#06b6d4` or `text-cyan-500`

---

## Shadow System

### Glass Shadows
- `shadow-glass` → `shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]`
- `shadow-glass-xl` → `shadow-[0_35px_80px_-20px_rgba(0,0,0,0.8)]`
- `shadow-glass-sm` → `shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1)]`

### Glow Shadows
- `shadow-glow-blue` → `shadow-[0_0_20px_rgba(59,130,246,0.3)]`
- `shadow-glow-purple` → `shadow-[0_0_20px_rgba(139,92,246,0.3)]`
- `shadow-glow-pink` → `shadow-[0_0_20px_rgba(236,72,153,0.3)]`
- `shadow-glow-strong` → `shadow-[0_0_40px_rgba(59,130,246,0.5)]`

### Inner Glow
- `shadow-inner-glow` → `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`
- `shadow-inner-glow-strong` → `shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]`

---

## Border Radius System

- `rounded-xl` → `rounded-2xl` (16px)
- `rounded-2xl` → `rounded-[20px]` (20px)
- `rounded-3xl` → `rounded-3xl` (24px)
- `rounded-4xl` → `rounded-[32px]` (32px)
- `rounded-5xl` → `rounded-[40px]` (40px)

---

## Spacing System

Custom spacing values:
- `spacing-18` → `space-18` or `gap-18` (4.5rem / 72px)
- `spacing-88` → `space-88` or `gap-88` (22rem / 352px)
- `spacing-112` → `space-112` (28rem / 448px)
- `spacing-128` → `space-128` (32rem / 512px)

---

## Animation Delays

For staggered animations:
```tsx
<div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>...</div>
<div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>...</div>
<div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>...</div>
```

Or use Tailwind's delay utilities:
```tsx
<div className="animate-fade-in-up delay-100">...</div>
<div className="animate-fade-in-up delay-200">...</div>
<div className="animate-fade-in-up delay-300">...</div>
```

---

## Best Practices

1. **Combine Utilities Strategically**: Group related utilities for readability
2. **Use Custom Classes for Complex Patterns**: When a pattern repeats 3+ times, keep it as a utility class
3. **Leverage Arbitrary Values**: Use `[value]` syntax for one-off custom values
4. **Maintain Consistency**: Stick to the defined color palette and spacing system
5. **Component Extraction**: Extract complex patterns into separate components

---

## Migration Checklist

- [ ] Replace all `.glass*` classes with Tailwind utilities
- [ ] Replace all `.gradient-text*` classes with gradient backgrounds + clip-text
- [ ] Replace all `.card-glass` and `.feature-card` with Tailwind utilities
- [ ] Replace all `.btn-*` classes with Tailwind utilities
- [ ] Replace all animation classes where needed
- [ ] Update all text shadow classes to arbitrary values
- [ ] Verify all hover states work correctly
- [ ] Test responsive breakpoints
- [ ] Ensure animations trigger properly
- [ ] Validate accessibility (focus states, contrast)

---

## Additional Resources

- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Framer Design**: https://www.framer.com
- **Arbitrary Values**: https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values
- **Custom Animations**: https://tailwindcss.com/docs/animation

---

*Last Updated: October 2025*
*Version: 1.0*

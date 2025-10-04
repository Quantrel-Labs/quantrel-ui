# 🎨 Quick Reference Card - Framer-Inspired Design System

## 🚀 Getting Started
```bash
# Your existing code still works!
<div className="glass-card">
  <h1 className="gradient-text-primary">Hello</h1>
</div>

# Or use pure Tailwind:
<div className="bg-gradient-glass backdrop-blur-[50px] border border-white/15 rounded-3xl p-8">
  <h1 className="bg-gradient-primary bg-clip-text text-transparent">Hello</h1>
</div>
```

---

## 🎯 Essential Patterns

### Glass Card
```tsx
glass-card
// = bg-gradient-glass + backdrop-blur-[50px] + border + shadow + rounded-3xl + hover effects
```

### Gradient Text
```tsx
gradient-text-primary
// = bg-gradient-to-r from-[#0099ff] via-[#8b5cf6] to-[#ec4899] + bg-clip-text + text-transparent
```

### Primary Button
```tsx
px-8 py-4 bg-gradient-primary border border-white/10 text-white font-bold rounded-2xl
hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300
```

### Feature Card
```tsx
feature-card
// = bg-gradient-to-br from-slate-900/90 to-slate-800/70 + backdrop-blur + border + rounded-4xl + hover glow
```

---

## 🎨 Color Quick Ref

| Color | Usage | Tailwind |
|-------|-------|----------|
| Pure Black | Main background | `bg-black` |
| Slate 900/50 | Secondary surface | `bg-slate-900/50` |
| White | Primary text | `text-white` |
| White/80 | Secondary text | `text-white/80` |
| White/60 | Muted text | `text-white/60` |
| Blue-Purple-Pink | Primary gradient | `bg-gradient-primary` |
| Cyan-Blue-Purple | Secondary gradient | `bg-gradient-secondary` |

---

## ✨ Animation Quick Ref

| Animation | Usage | Class |
|-----------|-------|-------|
| Fade from bottom | Hero sections | `animate-fade-in-up` |
| Scale + fade | Cards | `animate-fade-in-scale` |
| Gentle float | Decorative | `animate-float` |
| Shimmer | Loading | `animate-shimmer` |
| Pulsing glow | Interactive | `hover:animate-glow` |

---

## 📏 Size Scale

### Typography
```tsx
text-8xl  // Hero (96px)
text-6xl  // H1 (60px)
text-4xl  // H2 (36px)
text-2xl  // H3 (24px)
text-xl   // Body Large (20px)
text-base // Body (16px)
text-sm   // Small (14px)
text-xs   // Caption (12px)
```

### Spacing
```tsx
gap-2   // 8px
gap-4   // 16px
gap-6   // 24px
gap-8   // 32px
gap-12  // 48px
gap-16  // 64px
gap-24  // 96px
```

### Rounded
```tsx
rounded-2xl   // 16px - Inputs, small cards
rounded-3xl   // 24px - Cards
rounded-4xl   // 32px - Feature cards
rounded-[40px]// 40px - Hero sections
```

---

## 🎯 Layout Patterns

### Hero Section
```tsx
<section className="relative isolate overflow-hidden pb-40 pt-20">
  <div className="absolute inset-x-0 top-0 -z-10 h-[600px] 
       bg-[radial-gradient(circle_at_top,_rgba(0,153,255,0.15),_transparent_70%)] blur-3xl" />
  <div className="relative mx-auto max-w-7xl px-6">
    {/* Content */}
  </div>
</section>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Stacked Section
```tsx
<div className="flex flex-col md:flex-row gap-12 items-center">
  <div className="flex-1">{/* Left */}</div>
  <div className="flex-1">{/* Right */}</div>
</div>
```

---

## 🎨 Component Recipes

### Glass Input
```tsx
<input className="w-full px-6 py-4 bg-slate-900/40 backdrop-blur-[30px] 
       border border-white/15 rounded-2xl text-white placeholder:text-white/40
       focus:border-blue-500/50 focus:outline-none transition-all" />
```

### Secondary Button
```tsx
<button className="px-6 py-3 bg-slate-900/60 backdrop-blur-[30px] 
        border border-white/20 text-white/90 rounded-2xl
        hover:bg-slate-800/60 hover:-translate-y-px transition-all">
  Click Me
</button>
```

### Badge
```tsx
<span className="inline-flex items-center gap-2 px-6 py-3 
       bg-slate-900/40 backdrop-blur-glass border border-white/15 rounded-2xl
       text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
  <div className="h-2 w-2 rounded-full bg-gradient-primary" />
  Badge Text
</span>
```

### Feature Icon
```tsx
<div className="h-12 w-12 rounded-2xl bg-gradient-primary 
     flex items-center justify-center shadow-glow-blue">
  <Icon className="h-6 w-6 text-white" />
</div>
```

---

## 🎭 State Classes

### Hover
```tsx
hover:bg-white/10
hover:-translate-y-1
hover:scale-[1.02]
hover:shadow-glow-blue
hover:border-white/30
```

### Focus
```tsx
focus:outline-none
focus:ring-2 focus:ring-blue-500/50
focus:border-blue-500/50
focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]
```

### Active
```tsx
active:scale-[0.98]
active:translate-y-0
```

### Group Hover
```tsx
<div className="group">
  <div className="group-hover:scale-105 transition-transform">
    Child element
  </div>
</div>
```

---

## 📱 Responsive Patterns

```tsx
// Typography: Small → Medium → Large
text-4xl md:text-6xl lg:text-8xl

// Layout: Stack → Side-by-side
flex-col md:flex-row

// Spacing: Tight → Loose
gap-6 md:gap-12 lg:gap-24

// Grid: 1 col → 2 cols → 3 cols
grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Visibility: Hide on mobile
hidden md:block

// Padding: Small → Large
px-6 md:px-12 lg:px-24
```

---

## 🎨 Shadow System

```tsx
shadow-glass        // Standard glass shadow
shadow-glass-xl     // Strong glass shadow
shadow-glow-blue    // Blue glow effect
shadow-glow-purple  // Purple glow effect
shadow-inner-glow   // Inner white glow
shadow-[0_custom]   // Custom shadow (arbitrary)
```

---

## ⚡ Performance Tips

1. **Use custom classes for repeated patterns**
   ```tsx
   glass-card  // Better than repeating 10+ utilities
   ```

2. **Use Tailwind utilities for one-offs**
   ```tsx
   bg-[#custom]  // Arbitrary value for unique cases
   ```

3. **Group related utilities**
   ```tsx
   // Easier to read:
   className="
     bg-slate-900/40 backdrop-blur-[30px]
     border border-white/15 rounded-2xl
     px-6 py-4
     hover:bg-slate-900/60 hover:-translate-y-px
     transition-all duration-300
   "
   ```

---

## ♿ Accessibility Checklist

- [ ] Focus states visible (`focus:ring-2 focus:ring-blue-500/50`)
- [ ] ARIA labels present (`aria-label`, `aria-describedby`)
- [ ] Color contrast sufficient (4.5:1 for text)
- [ ] Keyboard navigable (`tabIndex`, `onKeyDown`)
- [ ] Screen reader friendly (`role`, `sr-only`)
- [ ] Alt text on images (`alt="Description"`)
- [ ] Semantic HTML (`<nav>`, `<main>`, `<button>`)

---

## 🔗 Documentation Links

📄 **DESIGN_SYSTEM_README.md** - Start here (overview + examples)
📄 **MIGRATION_SUMMARY.md** - Quick patterns and color system
📄 **TAILWIND_MIGRATION_GUIDE.md** - Complete class mappings
📄 **COMPONENT_HIERARCHY.md** - Architecture and composition

---

## 💡 Pro Tips

1. **Install Tailwind CSS IntelliSense** extension in VSCode
2. **Reference Landing.tsx** for complete examples
3. **Use arbitrary values** for one-off customizations: `bg-[#custom]`
4. **Stagger animations** with inline styles: `style={{ animationDelay: '0.2s' }}`
5. **Test mobile-first** then enhance for desktop
6. **Use the `group` class** for parent-child hover effects
7. **Combine custom + Tailwind**: `glass-card hover:-translate-y-2`

---

## 🎯 Common Mistakes to Avoid

❌ **Don't**: Use too many arbitrary values
✅ **Do**: Use design tokens from config

❌ **Don't**: Forget focus states
✅ **Do**: Always include `focus:` variants

❌ **Don't**: Hardcode colors
✅ **Do**: Use semantic color names

❌ **Don't**: Skip responsive testing
✅ **Do**: Test at all breakpoints

❌ **Don't**: Nest too deeply
✅ **Do**: Extract components when needed

---

## 🚀 Quick Copy-Paste

### Gradient Button
```tsx
<button className="px-8 py-4 bg-gradient-primary border border-white/10 text-white font-bold rounded-2xl shadow-[0_8px_32px_rgba(0,153,255,0.2)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300">
  Get Started
</button>
```

### Glass Card
```tsx
<div className="glass-card p-8 hover:-translate-y-1 transition-all">
  <h3 className="font-display text-2xl font-bold mb-4">Title</h3>
  <p className="text-white/80">Description</p>
</div>
```

### Hero Heading
```tsx
<h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight">
  Amazing
  <br />
  <span className="bg-gradient-primary bg-clip-text text-transparent">
    Product
  </span>
</h1>
```

### Input Field
```tsx
<input 
  type="text"
  placeholder="Enter text..."
  className="w-full px-6 py-4 bg-slate-900/40 backdrop-blur-[30px] border border-white/15 rounded-2xl text-white placeholder:text-white/40 focus:border-blue-500/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] focus:outline-none transition-all"
/>
```

---

**Keep this card handy for quick reference! 🎨**

*For detailed explanations, see the full documentation.*

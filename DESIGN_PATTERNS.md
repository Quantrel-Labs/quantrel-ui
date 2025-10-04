# 🎨 Quantrel Design System - Component Patterns

This document showcases the reusable design patterns used throughout the Quantrel redesign.

## 🎭 Design Tokens

### Colors
```tsx
// Backgrounds
bg-black                    // Pure black (#000000)
bg-white/[0.02]            // Subtle card background
bg-white/5                 // Glass effect
bg-white/10                // Hover state

// Text
text-white                 // Primary text
text-gray-400              // Secondary text
text-gray-500              // Tertiary text

// Accents
text-blue-400              // Primary accent
text-purple-400            // Secondary accent
text-pink-400              // Tertiary accent
text-green-400             // Success
text-red-400               // Error/Warning

// Borders
border-white/10            // Default border
border-white/20            // Hover border
border-blue-500/20         // Accent border
```

### Spacing
```tsx
// Padding (cards, sections)
p-6   // Small card
p-8   // Medium card
p-10  // Large card
p-12  // Section padding

// Gaps (grids, flexbox)
gap-4  // Tight
gap-6  // Normal
gap-8  // Spacious
gap-12 // Very spacious

// Margins
mb-4   // Small bottom margin
mb-6   // Medium bottom margin
mb-12  // Large bottom margin
mt-20  // Section spacing
```

### Border Radius
```tsx
rounded-lg     // 8px - Small elements
rounded-xl     // 12px - Buttons, inputs
rounded-2xl    // 16px - Cards
rounded-full   // Circular - Pills, avatars
```

## 🧱 Component Patterns

### 1. Hero Section
```tsx
<section className="relative min-h-[90vh] flex items-center overflow-hidden">
  {/* Gradient Orbs */}
  <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
  
  {/* Content */}
  <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-24">
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
      <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        Gradient Text
      </span>
    </h1>
  </div>
</section>
```

### 2. Glass-Morphic Card
```tsx
<div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300">
  {/* Content */}
</div>
```

### 3. Gradient Card (Accent)
```tsx
<div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
  {/* Content */}
</div>
```

### 4. Icon Container
```tsx
<div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
  <Icon className="w-6 h-6 text-blue-400" />
</div>
```

### 5. Badge
```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
  <Icon className="w-4 h-4" />
  <span className="text-sm">Label</span>
</div>
```

### 6. Button Variants
```tsx
// Primary (filled)
<Button className="h-12 px-8 rounded-xl bg-white text-black hover:bg-gray-100">
  Click Me
</Button>

// Outline
<Button variant="outline" className="h-12 px-8 rounded-xl border-white/10 hover:bg-white/5">
  Click Me
</Button>

// Ghost
<Button variant="ghost" className="text-blue-400 hover:bg-blue-500/10">
  Click Me
</Button>

// Pill (rounded-full)
<Button className="h-14 px-8 rounded-full bg-white text-black">
  Get Started
</Button>
```

### 7. Input Field
```tsx
<Input
  placeholder="Search..."
  className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-500"
/>
```

### 8. Section Header
```tsx
<div className="mb-12">
  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
    Section Title
  </h2>
  <p className="text-xl text-gray-400">
    Section description
  </p>
</div>
```

### 9. Stat Card
```tsx
<div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
      <Icon className="w-6 h-6 text-blue-400" />
    </div>
    <h3 className="text-gray-400 font-medium">Metric Label</h3>
  </div>
  <div className="text-4xl font-bold text-white mb-2">
    $12,450
  </div>
  <p className="text-sm text-gray-500">
    Description
  </p>
</div>
```

### 10. Feature Card
```tsx
<div className="group relative p-12 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
  {/* Hover gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  
  <div className="relative space-y-6">
    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
      <Icon className="w-7 h-7 text-blue-400" />
    </div>
    <h3 className="text-3xl font-bold text-white">Feature Title</h3>
    <p className="text-lg text-gray-400">Feature description</p>
  </div>
</div>
```

### 11. Progress Bar
```tsx
<div className="space-y-2">
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-400">Label</span>
    <span className="text-white font-medium">75%</span>
  </div>
  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
    <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
  </div>
</div>
```

### 12. Timeline Item
```tsx
<div className="relative">
  {/* Connecting line */}
  <div className="absolute left-6 top-16 bottom-0 w-px bg-white/10" />
  
  {/* Card */}
  <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10">
    <div className="flex items-start gap-4">
      <div className="relative z-10 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">Event Title</h3>
        <p className="text-gray-400 mt-2">Event description</p>
      </div>
    </div>
  </div>
</div>
```

### 13. Search Bar with Filters
```tsx
<div className="flex gap-4">
  <div className="flex-1 relative">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <Input
      placeholder="Search..."
      className="w-full h-14 pl-12 rounded-xl bg-white/5 border-white/10"
    />
  </div>
  <Button variant="outline" className="h-14 px-6 rounded-xl border-white/10">
    <Filter className="w-5 h-5 mr-2" />
    Filters
  </Button>
</div>
```

### 14. Toggle Switch
```tsx
<button
  className={`relative w-12 h-6 rounded-full transition-colors ${
    enabled ? 'bg-blue-500' : 'bg-white/10'
  }`}
  aria-label="Toggle setting"
>
  <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
    enabled ? 'translate-x-6' : 'translate-x-0'
  }`} />
</button>
```

### 15. Avatar / Profile Picture
```tsx
<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
  <span className="text-lg">👤</span>
</div>
```

## 🎬 Animation Patterns

### Hover Effects
```tsx
// Card lift
hover:shadow-lg hover:shadow-blue-500/10

// Border glow
hover:border-white/20

// Background lighten
hover:bg-white/10

// Text color change
hover:text-white

// Scale (subtle)
hover:scale-[1.02]
```

### Transition Speeds
```tsx
transition-colors        // 150ms
transition-all          // 150ms
duration-300            // 300ms (most common)
duration-500            // 500ms (slower, dramatic)
```

### Gradient Animations
```tsx
// Pulse effect
animate-pulse

// Custom gradient text
bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text
```

## 📐 Layout Patterns

### Container
```tsx
<div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
  {/* Content */}
</div>
```

### Responsive Grid
```tsx
// 1 col mobile, 2 col tablet, 3 col desktop
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

### Flex Layout
```tsx
// Space between
<div className="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

// Centered
<div className="flex items-center justify-center">
  <div>Centered</div>
</div>

// Gap spacing
<div className="flex items-center gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Two-Column Layout
```tsx
<div className="grid lg:grid-cols-2 gap-8">
  <div>{/* Left column */}</div>
  <div>{/* Right column */}</div>
</div>
```

### Three-Panel Layout (Chat)
```tsx
<div className="flex h-screen">
  <div className="w-80">{/* Left sidebar */}</div>
  <div className="flex-1">{/* Center */}</div>
  <div className="w-80">{/* Right sidebar */}</div>
</div>
```

## 🎨 Color Combinations

### Primary Accent
```tsx
// Blue + Purple gradient
from-blue-400 to-purple-400
bg-blue-500/10 text-blue-400

// Blue highlight
border-blue-500/20 bg-blue-500/10
```

### Success State
```tsx
// Green
text-green-400
bg-green-500/10
border-green-500/20
```

### Warning State
```tsx
// Yellow/Orange
text-yellow-400
bg-yellow-500/10
border-yellow-500/20
```

### Error State
```tsx
// Red
text-red-400
bg-red-500/10
border-red-500/20
```

## 📝 Typography Scale

```tsx
// Hero (landing pages)
text-6xl md:text-7xl lg:text-8xl

// Page titles
text-4xl md:text-5xl

// Section headings
text-3xl md:text-4xl

// Card titles
text-2xl

// Subheadings
text-xl

// Body
text-base

// Small text
text-sm

// Extra small
text-xs
```

## 🎯 Usage Examples

### Landing Page Section
```tsx
<section className="relative py-32 overflow-hidden">
  <div className="mx-auto max-w-7xl px-6 lg:px-12">
    <div className="max-w-3xl mx-auto text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
        Section Title
      </h2>
      <p className="text-xl text-gray-400">
        Section description
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Feature cards */}
    </div>
  </div>
</section>
```

### Dashboard Metric
```tsx
<div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
      <DollarSign className="w-6 h-6 text-blue-400" />
    </div>
    <h3 className="text-gray-400 font-medium">Total Revenue</h3>
  </div>
  <div className="text-4xl font-bold text-white mb-2">
    $12,450.80
  </div>
  <p className="text-sm text-green-400">
    <span className="font-medium">↑ 18%</span> from last month
  </p>
</div>
```

---

## 💡 Best Practices

1. **Consistency**: Use the same patterns throughout
2. **Spacing**: Stick to multiples of 4 (4, 6, 8, 12, 16, 20, 24)
3. **Colors**: Use opacity for depth (bg-white/5, bg-white/10, etc.)
4. **Borders**: Keep subtle (border-white/10, border-white/20)
5. **Hover**: Always add hover states for interactive elements
6. **Responsive**: Test mobile, tablet, desktop
7. **Accessibility**: Include aria-labels, focus states
8. **Performance**: Use Tailwind utilities, avoid inline styles

This design system ensures **visual consistency** across all pages while maintaining the **Framer-inspired aesthetic**!

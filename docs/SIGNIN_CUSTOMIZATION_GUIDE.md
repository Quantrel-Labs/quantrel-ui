# Sign-In Flow Customization Guide

## Quick Reference

### Changing Animation Speed

In both `Login.tsx` and `Register.tsx`, find the `CanvasRevealEffect` component:

```tsx
<CanvasRevealEffect
  animationSpeed={3}  // Change this number (1-10)
  containerClassName="bg-black"
  colors={[
    [255, 255, 255],  // White dots
    [255, 255, 255],
  ]}
  dotSize={6}  // Size of dots (2-10)
  reverse={false}
/>
```

### Animation Speed Guide
- `1-2`: Very slow, subtle
- `3-4`: Medium (current setting)
- `5-7`: Fast, energetic
- `8-10`: Very fast, intense

---

## Color Customization

### Change Dot Colors

Replace the RGB values in the `colors` array:

```tsx
// White dots (current)
colors={[
  [255, 255, 255],
  [255, 255, 255],
]}

// Blue dots
colors={[
  [59, 130, 246],  // Tailwind blue-500
  [59, 130, 246],
]}

// Purple dots
colors={[
  [168, 85, 247],  // Tailwind purple-500
  [168, 85, 247],
]}

// Gradient (two colors)
colors={[
  [59, 130, 246],   // Blue
  [168, 85, 247],   // Purple
]}

// Multi-color gradient (three colors)
colors={[
  [59, 130, 246],   // Blue
  [168, 85, 247],   // Purple
  [236, 72, 153],   // Pink
]}
```

### Change Background Colors

```tsx
// In the main div
<div className={cn("flex w-full flex-col min-h-screen bg-black relative")}>
                                                      // ^^^^^^^^ Change this

// Options:
bg-black        // Pure black
bg-gray-900     // Dark gray
bg-blue-950     // Very dark blue
bg-gradient-to-br from-gray-900 to-black  // Gradient
```

### Change Overlay Colors

```tsx
// Radial gradient overlay
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.8)_0%,_transparent_100%)]" />
                                                                   // ^^^ Change opacity (0.0-1.0)

// Top gradient
<div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
                                                                    // ^^^^^^^^^ Change color
```

---

## Text Customization

### Change Headings

**Login Page:**
```tsx
<h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">
  Welcome Back  {/* Change this text */}
</h1>
<p className="text-[1.8rem] text-white/70 font-light">
  Sign in to Quantrel  {/* Change this text */}
</p>
```

**Register Page:**
```tsx
<h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white">
  Join Quantrel  {/* Change this text */}
</h1>
<p className="text-[1.8rem] text-white/70 font-light">
  Create your account  {/* Change this text */}
</p>
```

### Change Font Sizes

```tsx
text-[2.5rem]  // Main heading (current: 40px)
text-[1.8rem]  // Subheading (current: 28.8px)
text-sm        // Small text
text-base      // Normal text
text-lg        // Large text
```

---

## Form Input Customization

### Change Input Styling

```tsx
<input 
  className="w-full backdrop-blur-[1px] bg-transparent text-white 
             border border-white/10 rounded-full py-3 px-4 
             focus:outline-none focus:border-white/30 text-center"
  // Change:
  // rounded-full → rounded-lg (less round)
  // py-3 → py-4 (more padding)
  // text-center → text-left (left-aligned text)
  // border-white/10 → border-blue-500/30 (colored border)
/>
```

### Change Button Styling

```tsx
// Primary button (white)
<button className="rounded-full bg-white text-black font-medium py-3 
                   hover:bg-white/90 transition-colors">
  Sign In
</button>

// Secondary button (transparent)
<button className="rounded-full bg-white/10 text-white font-medium py-3 
                   hover:bg-white/20 transition-colors border border-white/10">
  Back
</button>

// Change colors:
bg-white → bg-blue-500 (blue button)
bg-white/10 → bg-blue-500/10 (blue tint)
```

---

## Navbar Customization

### Change Logo

In `MiniNavbar` component, replace:

```tsx
const logoElement = (
  <Link to="/" className="flex items-center">
    <div className="relative w-5 h-5 flex items-center justify-center">
      {/* Current: 4 dots in cross pattern */}
      {/* Replace with your logo: */}
      <img src="/logo.png" alt="Logo" className="h-5 w-5" />
    </div>
  </Link>
);
```

### Change Nav Links

```tsx
<nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
  <AnimatedNavLink href="/">Home</AnimatedNavLink>
  <AnimatedNavLink href="/about">About</AnimatedNavLink>
  {/* Add more links: */}
  <AnimatedNavLink href="/features">Features</AnimatedNavLink>
  <AnimatedNavLink href="/pricing">Pricing</AnimatedNavLink>
</nav>
```

### Change Navbar Appearance

```tsx
<header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20
                   flex flex-col items-center
                   pl-6 pr-6 py-3 backdrop-blur-sm
                   ${isOpen ? 'rounded-xl' : 'rounded-full'}
                   border border-[#333] bg-[#1f1f1f57]
                   // ^^^^^^^^^^^^^^^^^^^ Change these for different look
                   // border-white/20 bg-black/30 (lighter, more transparent)
                   // border-blue-500/30 bg-blue-950/30 (blue tint)
```

---

## Animation Customization

### Change Transition Speed

```tsx
// Page transitions
<motion.div 
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -100 }}
  transition={{ duration: 0.4, ease: "easeOut" }}  // Change duration (0.2-1.0)
>
```

### Change Slide Direction

```tsx
// Slide from right
initial={{ opacity: 0, x: 100 }}

// Slide from bottom
initial={{ opacity: 0, y: 100 }}

// Fade only
initial={{ opacity: 0 }}
```

### Disable Animations

Set `duration: 0` or remove the `motion.div` wrapper and use regular `div`.

---

## Responsive Design

### Mobile Breakpoints

```tsx
// Show on mobile, hide on desktop
className="sm:hidden"

// Hide on mobile, show on desktop
className="hidden sm:block"

// Different sizes
className="text-sm sm:text-base lg:text-lg"  // Responsive text
className="w-full sm:w-auto"  // Full width on mobile, auto on desktop
className="gap-2 sm:gap-4 lg:gap-6"  // Responsive spacing
```

### Mobile Menu Customization

```tsx
// In MiniNavbar component
<div className={`sm:hidden flex flex-col items-center w-full 
                transition-all ease-in-out duration-300 overflow-hidden
                ${isOpen ? 'max-h-[1000px] opacity-100 pt-4' : 
                          'max-h-0 opacity-0 pt-0 pointer-events-none'}`}>
  // Change max-h-[1000px] if you have more/fewer items
  // Change duration-300 for faster/slower animation
</div>
```

---

## Error Message Styling

```tsx
{error && (
  <div className="bg-red-500/10 border border-red-400/30 p-4 rounded-lg">
    <p className="text-red-200 text-sm font-medium">{error}</p>
  </div>
)}

// Change colors for different severity:
// Warning: bg-yellow-500/10 border-yellow-400/30 text-yellow-200
// Info: bg-blue-500/10 border-blue-400/30 text-blue-200
// Success: bg-green-500/10 border-green-400/30 text-green-200
```

---

## Role Selection (Register Only)

### Change Role Options

```tsx
<div className="grid grid-cols-2 gap-2">
  {[ROLES.CUSTOMER, ROLES.STORE].map((option) => {
    // Add more roles:
    // {[ROLES.CUSTOMER, ROLES.STORE, ROLES.ADMIN].map...
    
    const isActive = role === option
    return (
      <button
        className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
          isActive
            ? "border border-white/30 bg-white/80 text-black"
            : "border border-transparent bg-transparent text-white/70"
        }`}
      >
        <span className="block font-semibold">
          {option === ROLES.CUSTOMER ? "Customer" : "Store"}
        </span>
        <span className="text-xs opacity-70">
          {option === ROLES.CUSTOMER ? "Browse models" : "Sell your AI"}
        </span>
      </button>
    )
  })}
</div>
```

---

## Password Validation

### Change Requirements

```tsx
<div className="text-xs text-white/55 text-left space-y-1">
  <p>Password must contain:</p>
  <ul className="space-y-1 text-white/45 pl-4">
    <li className={password.length >= 6 ? "text-white" : ""}>
      ✓ At least 6 characters  {/* Change minimum length */}
    </li>
    <li className={/[A-Z]/.test(password) ? "text-white" : ""}>
      ✓ One uppercase letter
    </li>
    <li className={/\d/.test(password) ? "text-white" : ""}>
      ✓ One number
    </li>
    {/* Add more: */}
    <li className={/[!@#$%^&*]/.test(password) ? "text-white" : ""}>
      ✓ One special character
    </li>
  </ul>
</div>
```

---

## Loading States

### Change Spinner

```tsx
// Current spinner
<span className="h-4 w-4 animate-spin rounded-full border-2 
                border-black/30 border-t-black" />

// Colored spinner
<span className="h-4 w-4 animate-spin rounded-full border-2 
                border-blue-500/30 border-t-blue-500" />

// Larger spinner
<span className="h-6 w-6 animate-spin rounded-full border-3 
                border-black/30 border-t-black" />
```

---

## Common Customizations

### 1. Brand Colors Throughout

```tsx
// Replace all instances of:
text-white → text-blue-50
border-white/10 → border-blue-500/20
bg-white/10 → bg-blue-500/10
hover:bg-white/20 → hover:bg-blue-500/20
```

### 2. Less Rounded Corners

```tsx
// Replace:
rounded-full → rounded-lg  // Buttons
rounded-2xl → rounded-lg   // Cards
```

### 3. More Contrast

```tsx
// Increase opacity values:
bg-white/10 → bg-white/20
border-white/10 → border-white/20
text-white/70 → text-white/90
```

### 4. Disable Blur Effects

```tsx
// Remove or comment out:
backdrop-blur-[1px]
backdrop-blur-sm
```

---

## Testing Your Changes

1. **Save the file** after making changes
2. **Hot reload** should show changes immediately
3. **Test both mobile and desktop** views
4. **Test all form interactions** (validation, errors, etc.)
5. **Check animations** work smoothly

---

## Need Help?

- Check `SIGNIN_INTEGRATION_SUMMARY.md` for technical details
- Check `SIGNIN_VISUAL_COMPARISON.md` for before/after comparisons
- Review the original `sign-in-flow-1.tsx` for reference
- Test in browser dev tools for responsive design

---

## Pro Tips

1. **Keep animations subtle** - Too much motion can be distracting
2. **Maintain contrast** - White text on white background won't work
3. **Test on real devices** - Emulators don't show true performance
4. **Use consistent spacing** - Stick to Tailwind's spacing scale
5. **Keep forms simple** - Don't add too many steps

---

Happy customizing! 🎨✨

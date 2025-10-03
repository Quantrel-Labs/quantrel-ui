import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden backdrop-blur-glass border",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-white border-white/10 shadow-[0_8px_32px_rgba(0,153,255,0.2)] hover:shadow-[0_20px_60px_rgba(0,153,255,0.3)] hover:scale-[1.02] hover:border-white/20 before:absolute before:inset-0 before:bg-shimmer before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-[600ms] before:ease-out",
        secondary: "bg-glass-bg text-text-primary border-glass-border shadow-glass-sm hover:bg-glass-bg-light hover:border-glass-border-strong hover:shadow-glass hover:scale-[1.01] hover:translate-y-[-1px]",
        destructive: "bg-gradient-to-r from-red-500/80 to-red-600/80 text-white border-red-500/40 shadow-[0_8px_32px_rgba(239,68,68,0.2)] hover:shadow-[0_20px_60px_rgba(239,68,68,0.3)] hover:scale-[1.02]",
        outline: "bg-transparent hover:bg-glass-bg border-glass-border text-text-secondary hover:text-text-primary hover:border-glass-border-strong hover:scale-[1.01] hover:translate-y-[-1px]",
        ghost: "bg-transparent hover:bg-glass-bg/50 border-transparent text-text-secondary hover:text-text-primary hover:scale-[1.01]",
        link: "bg-transparent text-text-accent underline-offset-4 hover:underline border-transparent hover:text-accent-blue"
      },
      size: {
        default: "h-10 px-6 py-2.5 text-sm",
        sm: "h-8 px-4 py-2 text-xs rounded-xl",
        lg: "h-12 px-8 py-3 text-base rounded-3xl",
        xl: "h-14 px-10 py-4 text-lg rounded-3xl",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
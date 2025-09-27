import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 border backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-white/20 to-gray-300/20 text-white hover:from-white/30 hover:to-gray-300/30 border-white/20 hover:scale-105",
        secondary: "bg-white/10 text-white hover:bg-white/15 border-white/20 hover:scale-105",
        destructive: "bg-gradient-to-r from-red-500/30 to-red-600/30 text-white hover:from-red-500/40 hover:to-red-600/40 border-red-500/30 hover:scale-105",
        outline: "bg-transparent hover:bg-white/10 border-white/20 text-white hover:scale-105",
        ghost: "bg-transparent hover:bg-white/10 border-transparent text-white hover:scale-105",
        link: "bg-transparent text-white underline-offset-4 hover:underline border-transparent"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
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
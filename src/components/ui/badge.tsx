import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-white/10 backdrop-blur-sm text-white border-white/20 transition-all duration-300 hover:bg-white/15", className)}
    {...props}
  />
)

export { Badge }
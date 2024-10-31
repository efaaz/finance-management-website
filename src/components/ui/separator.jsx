"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef((
  { className, orientation = "horizontal", decorative = true, ...props },
  ref
) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border my-2 bg-slate-600",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1x]",
      className
    )}
    {...props} />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

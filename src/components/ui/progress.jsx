"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ classNameName, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    classNameName={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      classNameName
    )}
    {...props}>
    <ProgressPrimitive.Indicator
      classNameName="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

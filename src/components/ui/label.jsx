"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "className-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ classNameName, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} classNameName={cn(labelVariants(), classNameName)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

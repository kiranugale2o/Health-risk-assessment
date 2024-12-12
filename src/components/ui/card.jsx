import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ classNameName, ...props }, ref) => (
  <div
    ref={ref}
    classNameName={cn("rounded-xl border bg-card text-card-foreground shadow", classNameName)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ classNameName, ...props }, ref) => (
  <div
    ref={ref}
    classNameName={cn("flex flex-col space-y-1.5 p-6", classNameName)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ classNameName, ...props }, ref) => (
  <div
    ref={ref}
    classNameName={cn("font-semibold leading-none tracking-tight", classNameName)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ classNameName, ...props }, ref) => (
  <div
    ref={ref}
    classNameName={cn("text-sm text-muted-foreground", classNameName)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ classNameName, ...props }, ref) => (
  <div ref={ref} classNameName={cn("p-6 pt-0", classNameName)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ classNameName, ...props }, ref) => (
  <div
    ref={ref}
    classNameName={cn("flex items-center p-6 pt-0", classNameName)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

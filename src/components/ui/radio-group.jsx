"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ classNameName, ...props }, ref) => {
  return (<RadioGroupPrimitive.Root classNameName={cn("grid gap-2", classNameName)} {...props} ref={ref} />);
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ classNameName, ...props }, ref) => {
  return (
    (<RadioGroupPrimitive.Item
      ref={ref}
      classNameName={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        classNameName
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator classNameName="flex items-center justify-center">
        <Circle classNameName="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>)
  );
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

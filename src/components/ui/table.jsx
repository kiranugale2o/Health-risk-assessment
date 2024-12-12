import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef(({ classNameName, ...props }, ref) => (
  <div classNameName="relative w-full overflow-auto">
    <table
      ref={ref}
      classNameName={cn("w-full caption-bottom text-sm", classNameName)}
      {...props} />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef(({ classNameName, ...props }, ref) => (
  <thead ref={ref} classNameName={cn("[&_tr]:border-b", classNameName)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(({ classNameName, ...props }, ref) => (
  <tbody
    ref={ref}
    classNameName={cn("[&_tr:last-child]:border-0", classNameName)}
    {...props} />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef(({ classNameName, ...props }, ref) => (
  <tfoot
    ref={ref}
    classNameName={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", classNameName)}
    {...props} />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef(({ classNameName, ...props }, ref) => (
  <tr
    ref={ref}
    classNameName={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      classNameName
    )}
    {...props} />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef(({ classNameName, ...props }, ref) => (
  <th
    ref={ref}
    classNameName={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      classNameName
    )}
    {...props} />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef(({ classNameName, ...props }, ref) => (
  <td
    ref={ref}
    classNameName={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      classNameName
    )}
    {...props} />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef(({ classNameName, ...props }, ref) => (
  <caption
    ref={ref}
    classNameName={cn("mt-4 text-sm text-muted-foreground", classNameName)}
    {...props} />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[160px] w-full resize-y rounded-xl border border-[#e0d4f7] bg-[#f5f0fb] px-4 py-3 text-sm font-sans text-[#4a3f68] shadow-sm placeholder:text-[#a398bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5b0f7] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

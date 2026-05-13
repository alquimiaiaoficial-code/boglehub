import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-lg border border-border bg-surface-2 px-3 text-sm text-fg placeholder:text-fg-subtle',
        'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-colors',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

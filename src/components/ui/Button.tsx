import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40'
    const variants = {
      primary: 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-600/20',
      secondary: 'bg-surface-2 text-fg border border-border hover:border-border-strong hover:bg-surface-3',
      ghost: 'text-fg-muted hover:text-fg hover:bg-surface',
      accent: 'bg-accent text-bg font-semibold hover:bg-accent-hover shadow-lg shadow-accent/30',
      danger: 'bg-danger-dim text-danger border border-danger/30 hover:bg-danger/20',
    }
    const sizes = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2',
    }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>
        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

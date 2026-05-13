import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showText?: boolean
}

export function Logo({ size = 'md', className, showText = true }: LogoProps) {
  const sizes = {
    sm: { wrapper: 'h-6 gap-1.5', svg: 'h-6 w-6', text: 'text-sm' },
    md: { wrapper: 'h-8 gap-2', svg: 'h-8 w-8', text: 'text-lg' },
    lg: { wrapper: 'h-10 gap-2.5', svg: 'h-10 w-10', text: 'text-2xl' },
  }
  const s = sizes[size]
  return (
    <div className={cn('flex items-center', s.wrapper, className)}>
      <svg viewBox="0 0 32 32" className={s.svg} fill="none">
        <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#logo-grad)" />
        <path d="M11 10v12M11 10h5a3 3 0 010 6h-5M11 16h6a3 3 0 010 6h-6" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="logo-grad" x1="2" y1="2" x2="30" y2="30">
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      {showText && <span className={cn('font-bold tracking-tight text-fg', s.text)}>BogleHub</span>}
    </div>
  )
}

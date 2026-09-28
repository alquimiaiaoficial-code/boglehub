import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-xl border border-border bg-surface p-6', className)} {...props} />
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />
}

// h2 y no h3 (28-sep-2026): muchas páginas ponen una tarjeta justo debajo del h1, y el salto de
// h1 a h3 rompe el esquema de encabezados que usan los lectores de pantalla (Lighthouse,
// «heading-order»). El aspecto no cambia: lo da la clase, no la etiqueta.
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-lg font-semibold text-fg', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-6 pt-4 border-t border-border', className)} {...props} />
}

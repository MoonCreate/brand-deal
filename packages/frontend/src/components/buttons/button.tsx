import { cn } from '@/lib/utils'

export function getButtonStyle() {
  return cn(
    'bg-primary px-2 py-1 rounded-md shadow-box text-white font-bold font-roboto',
    'flex items-center gap-2 hover:bg-primary/70 active:scale-95 transition-transform ease-out',
  )
}

export function Button({
  className,
  children,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button className={cn(getButtonStyle(), className)} {...props}>
      {children}
    </button>
  )
}

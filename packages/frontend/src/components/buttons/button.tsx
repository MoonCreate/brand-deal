import { LucideLoader2 } from 'lucide-react'
import { SplitPopAnimation } from '../text/split-pop-animation'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'outline'
export function getButtonStyle(variant: Variant = 'default') {
  return cn(
    'bg-primary px-2 py-1 rounded-md shadow-box text-white font-bold font-roboto',
    'flex items-center gap-2 hover:bg-primary/70 active:scale-95 transition-transform ease-out',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
    'hover:cursor-pointer',
    variant === "outline" && "bg-transparent border text-black hover:bg-black/5 font-normal"
  )
}

export function Button({
  className,
  children,
  isLoading,
  disabled,
  variant,
  ...props
}: React.ComponentProps<'button'> & {
  isLoading?: boolean,
  variant?: Variant
}) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(getButtonStyle(variant), className)}
      {...props}
    >
      {isLoading ? (
        <>
          <LucideLoader2 className="animate-spin size-4" />
          <span className="block overflow-y-hidden">
            <SplitPopAnimation text="Loading..." />
          </span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

import type { ButtonHTMLAttributes, ReactNode } from 'react'

type DeviceChipProps = {
  children: ReactNode
  onClick?: () => void
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick' | 'className' | 'type'>

/** Compact amber control used for Menu / Scan / game chrome. */
export function DeviceChip({ children, onClick, className, ...rest }: DeviceChipProps) {
  const classes = className ? `device-chip ${className}` : 'device-chip'
  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

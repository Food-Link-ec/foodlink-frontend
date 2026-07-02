import type { ReactNode } from 'react'
import './Alert.css'

interface AlertProps {
  variant?: 'error' | 'success' | 'info'
  title?: string
  children?: ReactNode
}

export default function Alert({ variant = 'info', title, children }: AlertProps) {
  return (
    <div className={`fl-alert fl-alert--${variant}`} role={variant === 'error' ? 'alert' : 'status'}>
      <span className="fl-alert__icon" aria-hidden="true">
        {variant === 'error' ? '!' : variant === 'success' ? '✓' : 'i'}
      </span>
      <div>
        {title && <p className="fl-alert__title">{title}</p>}
        {children && <div className="fl-alert__body">{children}</div>}
      </div>
    </div>
  )
}
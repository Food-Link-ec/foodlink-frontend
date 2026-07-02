import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  isLoading?: boolean
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`fl-btn fl-btn--${variant} ${fullWidth ? 'fl-btn--full' : ''}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? <span className="fl-btn__spinner" aria-hidden="true" /> : null}
      <span>{isLoading ? 'Procesando…' : children}</span>
    </button>
  )
}
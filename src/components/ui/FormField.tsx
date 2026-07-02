import type { ReactNode } from 'react'
import './FormField.css'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  mono?: boolean
  children: ReactNode
}

export default function FormField({ id, label, error, hint, required = false, mono = false, children }: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={`fl-field ${error ? 'fl-field--error' : ''}`}>
      <label htmlFor={id} className="fl-field__label">
        {label} {required && <span className="fl-field__required" aria-hidden="true">*</span>}
      </label>

      <div className={mono ? 'fl-mono' : ''}>{children}</div>

      {hint && !error && <p id={hintId} className="fl-field__hint">{hint}</p>}
      {error && <p id={errorId} className="fl-field__error" role="alert">{error}</p>}
    </div>
  )
}

interface InputAriaParams {
  id: string
  error?: string
  hint?: string | boolean
}

export function inputAria({ id, error, hint }: InputAriaParams) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')
  return {
    id,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy || undefined,
  }
}
import { useCallback, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'

export type Errores<T> = Partial<Record<keyof T, string>>

interface UseFormParams<T extends object> {
  initialValues: T
  validate: (values: T) => Errores<T>
  onSubmit: (values: T) => Promise<void> | void
}

type CampoEvento = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export function useForm<T extends object>({ initialValues, validate, onSubmit }: UseFormParams<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Errores<T>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = useCallback((event: CampoEvento) => {
    const { name, value, type } = event.target
    const checked = (event.target as HTMLInputElement).checked
    
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    

    setErrors((prev) => {
      if (prev[name as keyof T]) {
        const copy = { ...prev }
        delete copy[name as keyof T]
        return copy
      }
      return prev
    })
  }, [])

  const handleBlur = useCallback((event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    
    const currentErrors = validate(values)
    setErrors((prev) => ({ ...prev, [name]: currentErrors[name as keyof T] }))
  }, [validate, values])

  const handleSubmit = useCallback(
    async (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault?.()
      setSubmitError(null)
      setSubmitSuccess(false)

      const errores = validate(values) || {}
      setErrors(errores)
      setTouched(
        (Object.keys(values) as Array<keyof T>).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {} as Partial<Record<keyof T, boolean>>
        )
      )

      if (Object.keys(errores).length > 0) return

      try {
        setIsSubmitting(true)
        await onSubmit(values)
        setSubmitSuccess(true)
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Ocurrió un error inesperado. Intenta nuevamente.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSubmit, validate, values]
  )

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    submitSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    errorFor: (campo: keyof T) => (touched[campo] ? errors[campo] : undefined),
  }
}
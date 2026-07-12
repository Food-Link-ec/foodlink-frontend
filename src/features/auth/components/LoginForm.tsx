import { useForm } from '../../../hooks/useForm'
import FormField, { inputAria } from '../../../components/ui/FormField'
import Button from '../../../components/ui/Button'
import Alert from '../../../components/ui/Alert'
import { iniciarSesion } from '../services/authService'
import type { LoginRequest } from '../types/auth.types'

const VALORES_INICIALES: LoginRequest = { email: '', password: '' }

const validarCredenciales = (values: LoginRequest): Record<string, string> => {
  const errors: Record<string, string> = {}
  if (!values.email) errors.email = 'El correo es obligatorio'
  if (!values.password) errors.password = 'La contraseña es obligatoria'
  return errors
}

export default function LoginForm() {
  const form = useForm<LoginRequest>({
    initialValues: VALORES_INICIALES,
    validate: validarCredenciales,
    onSubmit: async (values) => {
      await iniciarSesion(values)
    },
  })

  if (form.submitSuccess) {
    return (
      <Alert variant="success" title="¡Sesión iniciada!">
        Bienvenido/a de nuevo a FoodLink. En cuanto el panel esté disponible te llevaremos directo ahí.
      </Alert>
    )
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate>
      {form.submitError && (
        <Alert variant="error" title="No pudimos iniciar tu sesión">{form.submitError}</Alert>
      )}

      <FormField id="email" label="Correo electrónico" required error={form.errorFor('email')}>
        <input
          className="fl-input"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="user@correo.com"
          value={form.values.email}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'email', error: form.errorFor('email') })}
        />
      </FormField>

      <FormField id="password" label="Contraseña" required error={form.errorFor('password')}>
        <input
          className="fl-input"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'password', error: form.errorFor('password') })}
        />
      </FormField>

      <Button type="submit" fullWidth isLoading={form.isSubmitting}>Iniciar sesión</Button>
    </form>
  )
}
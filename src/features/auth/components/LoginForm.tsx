import { useForm } from '../../../hooks/useForm'
import FormField, { inputAria } from '../../../components/ui/FormField'
import Button from '../../../components/ui/Button'
import Alert from '../../../components/ui/Alert'
import { iniciarSesion } from '../services/authService'
import { validarCredenciales } from '../validation/authValidation'
import type { Credenciales } from '../types/auth.types'

const VALORES_INICIALES: Credenciales = { correo: '', clave: '' }

export default function LoginForm() {
  const form = useForm<Credenciales>({
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

      <FormField id="correo" label="Correo electrónico" required error={form.errorFor('correo')}>
        <input
          className="fl-input"
          name="correo"
          type="email"
          autoComplete="email"
          placeholder="user@correo.com"
          value={form.values.correo}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'correo', error: form.errorFor('correo') })}
        />
      </FormField>

      <FormField id="clave" label="Contraseña" required error={form.errorFor('clave')}>
        <input
          className="fl-input"
          name="clave"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.values.clave}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'clave', error: form.errorFor('clave') })}
        />
      </FormField>

      <Button type="submit" fullWidth isLoading={form.isSubmitting}>Iniciar sesión</Button>
    </form>
  )
}
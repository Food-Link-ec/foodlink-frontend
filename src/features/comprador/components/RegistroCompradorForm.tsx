import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import FormField, { inputAria } from '../../../components/ui/FormField'
import Button from '../../../components/ui/Button'
import Alert from '../../../components/ui/Alert'
import { registrarComprador } from '../services/compradorService'
import { validarComprador } from '../validation/compradorValidation'
import type { DatosRegistroComprador } from '../types/comprador.types'

const VALORES_INICIALES: DatosRegistroComprador = {
  nombre: '',
  apellido: '',
  cedula: '',
  correo: '',
  telefono: '',
}

export default function RegistroCompradorForm() {
  const navigate = useNavigate()

  const form = useForm<DatosRegistroComprador>({
    initialValues: VALORES_INICIALES,
    validate: validarComprador,
    onSubmit: async (values) => {
      await registrarComprador(values)
    },
  })

  if (form.submitSuccess) {
    return (
      <Alert variant="success" title="¡Cuenta creada!">
        Bienvenido/a a FoodLink, <strong>{form.values.nombre}</strong>. Ya puedes iniciar sesión y reservar
        lotes cerca de ti.{' '}
        <Button variant="ghost" onClick={() => navigate('/login')}>Ir a iniciar sesión</Button>
      </Alert>
    )
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate>
      {form.submitError && (
        <Alert variant="error" title="No pudimos completar el registro">{form.submitError}</Alert>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--fl-space-4)' }}>
        <FormField id="nombre" label="Nombre" required error={form.errorFor('nombre')}>
          <input
            className="fl-input"
            name="nombre"
            placeholder="María"
            value={form.values.nombre}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            {...inputAria({ id: 'nombre', error: form.errorFor('nombre') })}
          />
        </FormField>

        <FormField id="apellido" label="Apellido" required error={form.errorFor('apellido')}>
          <input
            className="fl-input"
            name="apellido"
            placeholder="Torres"
            value={form.values.apellido}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            {...inputAria({ id: 'apellido', error: form.errorFor('apellido') })}
          />
        </FormField>
      </div>

      <FormField id="cedula" label="Cédula" required mono hint="10 dígitos." error={form.errorFor('cedula')}>
        <input
          className="fl-input fl-mono"
          name="cedula"
          inputMode="numeric"
          maxLength={10}
          placeholder="1712345678"
          value={form.values.cedula}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'cedula', error: form.errorFor('cedula'), hint: true })}
        />
      </FormField>

      <FormField id="correo" label="Correo electrónico" required error={form.errorFor('correo')}>
        <input
          className="fl-input"
          name="correo"
          type="email"
          placeholder="tú@ejemplo.com"
          value={form.values.correo}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'correo', error: form.errorFor('correo') })}
        />
      </FormField>

      <FormField id="telefono" label="Teléfono" required error={form.errorFor('telefono')}>
        <input
          className="fl-input"
          name="telefono"
          inputMode="tel"
          placeholder="0991234567"
          value={form.values.telefono}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'telefono', error: form.errorFor('telefono') })}
        />
      </FormField>

      <Button type="submit" fullWidth isLoading={form.isSubmitting}>Crear cuenta de comprador</Button>
    </form>
  )
}
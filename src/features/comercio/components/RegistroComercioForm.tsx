import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import FormField, { inputAria } from '../../../components/ui/FormField'
import Button from '../../../components/ui/Button'
import Alert from '../../../components/ui/Alert'
import PasswordInput from '../../../components/ui/PasswordInput'
import { registrarComercio } from '../services/comercioService'
import { validarComercio } from '../validation/comercioValidation'
import type { DatosRegistroComercio } from '../types/comercio.types'

const VALORES_INICIALES: DatosRegistroComercio = {
  nombre: '',
  ruc: '',
  direccion: '',
  telefono: '',
  correo: '',
<<<<<<< HEAD
  clave: '',
  confirmarClave: '',
=======
  password: '', 
>>>>>>> dev
}

export default function RegistroComercioForm() {
  const navigate = useNavigate()

  const form = useForm<DatosRegistroComercio>({
    initialValues: VALORES_INICIALES,
    validate: validarComercio,
    onSubmit: async (values) => {
      try {
        await registrarComercio(values)
      } catch (error: any) {
        const mensajeReal = error.response?.data?.message || "No pudimos completar el registro"
        throw new Error(mensajeReal)
      }
    },
  })

  if (form.submitSuccess) {
    return (
      <Alert variant="success" title="¡Registro enviado!">
        Verificaremos los datos de <strong>{form.values.nombre}</strong> y te notificaremos por correo
        cuando tu comercio esté habilitado para publicar lotes.{' '}
        <Button variant="ghost" onClick={() => navigate('/login')}>Ir a iniciar sesión</Button>
      </Alert>
    )
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate>
      {form.submitError && (
        <Alert variant="error" title="No pudimos completar el registro">{form.submitError}</Alert>
      )}

      <FormField id="nombre" label="Nombre del comercio" required error={form.errorFor('nombre')}>
        <input
          className="fl-input" name="nombre" placeholder="Ej: Supermercado La Favorita — Sucursal Norte"
          value={form.values.nombre} onChange={form.handleChange} onBlur={form.handleBlur}
          {...inputAria({ id: 'nombre', error: form.errorFor('nombre') })}
        />
      </FormField>

      <FormField id="ruc" label="RUC" required mono hint="13 dígitos, termina en 001." error={form.errorFor('ruc')}>
        <input
          className="fl-input fl-mono" name="ruc" inputMode="numeric" maxLength={13} placeholder="1790012345001"
          value={form.values.ruc} onChange={form.handleChange} onBlur={form.handleBlur}
          {...inputAria({ id: 'ruc', error: form.errorFor('ruc'), hint: true })}
        />
      </FormField>

      <FormField id="direccion" label="Dirección" required error={form.errorFor('direccion')}>
        <input
          className="fl-input" name="direccion" placeholder="Av. Amazonas N34-451 y Av. Atahualpa, Quito"
          value={form.values.direccion} onChange={form.handleChange} onBlur={form.handleBlur}
          {...inputAria({ id: 'direccion', error: form.errorFor('direccion') })}
        />
      </FormField>

      <FormField id="telefono" label="Teléfono" required error={form.errorFor('telefono')}>
        <input
          className="fl-input" name="telefono" inputMode="tel" placeholder="0991234567"
          value={form.values.telefono} onChange={form.handleChange} onBlur={form.handleBlur}
          {...inputAria({ id: 'telefono', error: form.errorFor('telefono') })}
        />
      </FormField>

      <FormField id="correo" label="Correo electrónico" required error={form.errorFor('correo')}>
        <input
          className="fl-input" name="correo" type="email" placeholder="contacto@comercio.com"
          value={form.values.correo} onChange={form.handleChange} onBlur={form.handleBlur}
          {...inputAria({ id: 'correo', error: form.errorFor('correo') })}
        />
      </FormField>

<<<<<<< HEAD
      <FormField id="clave" label="Contraseña" required hint="Mínimo 8 caracteres." error={form.errorFor('clave')}>
        <PasswordInput
          name="clave" autoComplete="new-password" placeholder="••••••••"
          value={form.values.clave} onChange={form.handleChange} onBlur={form.handleBlur}
          {...inputAria({ id: 'clave', error: form.errorFor('clave'), hint: true })}
        />
      </FormField>

      <FormField id="confirmarClave" label="Confirmar contraseña" required error={form.errorFor('confirmarClave')}>
        <PasswordInput
          name="confirmarClave" autoComplete="new-password" placeholder="••••••••"
          value={form.values.confirmarClave} onChange={form.handleChange} onBlur={form.handleBlur}
          {...inputAria({ id: 'confirmarClave', error: form.errorFor('confirmarClave') })}
=======
      <FormField id="password" label="Contraseña" required hint="Mínimo 8 caracteres." error={form.errorFor('password')}>
        <PasswordInput
          name="password"
          placeholder="••••••••"
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'password', error: form.errorFor('password'), hint: true })}
>>>>>>> dev
        />
      </FormField>

      <Button type="submit" fullWidth isLoading={form.isSubmitting}>Registrar comercio</Button>
    </form>
  )
}
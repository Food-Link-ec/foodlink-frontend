import type { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import FormField, { inputAria } from '../../../components/ui/FormField'
import Button from '../../../components/ui/Button'
import Alert from '../../../components/ui/Alert'
import PasswordInput from '../../../components/ui/PasswordInput'
import { registrarBeneficiario } from '../services/beneficiarioService'
import { validarBeneficiario } from '../validation/beneficiarioValidation'
import type { DatosRegistroBeneficiario } from '../types/beneficiario.types'
import './FileField.css'

const VALORES_INICIALES: DatosRegistroBeneficiario = {
  nombre: '',
  ruc: '',
  direccion: '',
  telefono: '',
  correo: '',
  clave: '',
  confirmarClave: '',
  archivoDocumento: null,
  password: '',
}

export default function RegistroBeneficiarioForm() {
  const navigate = useNavigate()

  const form = useForm<DatosRegistroBeneficiario>({
    initialValues: VALORES_INICIALES,
    validate: validarBeneficiario,
    onSubmit: async (values) => {
      await registrarBeneficiario(values)
    },
  })

const handleArchivo = (event: ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0] ?? null
    form.handleChange({
      target: { name: 'archivoDocumento', value: archivo },
    } as unknown as ChangeEvent<HTMLInputElement>)
  }

  if (form.submitSuccess) {
    return (
      <Alert variant="success" title="¡Solicitud enviada!">
        Recibimos la documentación de <strong>{form.values.nombre}</strong>. Nuestro equipo la revisará en un
        máximo de 48 horas hábiles y te avisaremos a <strong>{form.values.correo}</strong> cuando esté verificada.{' '}
        <Button variant="ghost" onClick={() => navigate('/login')}>Ir a iniciar sesión</Button>
      </Alert>
    )
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate>
      {form.submitError && (
        <Alert variant="error" title="No pudimos completar el registro">{form.submitError}</Alert>
      )}

      <FormField id="nombre" label="Nombre de la organización" required error={form.errorFor('nombre')}>
        <input
          className="fl-input" name="nombre" placeholder="Ej: Fundación Banco de Alimentos Quito"
          value={form.values.nombre} onChange={form.handleChange} onBlur={form.handleBlur}
          {...inputAria({ id: 'nombre', error: form.errorFor('nombre') })}
        />
      </FormField>

      <FormField id="ruc" label="RUC" required mono hint="13 dígitos, termina en 001." error={form.errorFor('ruc')}>
        <input
          className="fl-input fl-mono" name="ruc" inputMode="numeric" maxLength={13} placeholder="1791234567001"
          value={form.values.ruc} onChange={form.handleChange} onBlur={form.handleBlur}
          {...inputAria({ id: 'ruc', error: form.errorFor('ruc'), hint: true })}
        />
      </FormField>

      <FormField id="direccion" label="Dirección" required error={form.errorFor('direccion')}>
        <input
          className="fl-input" name="direccion" placeholder="Calle Iñaquito N45-12, Quito"
          value={form.values.direccion} onChange={form.handleChange} onBlur={form.handleBlur}
          {...inputAria({ id: 'direccion', error: form.errorFor('direccion') })}
        />
      </FormField>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--fl-space-4)' }}>
        <FormField id="telefono" label="Teléfono" required error={form.errorFor('telefono')}>
          <input
            className="fl-input" name="telefono" inputMode="tel" placeholder="0991234567"
            value={form.values.telefono} onChange={form.handleChange} onBlur={form.handleBlur}
            {...inputAria({ id: 'telefono', error: form.errorFor('telefono') })}
          />
        </FormField>

        <FormField id="correo" label="Correo electrónico" required error={form.errorFor('correo')}>
          <input
            className="fl-input" name="correo" type="email" placeholder="contacto@fundacion.org"
            value={form.values.correo} onChange={form.handleChange} onBlur={form.handleBlur}
            {...inputAria({ id: 'correo', error: form.errorFor('correo') })}
          />
        </FormField>
      </div>

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
        />
      </FormField>

      <FormField
        id="archivoDocumento"
        label="Documentación de validación"
        required
        hint="RUC/estatuto o nombramiento del representante legal. PDF, JPG o PNG, máx. 5MB."
        error={form.errorFor('archivoDocumento')}
      >
        <label className="fl-file" htmlFor="archivoDocumento">
          <span className="fl-file__icon" aria-hidden="true">⬆</span>
          <span>{form.values.archivoDocumento?.name || 'Selecciona un archivo…'}</span>
        </label>
        <input
          className="fl-visually-hidden" type="file" name="archivoDocumento" accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleArchivo} onBlur={form.handleBlur}
{...inputAria({ id: 'archivoDocumento', error: form.errorFor('archivoDocumento'), hint: true })}        />
      </FormField>

      <Button type="submit" fullWidth isLoading={form.isSubmitting}>Registrar beneficiario</Button>
    </form>
  )
}
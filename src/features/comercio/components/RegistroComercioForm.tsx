import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import FormField, { inputAria } from '../../../components/ui/FormField'
import Button from '../../../components/ui/Button'
import Alert from '../../../components/ui/Alert'
import { registrarComercio } from '../services/comercioService'
import { validarComercio } from '../validation/comercioValidation'
import type { DatosRegistroComercio } from '../types/comercio.types'

const VALORES_INICIALES: DatosRegistroComercio = {
  nombre: '',
  ruc: '',
  direccion: '',
  telefono: '',
  correo: '',
  password: '', 
 }

export default function RegistroComercioForm() {
  const navigate = useNavigate()
  // Estado local solo para manejar la vista del ojito
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<DatosRegistroComercio>({
    initialValues: VALORES_INICIALES,
    validate: validarComercio,
    onSubmit: async (values) => {
      await registrarComercio(values)
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
          className="fl-input"
          name="nombre"
          placeholder="Ej: Supermercado La Favorita — Sucursal Norte"
          value={form.values.nombre}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'nombre', error: form.errorFor('nombre') })}
        />
      </FormField>

      <FormField id="ruc" label="RUC" required mono hint="13 dígitos, termina en 001." error={form.errorFor('ruc')}>
        <input
          className="fl-input fl-mono"
          name="ruc"
          inputMode="numeric"
          maxLength={13}
          placeholder="1790012345001"
          value={form.values.ruc}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'ruc', error: form.errorFor('ruc'), hint: true })}
        />
      </FormField>

      <FormField id="direccion" label="Dirección" required error={form.errorFor('direccion')}>
        <input
          className="fl-input"
          name="direccion"
          placeholder="Av. Amazonas N34-451 y Av. Atahualpa, Quito"
          value={form.values.direccion}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'direccion', error: form.errorFor('direccion') })}
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

      <FormField id="correo" label="Correo electrónico" required error={form.errorFor('correo')}>
        <input
          className="fl-input"
          name="correo"
          type="email"
          placeholder="contacto@comercio.com"
          value={form.values.correo}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          {...inputAria({ id: 'correo', error: form.errorFor('correo') })}
        />
      </FormField>

      <FormField id="password" label="Contraseña" required error={form.errorFor('password')}>
        <div style={{ position: 'relative' }}>
          <input
            className="fl-input"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            style={{ paddingRight: '40px', width: '100%', boxSizing: 'border-box' }}
            {...inputAria({ id: 'password', error: form.errorFor('password') })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#667A70',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0
            }}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            )}
          </button>
        </div>
      </FormField>

      <Button type="submit" fullWidth isLoading={form.isSubmitting}>Registrar comercio</Button>
    </form>
  )
}
import AuthLayout from '../../components/layout/AuthLayout'
import RegisterTypeTabs from '../../components/layout/RegisterTypeTabs'
import RegistroCompradorForm from '../../features/comprador/components/RegistroCompradorForm'

export default function RegistroCompradorPage() {
  return (
    <AuthLayout
      eyebrow="Registro · Comprador"
      title="Comida de calidad, a un mejor precio."
      description="Crea tu cuenta para reservar lotes de excedentes alimentarios con descuento en los comercios más cercanos a ti."
      stat="3.4k"
      statLabel="compradores registrados"
      backTo="/login"
      backLabel="Volver a iniciar sesión"
    >
      <RegisterTypeTabs />
      <p className="fl-eyebrow">Cuenta personal</p>
      <h2 style={{ marginTop: 4, marginBottom: 'var(--fl-space-5)' }}>Crea tu cuenta</h2>

      <RegistroCompradorForm />
    </AuthLayout>
  )
}
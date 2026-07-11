import AuthLayout from '../../../components/layout/AuthLayout'
import RegisterTypeTabs from '../../../components/layout/RegisterTypeTabs'
import RegistroBeneficiarioForm from '../components/RegistroBeneficiarioForm'

export default function RegistroBeneficiarioPage() {
  return (
    <AuthLayout
      eyebrow="Registro · Beneficiario"
      title="Alimento de calidad para quienes más lo necesitan."
      description="Regístrate como organización benéfica para recibir donaciones directas de comercios verificados. Validamos tu documentación en menos de 48 horas."
      stat="46"
      statLabel="organizaciones verificadas en Quito"
      backTo="/login"
      backLabel="Volver a iniciar sesión"
    >
      <RegisterTypeTabs />
      <p className="fl-eyebrow">Verificación requerida</p>
      <h2 style={{ marginTop: 4, marginBottom: 'var(--fl-space-5)' }}>Registra tu organización</h2>

      <RegistroBeneficiarioForm />
    </AuthLayout>
  )
}
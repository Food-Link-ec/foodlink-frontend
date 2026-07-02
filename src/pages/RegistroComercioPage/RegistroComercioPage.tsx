import AuthLayout from '../../components/layout/AuthLayout'
import RegisterTypeTabs from '../../components/layout/RegisterTypeTabs'
import RegistroComercioForm from '../../features/comercio/components/RegistroComercioForm'

export default function RegistroComercioPage() {
  return (
    <AuthLayout
      eyebrow="Registro · Comercio"
      title="Convierte tu excedente en impacto, no en basura."
      description="Publica lotes de comida próxima a vencer, define si se donan, se retiran o se venden a bajo costo, y llega a beneficiarios y compradores cerca de tu local."
      stat="180+"
      statLabel="comercios activos en Quito"
      backTo="/login"
      backLabel="Volver a iniciar sesión"
    >
      <RegisterTypeTabs />
      <p className="fl-eyebrow">Paso único</p>
      <h2 style={{ marginTop: 4, marginBottom: 'var(--fl-space-5)' }}>Registra tu comercio</h2>

      <RegistroComercioForm />
    </AuthLayout>
  )
}
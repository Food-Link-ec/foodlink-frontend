import { Link } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import LoginForm from '../../features/auth/components/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Acceso a la plataforma"
      title="Cada lote a tiempo es comida que no se pierde."
      description="Inicia sesión para publicar excedentes, reservar lotes o gestionar tu organización beneficiaria en FoodLink Quito."
      stat="+1.200"
      statLabel="kg de alimentos redistribuidos este mes"
    >
      <p className="fl-eyebrow">Iniciar sesión</p>
      <h2 style={{ marginTop: 4, marginBottom: 'var(--fl-space-5)' }}>Bienvenido de nuevo</h2>

      <LoginForm />

      <p style={{ marginTop: 'var(--fl-space-5)', fontSize: 'var(--fl-fs-sm)', color: 'var(--fl-ink-soft)', textAlign: 'center' }}>
        ¿Aún no tienes una cuenta?{' '}
        <Link to="/registro/comercio" style={{ fontWeight: 600 }}>Regístrate en FoodLink</Link>
      </p>
    </AuthLayout>
  )
}
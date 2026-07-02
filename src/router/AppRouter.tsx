import { Navigate, Route, Routes } from 'react-router-dom'
import RegistroComercioPage from '../pages/RegistroComercioPage/RegistroComercioPage'
import RegistroBeneficiarioPage from '../pages/RegistroBeneficiario/RegistroBeneficiarioPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registro/comercio" replace />} />
      <Route path="/registro/comercio" element={<RegistroComercioPage />} />
      <Route path="/registro/beneficiario" element={<RegistroBeneficiarioPage />} />
      <Route path="*" element={<Navigate to="/registro/comercio" replace />} />
    </Routes>
  )
}
import { Navigate, Route, Routes } from 'react-router-dom'
import RegistroComercioPage from '../pages/RegistroComercioPage/RegistroComercioPage'
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registro/comercio" replace />} />
      <Route path="/registro/comercio" element={<RegistroComercioPage />} />
      <Route path="*" element={<Navigate to="/registro/comercio" replace />} />
    </Routes>
  )
}
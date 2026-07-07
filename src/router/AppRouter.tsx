import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from '../features/public/pages/LandingPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import RegistroComercioPage from '../features/comercio/pages/RegistroComercioPage';
import RegistroBeneficiarioPage from '../features/beneficiario/pages/RegistroBeneficiarioPage';
import RegistroCompradorPage from '../features/comprador/pages/RegistroCompradorPage';
import DashboardComercioPage from '../features/comercio/pages/DashboardComercioPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro/comercio" element={<RegistroComercioPage />} />
      <Route path="/registro/beneficiario" element={<RegistroBeneficiarioPage />} />
      <Route path="/registro/comprador" element={<RegistroCompradorPage />} />
      <Route path="/dashboard" element={<DashboardComercioPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
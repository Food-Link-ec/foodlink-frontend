import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from '../features/public/pages/LandingPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import RegistroComercioPage from '../features/comercio/pages/RegistroComercioPage';
import RegistroBeneficiarioPage from '../features/beneficiario/pages/RegistroBeneficiarioPage';
import RegistroCompradorPage from '../features/comprador/pages/RegistroCompradorPage';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'; 
import NuevoLotePage from '../features/comercio/pages/NuevoLotePage';
import ReservasComercioPage from '../features/comercio/pages/ReservasComercioPage';
import MisLotesPage from '../features/comercio/pages/MisLotesPage';
import ImpactoComercioPage from '../features/comercio/pages/ImpactoComercioPage';
import ConfiguracionComercioPage from '../features/comercio/pages/ConfiguracionComercioPage';
import NotificacionesComercioPage from '../features/comercio/pages/NotificacionesComercioPage';

const RutaProtegida = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro/comercio" element={<RegistroComercioPage />} />
      <Route path="/registro/beneficiario" element={<RegistroBeneficiarioPage />} />
      <Route path="/registro/comprador" element={<RegistroCompradorPage />} />

      <Route 
        path="/dashboard" 
        element={
          <RutaProtegida>
            <DashboardPage />
          </RutaProtegida>
        } 
      />

      <Route 
        path="/dashboard/comercio/nuevo-lote" 
        element={
          <RutaProtegida>
            <NuevoLotePage />
          </RutaProtegida>
        } 
      />

      <Route 
        path="/dashboard/comercio/reservas" 
        element={
          <RutaProtegida>
            <ReservasComercioPage />
          </RutaProtegida>
        } 
      />

      <Route 
        path="/dashboard/comercio/mis-lotes" 
        element={
          <RutaProtegida>
            <MisLotesPage />
          </RutaProtegida>
        } 
      />

      <Route 
        path="/dashboard/comercio/impacto" 
        element={
          <RutaProtegida>
            <ImpactoComercioPage />
          </RutaProtegida>
        } 
      />

      <Route 
        path="/dashboard/comercio/configuracion" 
        element={
          <RutaProtegida>
            <ConfiguracionComercioPage />
          </RutaProtegida>
        } 
      />

      <Route 
        path="/dashboard/comercio/notificaciones" 
        element={
          <RutaProtegida>
            <NotificacionesComercioPage />
          </RutaProtegida>
        } 
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
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
import PerfilComercioPage from '../features/comercio/pages/PerfilComercioPage';
// Beneficiario
import ExplorarLotesBeneficiarioPage from '../features/beneficiario/pages/ExplorarLotesBeneficiarioPage';
import MisSolicitudesPage from '../features/beneficiario/pages/MisSolicitudesPage';
import ImpactoBeneficiarioPage from '../features/beneficiario/pages/ImpactoBeneficiarioPage';
import ConfiguracionBeneficiarioPage from '../features/beneficiario/pages/ConfiguracionBeneficiarioPage';
import ExplorarLotesPage from '../features/comprador/pages/ExplorarLotesPage';
import DetalleLotePage from '../features/comprador/pages/DetalleLotePage';
import ConfirmacionReservaPage from '../features/comprador/pages/ConfirmacionReservaPage';
import MisPedidosPage from '../features/comprador/pages/MisPedidosPage';
import ImpactoPersonalPage from '../features/comprador/pages/ImpactoPersonalPage';
import ConfiguracionPage from '../features/comprador/pages/ConfiguracionPage';

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
      {/* Públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro/comercio" element={<RegistroComercioPage />} />
      <Route path="/registro/beneficiario" element={<RegistroBeneficiarioPage />} />
      <Route path="/registro/comprador" element={<RegistroCompradorPage />} />

      {/* Dashboard general (redirige según rol) */}
      <Route path="/dashboard" element={<RutaProtegida><DashboardPage /></RutaProtegida>} />

      {/* Comercio */}
      <Route path="/dashboard/comercio/nuevo-lote" element={<RutaProtegida><NuevoLotePage /></RutaProtegida>} />
      <Route path="/dashboard/comercio/reservas" element={<RutaProtegida><ReservasComercioPage /></RutaProtegida>} />
      <Route path="/dashboard/comercio/mis-lotes" element={<RutaProtegida><MisLotesPage /></RutaProtegida>} />
      <Route path="/dashboard/comercio/impacto" element={<RutaProtegida><ImpactoComercioPage /></RutaProtegida>} />
      <Route path="/dashboard/comercio/configuracion" element={<RutaProtegida><ConfiguracionComercioPage /></RutaProtegida>} />
      <Route path="/dashboard/comercio/notificaciones" element={<RutaProtegida><NotificacionesComercioPage /></RutaProtegida>} />
      <Route path="/dashboard/comercio/perfil" element={<RutaProtegida><PerfilComercioPage /></RutaProtegida>} />

      {/* Beneficiario */}
      <Route path="/dashboard/beneficiario/lotes" element={<RutaProtegida><ExplorarLotesBeneficiarioPage /></RutaProtegida>} />
      <Route path="/dashboard/beneficiario/solicitudes" element={<RutaProtegida><MisSolicitudesPage /></RutaProtegida>} />
      <Route path="/dashboard/beneficiario/impacto" element={<RutaProtegida><ImpactoBeneficiarioPage /></RutaProtegida>} />
      <Route path="/dashboard/beneficiario/configuracion" element={<RutaProtegida><ConfiguracionBeneficiarioPage /></RutaProtegida>} />

      {/* Comprador */}      <Route path="/dashboard/comprador" element={<RutaProtegida><ExplorarLotesPage /></RutaProtegida>} />
      <Route path="/dashboard/comprador/lote/:id" element={<RutaProtegida><DetalleLotePage /></RutaProtegida>} />
      <Route path="/dashboard/comprador/confirmacion/:id" element={<RutaProtegida><ConfirmacionReservaPage /></RutaProtegida>} />
      <Route path="/dashboard/comprador/pedidos" element={<RutaProtegida><MisPedidosPage /></RutaProtegida>} />
      <Route path="/dashboard/comprador/impacto" element={<RutaProtegida><ImpactoPersonalPage /></RutaProtegida>} />
      <Route path="/dashboard/comprador/configuracion" element={<RutaProtegida><ConfiguracionPage /></RutaProtegida>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
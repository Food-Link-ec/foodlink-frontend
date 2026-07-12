import { Navigate } from 'react-router-dom';
import DashboardComercioPage from '../../comercio/pages/DashboardComercioPage';
import DashboardBeneficiarioPage from '../../beneficiario/pages/DashboardBeneficiario';
import ExplorarLotesPage from '../../comprador/pages/ExplorarLotesPage';

export const DashboardPage = () => {
  const tipoUsuario = (localStorage.getItem('tipoUsuario') || '').trim().toUpperCase();

  switch (tipoUsuario) {
    case 'COMERCIO':
      return <DashboardComercioPage />;
    case 'BENEFICIARIO':
      return <DashboardBeneficiarioPage />;
    case 'COMPRADOR':
      return <ExplorarLotesPage />;
    default:
      return <Navigate to="/login" replace />;
  }
};
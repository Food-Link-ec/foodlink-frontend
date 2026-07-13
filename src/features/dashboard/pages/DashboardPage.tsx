import { Navigate } from 'react-router-dom';
import DashboardComercioPage from '../../comercio/pages/DashboardComercioPage';
import DashboardBeneficiario from '../../beneficiario/pages/DashboardBeneficiario';
import ExplorarLotesPage from '../../comprador/pages/ExplorarLotesPage';
import AdminDashboardPage from '../../admin/pages/AdminDashboardPage';

export const DashboardPage = () => {
  const tipoUsuario = (localStorage.getItem('tipoUsuario') || '').trim().toUpperCase();

  switch (tipoUsuario) {
    case 'COMERCIO':
      return <DashboardComercioPage />;
    case 'BENEFICIARIO':
      return <DashboardBeneficiario />;
    case 'COMPRADOR':
      return <ExplorarLotesPage />;
    case 'ADMIN':
      return <AdminDashboardPage />;
    default:
      return <Navigate to="/login" replace />;
  }
};
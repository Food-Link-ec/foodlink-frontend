import { Navigate } from 'react-router-dom';
import DashboardComercioPage from '../../comercio/pages/DashboardComercioPage';
import DashboardBeneficiarioPage from '../../beneficiario/pages/DashboardBeneficiario';
import DashboardComprador from '../../comprador/pages/DashboardComprador';
import DashboardLayout from '../../../components/layout/DashboardLayout';

export const DashboardPage = () => {
  const tipoUsuario = (localStorage.getItem('tipoUsuario') || 'COMERCIO').trim().toUpperCase();

  const renderDashboard = () => {
    switch (tipoUsuario) {
      case 'COMERCIO':
        return <DashboardComercioPage />;
      case 'BENEFICIARIO':
        return <DashboardBeneficiarioPage />;
      case 'COMPRADOR':
        return <DashboardComprador />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};
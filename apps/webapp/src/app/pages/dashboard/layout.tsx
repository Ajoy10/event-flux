import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../../components/protected-route';

export default function DashboardLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

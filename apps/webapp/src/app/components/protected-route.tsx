import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/stores/useAuth';
import { ReactNode } from 'react';

type ProtectedRoutePropType = {
  children: ReactNode;
};

export default function ProtectedRoute(props: ProtectedRoutePropType) {
  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return <>Redirecting to login</>;
  } else {
    return <>{props.children}</>;
  }
}

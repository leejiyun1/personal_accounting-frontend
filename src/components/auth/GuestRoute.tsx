import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/storage';

interface GuestRouteProps {
  children: ReactNode;
}

function GuestRoute({ children }: GuestRouteProps) {
  const token = getAccessToken();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default GuestRoute;

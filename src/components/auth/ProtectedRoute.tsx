import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../../utils/storage';

interface ProtectedRouteProps {
  children?: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (children) {
    return <>{children}</>;
  }

  return <Outlet />;
}

export default ProtectedRoute;

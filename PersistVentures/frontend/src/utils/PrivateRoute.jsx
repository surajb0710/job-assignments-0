import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteForUnAuthUser = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const PrivateRouteForAuthUser = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export { PrivateRouteForAuthUser, PrivateRouteForUnAuthUser };

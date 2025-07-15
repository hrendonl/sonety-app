import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../context/AppProvider';

export default function ProtectedRoute() {
  const { token } = useContext(AppContext);
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, permite el acceso a las rutas hijas
  return <Outlet />;
}

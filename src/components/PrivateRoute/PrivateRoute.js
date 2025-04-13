import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
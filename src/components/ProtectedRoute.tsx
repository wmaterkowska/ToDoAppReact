
import { getAuthObject } from '../services/authService';

interface ProtectedRouteProps {
  children: any
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

  console.log(getAuthObject());
  if (getAuthObject()) {

    return children;
  } else {
    return window.location.href = '/'
  }
};

export default ProtectedRoute;
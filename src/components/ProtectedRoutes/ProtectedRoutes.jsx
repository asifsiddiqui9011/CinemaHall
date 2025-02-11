import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../../Context/AdminContext';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ element, roles = [] }) => {
 

        const token = localStorage.getItem('auth-token');
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        
     

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string)
};

export default ProtectedRoute;
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useGlobals } from 'src/hooks/useGlobals';
const ProtectedRoute = ({ children }) => {
  const { getUser } = useGlobals();

  const user = getUser();
  if (!user) {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Navigate to="/login" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  user: PropTypes.object,
};

export default ProtectedRoute;

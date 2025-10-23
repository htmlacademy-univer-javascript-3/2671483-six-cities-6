import { Navigate } from 'react-router-dom';

import { AppRoute } from '../shared/config/route';
import { AuthorizationStatus } from '../shared/config/auth-status';

type PrivateRouteProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
};

function PrivateRoute({ children, authorizationStatus }: PrivateRouteProps) {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;

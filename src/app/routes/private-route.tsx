import { Navigate, Outlet } from 'react-router-dom';

import { AuthorizationStatus } from '../../shared/config/auth-status';
import { AppRoute } from '../../shared/config/route';
import { useAppSelector } from '../../shared/lib/hooks/redux';

function PrivateRoute() {
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;

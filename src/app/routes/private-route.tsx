import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../shared/lib/hooks/redux';

import { selectIsAuthorized } from '../../entities/user/model/user.selectors';

import { AppRoute } from '../../shared/config/route';

function PrivateRoute() {
  const isAuth = useAppSelector(selectIsAuthorized);

  return isAuth ? <Outlet /> : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;

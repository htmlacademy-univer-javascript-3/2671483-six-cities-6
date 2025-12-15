import { Link } from 'react-router-dom';
import { logoutAction } from '../../../entities/user/model/user.thunks';
import { AuthorizationStatus } from '../../../shared/config/auth-status';
import { AppRoute } from '../../../shared/config/route';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/redux';

function UserNavigation() {
  const { authorizationStatus, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleSignOut = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth && (
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                {user?.email}
              </span>
              <span className="header__favorite-count">3</span>
            </Link>
          </li>
        )}
        <li className="header__nav-item">
          {isAuth ? (
            <a className="header__nav-link" href="#" onClick={handleSignOut}>
              <span className="header__signout">Sign out</span>
            </a>
          ) : (
            <Link className="header__nav-link" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default UserNavigation;

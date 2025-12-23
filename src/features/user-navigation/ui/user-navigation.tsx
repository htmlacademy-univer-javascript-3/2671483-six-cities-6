import { Link } from 'react-router-dom';
import { getFavoriteOffers } from '../../../entities/offer/model/offers.selectors';
import {
  selectIsAuthorized,
  selectUserData,
} from '../../../entities/user/model/user.selectors';
import { logoutAction } from '../../../entities/user/model/user.thunks';
import { AppRoute } from '../../../shared/config/route';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/redux';

function UserNavigation() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserData);
  const isAuth = useAppSelector(selectIsAuthorized);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const favoriteCount = favoriteOffers.length;

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
              {favoriteCount > 0 && (
                <span className="header__favorite-count">{favoriteCount}</span>
              )}
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

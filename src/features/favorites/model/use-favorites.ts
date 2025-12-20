import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../../shared/config/auth-status';
import { AppRoute } from '../../../shared/config/route';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/redux';
import { toggleFavoriteAction } from './favorites.thunks';

export const useFavorites = (offerId: string, isFavorite: 0 | 1) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );

  const toggleFavorite = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    const status = isFavorite ? 0 : 1;

    dispatch(toggleFavoriteAction({ offerId, status }));
  };

  return { toggleFavorite };
};

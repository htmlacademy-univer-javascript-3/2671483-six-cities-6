import { useNavigate } from 'react-router-dom';
import { selectIsAuthorized } from '../../../entities/user/model/user.selectors';
import { AppRoute } from '../../../shared/config/route';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/redux';
import { toggleFavoriteAction } from './favorites.thunks';

export const useFavorites = (offerId: string, isFavorite: 0 | 1) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuthorized);

  const toggleFavorite = () => {
    if (isAuth) {
      navigate(AppRoute.Login);
      return;
    }
    const status = isFavorite ? 0 : 1;

    dispatch(toggleFavoriteAction({ offerId, status }));
  };

  return { toggleFavorite };
};

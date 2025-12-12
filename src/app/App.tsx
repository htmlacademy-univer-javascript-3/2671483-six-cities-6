import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FavoritesPage from '../pages/FavoritesPage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import OfferPage from '../pages/OfferPage';
import PrivateRoute from './routes/PrivateRoute';

import { fetchOffersAction } from '../entities/offer/model/offers.thunks';
import { AuthorizationStatus } from '../shared/config/auth-status';
import { LIMIT } from '../shared/config/const';
import { AppRoute } from '../shared/config/route';
import { useAppDispatch } from '../shared/lib/hooks/redux';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage limit={LIMIT} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage limit={LIMIT} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

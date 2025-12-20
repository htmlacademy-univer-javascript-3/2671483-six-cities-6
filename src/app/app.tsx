import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { fetchOffersAction } from '../entities/offer/model/offers.thunks';
import { checkAuthAction } from '../entities/user/model/user.thunks';
import { useAppDispatch } from '../shared/lib/hooks/redux';
import PrivateRoute from './routes/private-route';

import FavoritesPage from '../pages/favorites-page';
import LoginPage from '../pages/login-page';
import MainPage from '../pages/main-page';
import NotFoundPage from '../pages/not-found-page';
import OfferPage from '../pages/offer-page';

import { LIMIT } from '../shared/config/const';
import { AppRoute } from '../shared/config/route';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage limit={LIMIT} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path={AppRoute.Favorites} element={<FavoritesPage />} />
        </Route>
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={AppRoute.NotFound} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

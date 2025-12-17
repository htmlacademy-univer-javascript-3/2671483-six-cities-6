import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { fetchOffersAction } from '../entities/offer/model/offers.thunks';
import { checkAuthAction } from '../entities/user/model/user.thunks';
import { useAppDispatch } from '../shared/lib/hooks/redux';
import PrivateRoute from './routes/PrivateRoute';

import FavoritesPage from '../pages/FavoritesPage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import OfferPage from '../pages/OfferPage';

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

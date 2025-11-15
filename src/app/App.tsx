import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import FavoritesPage from '../pages/FavoritesPage';
import OfferPage from '../pages/OfferPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './routes/PrivateRoute';

import { LIMIT } from '../shared/config/const';
import { AppRoute } from '../shared/config/route';
import { AuthorizationStatus } from '../shared/config/auth-status';

import { offers } from '../mocks/offers';
import { CITY } from '../mocks/city';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage offers={offers} city={CITY} limit={LIMIT} />}
        />
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

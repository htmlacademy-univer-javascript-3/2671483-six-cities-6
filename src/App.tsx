import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';
import OfferPage from './pages/OfferPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/routes/PrivateRoute';

import { LIMIT, AppRoute, AuthorizationStatus } from './const';

import { offers } from './mocks/offers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage offers={offers} limit={LIMIT} />}
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage offers={offers} limit={LIMIT} />
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

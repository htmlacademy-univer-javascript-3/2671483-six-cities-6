import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

import citiesData from './data/citiesData.json';
import { LIMIT, AppRoute, AuthorizationStatus } from './const';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';
import OfferPage from './pages/OfferPage';
import PrivateRoute from './components/routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage data={citiesData} limit={LIMIT} />}
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage />
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

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

import citiesData from './data/citiesData.json';
import { LIMIT, AppRoute } from './const';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage data={citiesData} limit={LIMIT} />}
        />
        <Route path={AppRoute.Login} />
        <Route path={AppRoute.Favorites} />
        <Route path={AppRoute.Offer} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

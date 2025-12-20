import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../features/favorites/model/favorites.thunks';
import { useAppDispatch } from '../../shared/lib/hooks/redux';
import { FavoritesList } from '../../widgets/favorites-list';
import { Header } from '../../widgets/header';

// type FavoritesPageProps = {
//   limit: number;
// };

function FavoritesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoritesList />
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;

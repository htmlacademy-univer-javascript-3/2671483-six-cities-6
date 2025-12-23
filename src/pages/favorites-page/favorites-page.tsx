import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../features/favorites/model/favorites.thunks';
import { useAppDispatch } from '../../shared/lib/hooks/redux';
import { Logo } from '../../shared/ui';
import { FavoritesList } from '../../widgets/favorites-list';
import { Header } from '../../widgets/header';

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
        <Logo block="footer" width={64} height={33} />
      </footer>
    </div>
  );
}

export default FavoritesPage;

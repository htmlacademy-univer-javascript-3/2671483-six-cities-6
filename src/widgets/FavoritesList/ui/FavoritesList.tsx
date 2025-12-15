import { PlaceCard } from '../../../entities/PlaceCard';
import { Loader } from '../../../shared/ui/Loader';
import { useFavoritesList } from '../model/useFavoritesList';

export function FavoritesList(): JSX.Element {
  const { isFavoritesEmpty, isLoading, hasError, cityNames, groupedOffers } =
    useFavoritesList();

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return <p>Failed to load favorite offers</p>;
  }

  if (isFavoritesEmpty) {
    return (
      <section className="favorites favorites--empty">
        <h1 className="visually-hidden">Favorites (empty)</h1>
        <div className="favorites__status-wrapper">
          <b className="favorites__status">Nothing yet saved.</b>
          <p className="favorites__status-description">
            Save properties to narrow down search or plan your future trips.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cityNames.map((cityName) => (
          <li key={cityName} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{cityName}</span>
                </a>
              </div>
            </div>
            {groupedOffers[cityName].map((offer) => (
              <PlaceCard
                key={offer.id}
                offer={offer}
                orientation="horizontal"
              />
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

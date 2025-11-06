import { useState } from 'react';
import OfferList from '../../widgets/OfferList';
import Map from '../../widgets/Map/ui/Map';
import { Header } from '../../widgets/Header';
import { CitySelector } from '../../features/CitySelector';
import { SortOffers } from '../../features/SortOffers';

import type { City, Offer } from '../../shared/types/Offer.type';

type MainPageProps = {
  limit: number;
  offers: Offer[];
  city: City;
};

function MainPage({ limit, offers, city }: MainPageProps) {
  const [selectedPoint, setSelectedPoint] = useState<Offer['id'] | undefined>(
    undefined
  );

  const handlePointHover = (itemId: string | undefined) => {
    setSelectedPoint(itemId);
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitySelector />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in Amsterdam
              </b>
              <SortOffers />
              <OfferList
                className="cities__places-list places__list tabs__content"
                offers={offers}
                limit={limit}
                onListItemHover={handlePointHover}
              />
            </section>
            <div className="cities__right-section">
              <Map
                block="cities"
                city={city}
                points={offers}
                selectedPoint={selectedPoint}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;

import { useCallback, useState } from 'react';
import { CitySelector } from '../../features/CitySelector';
import { Header } from '../../widgets/Header';
import Map from '../../widgets/Map/ui/Map';
import { OfferListWrapper } from '../../widgets/OfferListWrapper';

import { useAppSelector } from '../../shared/lib/hooks/redux';
import type { Offer } from '../../shared/types/Offer.type';
import { Loader } from '../../shared/ui/Loader';

type MainPageProps = {
  limit: number;
};

function MainPage({ limit }: MainPageProps) {
  const offers = useAppSelector((state) => state.offerList.filteredList);
  const { isLoading } = useAppSelector((state) => state.offerList);
  const selectedCity = useAppSelector((state) => state.city.city);
  const [selectedPoint, setSelectedPoint] = useState<Offer['id'] | undefined>(
    undefined
  );

  const currentCity = offers.length > 0 ? offers[0].city : undefined;

  const handlePointHover = useCallback(
    (itemId: string | undefined) => {
      setSelectedPoint(itemId);
    },
    [setSelectedPoint]
  );

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitySelector />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <OfferListWrapper
                offers={offers}
                selectedCity={selectedCity}
                block="main"
                limit={limit}
                onListItemHover={handlePointHover}
              />
              <div className="cities__right-section">
                <Map
                  currentCity={currentCity}
                  points={offers}
                  block="cities"
                  selectedPoint={selectedPoint}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainPage;

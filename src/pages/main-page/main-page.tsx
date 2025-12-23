import { useCallback, useState } from 'react';

import { Header } from '../../widgets/header';
import { MainContent } from '../../widgets/main-content';

import { selectIsOffersLoading } from '../../entities/offer/model/offers.selectors';
import { CitySelector } from '../../features/city-selector';
import { selectSortedOffers } from '../../features/sort-offers/model/sort-offers.selectors';

import { useAppSelector } from '../../shared/lib/hooks/redux';
import { Loader } from '../../shared/ui/loader';

import { selectCurrentCity } from '../../features/city-selector/model/city-selector.selectors';
import type { Offer } from '../../shared/types/offer.type';

type MainPageProps = {
  limit: number;
};

function MainPage({ limit }: MainPageProps) {
  const offers = useAppSelector(selectSortedOffers);
  const isLoading = useAppSelector(selectIsOffersLoading);
  const selectedCity = useAppSelector(selectCurrentCity);
  const [selectedPoint, setSelectedPoint] = useState<Offer['id'] | undefined>(
    undefined
  );

  const handlePointHover = useCallback(
    (itemId: string | undefined) => {
      setSelectedPoint(itemId);
    },
    [setSelectedPoint]
  );

  const isEmpty = offers.length === 0 && !isLoading;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main
        className={`page__main page__main--index ${
          isEmpty ? 'page__main--index-empty' : ''
        }`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitySelector />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <MainContent
            limit={limit}
            offers={offers}
            selectedCity={selectedCity}
            selectedPoint={selectedPoint}
            onListItemHover={handlePointHover}
          />
        )}
      </main>
    </div>
  );
}

export default MainPage;

import { useCallback, useState } from 'react';

import { Header } from '../../widgets/Header';
import { MainContent } from '../../widgets/MainContent';

import { CitySelector } from '../../features/CitySelector';

import { useAppSelector } from '../../shared/lib/hooks/redux';
import { Loader } from '../../shared/ui/Loader';

import type { Offer } from '../../shared/types/Offer.type';

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

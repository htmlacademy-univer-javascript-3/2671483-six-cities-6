import Map from '../../map/ui';
import { OfferListWrapper } from '../../offer-list-wrapper';
import { MainContentEmpty } from './main-content-empty';

import type { Offer, Offers } from '../../../shared/types/offer.type';

type MainContentProps = {
  offers: Offers;
  selectedCity: string;
  selectedPoint: Offer['id'] | undefined;
  limit?: number;
  onListItemHover: (id: Offer['id'] | undefined) => void;
};

export function MainContent(props: MainContentProps): JSX.Element {
  const { offers, selectedCity, selectedPoint, limit, onListItemHover } = props;

  if (offers.length === 0) {
    return <MainContentEmpty city={selectedCity} />;
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <OfferListWrapper
          offers={offers}
          selectedCity={selectedCity}
          block="main"
          limit={limit}
          onListItemHover={onListItemHover}
        />
        <div className="cities__right-section">
          <Map
            currentCity={offers[0].city}
            points={offers}
            block="cities"
            selectedPoint={selectedPoint}
          />
        </div>
      </div>
    </div>
  );
}

import PlaceCard from '../../shared/PlaceCard';

import type { City } from '../../../types/City';

type OfferListProps = {
  limit: number;
  offers: City[];
};

function OfferList({ limit = 6, offers }: OfferListProps) {
  const limitCards = offers.slice(0, limit);

  return (
    <div className="cities__places-list places__list tabs__content">
      {limitCards.map((info) => (
        <PlaceCard key={info.id} data={info} />
      ))}
    </div>
  );
}

export default OfferList;

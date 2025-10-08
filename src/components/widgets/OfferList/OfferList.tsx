import PlaceCard from '../../shared/PlaceCard';

import type { City } from '../../../types/City';
import { useCallback, useState } from 'react';

type OfferListProps = {
  limit: number;
  offers: City[];
};

function OfferList({ limit = 6, offers }: OfferListProps) {
  const [activeCard, setActiveCard] = useState<City['id'] | null>(null);
  const limitCards = offers.slice(0, limit);

  const handleCardEnter = useCallback((id: City['id']) => {
    setActiveCard(id);
  }, []);

  const handleCardLeave = useCallback(() => {
    setActiveCard(null);
  }, []);

  return (
    <div className="cities__places-list places__list tabs__content">
      {limitCards.map((info) => (
        <PlaceCard
          key={info.id}
          data={info}
          onHoverStart={() => handleCardEnter(info.id)}
          onHoverEnd={handleCardLeave}
          isActive={activeCard === info.id}
        />
      ))}
    </div>
  );
}

export default OfferList;

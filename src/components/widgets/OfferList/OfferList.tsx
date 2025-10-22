import { useCallback, useState } from 'react';
import cn from 'classnames';

import PlaceCard from '../../shared/PlaceCard';
import type { City } from '../../../types/City';
import { Orientation } from '../../../types/Orientation.type';

type OfferListProps = {
  limit: number;
  offers: City[];
  orientation?: Orientation;
};

function OfferList({
  limit = 6,
  offers,
  orientation = 'vertical',
}: OfferListProps) {
  const [activeCard, setActiveCard] = useState<City['id'] | null>(null);
  const limitCards = offers.slice(0, limit);

  const handleCardEnter = useCallback((id: City['id']) => {
    setActiveCard(id);
  }, []);

  const handleCardLeave = useCallback(() => {
    setActiveCard(null);
  }, []);

  return (
    <div
      className={cn(
        orientation === 'vertical'
          ? 'cities__places-list places__list tabs__content'
          : 'favorites__places'
      )}
    >
      {limitCards.map((info) => (
        <PlaceCard
          key={info.id}
          data={info}
          orientation={orientation}
          onHoverStart={() => handleCardEnter(info.id)}
          onHoverEnd={handleCardLeave}
          isActive={activeCard === info.id}
        />
      ))}
    </div>
  );
}

export default OfferList;

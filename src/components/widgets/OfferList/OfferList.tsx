import { useCallback, useState } from 'react';
import cn from 'classnames';
import PlaceCard from '../../entities/PlaceCard';

import type { Offer } from '../../shared/types/Offer.type';
import type { Orientation } from '../../shared/types/Orientation.type';

type OfferListProps = {
  limit: number;
  offers: Offer[];
  orientation?: Orientation;
};

function OfferList({
  limit = 6,
  offers,
  orientation = 'vertical',
}: OfferListProps) {
  const [activeCard, setActiveCard] = useState<Offer['id'] | null>(null);
  const limitCards = offers.slice(0, limit);

  const handleCardEnter = useCallback((id: Offer['id']) => {
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

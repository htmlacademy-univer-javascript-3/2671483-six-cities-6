import { useCallback } from 'react';
import { PlaceCard } from '../../../entities/place-card';

import type { Offer, Offers } from '../../../shared/types/offer.type';
import type { Orientation } from '../../../shared/types/orientation.type';

type OfferListProps = {
  className?: string;
  offers: Offers;
  limit?: number;
  orientation?: Orientation;
  onListItemHover?: (listItemId: string | undefined) => void;
};

function OfferList({
  className,
  offers,
  limit = 6,
  orientation = 'vertical',
  onListItemHover,
}: OfferListProps) {
  const limitCards = offers.slice(0, limit);

  const handleCardEnter = useCallback(
    (id: Offer['id']) => {
      if (onListItemHover) {
        onListItemHover(id);
      }
    },
    [onListItemHover]
  );

  const handleCardLeave = useCallback(() => {
    if (onListItemHover) {
      onListItemHover(undefined);
    }
  }, [onListItemHover]);

  return (
    <div className={className}>
      {limitCards.map((info) => (
        <PlaceCard
          key={info.id}
          offer={info}
          orientation={orientation}
          onHoverStart={() => handleCardEnter(info.id)}
          onHoverEnd={handleCardLeave}
        />
      ))}
    </div>
  );
}

export default OfferList;

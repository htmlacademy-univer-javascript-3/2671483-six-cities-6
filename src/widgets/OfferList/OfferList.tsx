import { useCallback } from 'react';
import { PlaceCard } from '../../entities/PlaceCard';

import type { Offer } from '../../shared/types/Offer.type';
import type { Orientation } from '../../shared/types/Orientation.type';

type OfferListProps = {
  className?: string;
  limit: number;
  offers: Offer[];
  orientation?: Orientation;
  onListItemHover?: (listItemId: string | undefined) => void;
};

function OfferList({
  className,
  limit = 6,
  offers,
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

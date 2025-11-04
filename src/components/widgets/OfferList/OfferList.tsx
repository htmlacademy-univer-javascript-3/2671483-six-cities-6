import { useCallback } from 'react';
import cn from 'classnames';
import PlaceCard from '../../entities/PlaceCard';

import type { Offer } from '../../shared/types/Offer.type';
import type { Orientation } from '../../shared/types/Orientation.type';

type OfferListProps = {
  limit: number;
  offers: Offer[];
  orientation?: Orientation;
  onListItemHover?: (listItemId: string | undefined) => void;
};

function OfferList({
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
        />
      ))}
    </div>
  );
}

export default OfferList;

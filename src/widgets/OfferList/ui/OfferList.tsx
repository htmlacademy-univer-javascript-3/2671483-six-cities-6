import { useCallback } from 'react';
import { PlaceCard } from '../../../entities/PlaceCard';

import { useAppSelector } from '../../../shared/lib/hooks/redux';
import type { Offer } from '../../../shared/types/Offer.type';
import type { Orientation } from '../../../shared/types/Orientation.type';
import { Loader } from '../../../shared/ui/Loader';
import { useFilteredOffers } from '../model/useFilteredOffers';

type OfferListProps = {
  className?: string;
  limit?: number;
  orientation?: Orientation;
  onListItemHover?: (listItemId: string | undefined) => void;
};

function OfferList({
  className,
  limit = 6,
  orientation = 'vertical',
  onListItemHover,
}: OfferListProps) {
  const { isLoading, hasError } = useAppSelector((state) => state.offerList);
  const { offers } = useFilteredOffers();
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

  if (isLoading) {
    return (
      <div className={className}>
        <Loader />
      </div>
    );
  } else if (hasError) {
    return <div>ERROR</div>;
  }

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

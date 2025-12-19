import { OfferGallery } from '../../../entities/offer/ui/OfferGallery';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import type { Offer, Offers } from '../../../shared/types/Offer.type';
import { Loader } from '../../../shared/ui/Loader';
import Map from '../../../widgets/Map/ui';

import { useMemo } from 'react';
import { getLimitedPoints } from '../../../shared/lib/utils';
import { OfferDetails } from './OfferDetails';

type OfferDetailsProps = {
  points: Offers;
  selectedPoint: Offer['id'] | undefined;
};

export function OfferContent({
  points,
  selectedPoint,
}: OfferDetailsProps): JSX.Element {
  const { isLoading, hasError, offer, reviews } = useAppSelector(
    (state) => state.offer
  );

  const limitedPoints = useMemo(() => getLimitedPoints(3, points), [points]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError || offer === null) {
    return <p>Failed to load Offer</p>;
  }

  const currentCity = offer?.city;

  return (
    <section className="offer">
      <OfferGallery images={offer.images} />
      <OfferDetails offer={offer} reviews={reviews} />
      <Map
        currentCity={currentCity}
        activePoint={offer}
        points={limitedPoints}
        block="offer"
        selectedPoint={selectedPoint}
      />
      ;
    </section>
  );
}

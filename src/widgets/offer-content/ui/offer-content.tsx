import { OfferGallery } from '../../../entities/offer/ui/offer-gallery';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import type { Offer, Offers } from '../../../shared/types/offer.type';
import { Loader } from '../../../shared/ui/loader';
import Map from '../../map/ui';

import { useMemo } from 'react';
import { getLimitedPoints } from '../../../shared/lib/utils';
import {
  selectIsOfferLoading,
  selectOffer,
  selectOfferHasError,
  selectSortedReviews,
} from '../model/offer-details.selectors';
import { OfferDetails } from './offer-details';

type OfferDetailsProps = {
  points: Offers;
  selectedPoint: Offer['id'] | undefined;
};

export function OfferContent({
  points,
  selectedPoint,
}: OfferDetailsProps): JSX.Element {
  const offer = useAppSelector(selectOffer);
  const reviews = useAppSelector(selectSortedReviews);
  const isLoading = useAppSelector(selectIsOfferLoading);
  const hasError = useAppSelector(selectOfferHasError);

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

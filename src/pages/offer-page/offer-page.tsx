import { useCallback, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks/redux';
import { Header } from '../../widgets/header';
import { OfferContent } from '../../widgets/offer-content';
import { fetchOfferDataAction } from '../../widgets/offer-content/model/offer-details.thunks';
import { OfferListWrapper } from '../../widgets/offer-list-wrapper';

import { AppRoute } from '../../shared/config/route';
import type { Offer } from '../../shared/types/offer.type';
import { Loader } from '../../shared/ui/loader';
import {
  selectIsOfferLoading,
  selectOfferHasError,
  selectOffersNearby,
} from '../../widgets/offer-content/model/offer-details.selectors';

function OfferPage() {
  const dispatch = useAppDispatch();
  const { offerId } = useParams();
  const offers = useAppSelector(selectOffersNearby);
  const isLoading = useAppSelector(selectIsOfferLoading);
  const hasError = useAppSelector(selectOfferHasError);

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferDataAction(offerId));
    }
  }, [dispatch, offerId]);

  const [selectedPoint, setSelectedPoint] = useState<Offer['id'] | undefined>(
    undefined
  );

  const handlePointHover = useCallback((itemId: string | undefined) => {
    setSelectedPoint(itemId);
  }, []);

  if (hasError) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  return (
    <div className="page">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <main className="page__main page__main--offer">
          <OfferContent points={offers} selectedPoint={selectedPoint} />
          <div className="container">
            <OfferListWrapper
              limit={3}
              offers={offers}
              block="nearby"
              onListItemHover={handlePointHover}
            />
          </div>
        </main>
      )}
    </div>
  );
}

export default OfferPage;

import { useCallback, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks/redux';
import { Header } from '../../widgets/Header';
import { OfferContent } from '../../widgets/OfferContent';
import { fetchOfferDataAction } from '../../widgets/OfferContent/model/offer-details.thunks';
import { OfferListWrapper } from '../../widgets/OfferListWrapper';

import { AppRoute } from '../../shared/config/route';
import type { Offer } from '../../shared/types/Offer.type';
import { Loader } from '../../shared/ui/Loader';

function OfferPage() {
  const dispatch = useAppDispatch();
  const { offerId } = useParams();
  const offers = useAppSelector((state) => state.offer.offersNearby);
  const { isLoading, hasError } = useAppSelector((state) => state.offer);

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

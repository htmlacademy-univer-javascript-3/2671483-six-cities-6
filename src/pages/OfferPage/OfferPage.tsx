import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOfferDataAction } from '../../features/OfferContent/model/offer-details.thunks';
import { useAppDispatch } from '../../shared/lib/hooks/redux';
import { Header } from '../../widgets/Header';
import { OfferListWrapper } from '../../widgets/OfferListWrapper';

import { OfferDetails } from '../../features/OfferContent';
import type { Offer } from '../../shared/types/Offer.type';

function OfferPage() {
  const dispatch = useAppDispatch();
  const { offerId } = useParams();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferDataAction(offerId));
    }
  }, [dispatch, offerId]);

  const [selectedPoint, setSelectedPoint] = useState<Offer['id'] | undefined>(
    undefined
  );

  const handlePointHover = (itemId: string | undefined) => {
    setSelectedPoint(itemId);
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <OfferDetails selectedPoint={selectedPoint} />
        <div className="container">
          <OfferListWrapper block="nearby" onListItemHover={handlePointHover} />
        </div>
      </main>
    </div>
  );
}

export default OfferPage;

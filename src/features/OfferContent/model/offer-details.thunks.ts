import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../../shared/config/api-route';
import { ExtraType } from '../../../shared/types/Extra.type';
import { FullOffer, Offers } from '../../../shared/types/Offer.type';
import { IReview } from '../../../shared/types/Review.type';

export const fetchOfferDataAction = createAsyncThunk<
  { offer: FullOffer; offersNearby: Offers; reviews: IReview[] },
  FullOffer['id'],
  ExtraType
>('offerDetails/fetchOffer', async (offerId, { extra: api }) => {
  const [offerResponse, offersNearbyResponse, reviewsResponse] =
    await Promise.all([
      api.get<FullOffer>(ApiRoute.Offer(offerId)),
      api.get<Offers>(ApiRoute.OffersNearby(offerId)),
      api.get<IReview[]>(ApiRoute.Comments(offerId)),
    ]);

  return {
    offer: offerResponse.data,
    offersNearby: offersNearbyResponse.data,
    reviews: reviewsResponse.data,
  };
});

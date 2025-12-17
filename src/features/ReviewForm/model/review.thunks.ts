import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../../shared/config/api-route';
import { ExtraType } from '../../../shared/types/Extra.type';
import { Offer } from '../../../shared/types/Offer.type';
import { IReview, ReviewData } from '../../../shared/types/Review.type';

export const postReviewAction = createAsyncThunk<
  IReview,
  { offerId: Offer['id'] } & ReviewData,
  ExtraType
>('review/postReview', async ({ offerId, comment, rating }, { extra: api }) => {
  const { data } = await api.post<IReview>(ApiRoute.Comments(offerId), {
    comment,
    rating,
  });
  return data;
});

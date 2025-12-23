import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export const selectOfferDetails = (state: RootState) => state.offer;

export const selectOffer = (state: RootState) => state.offer.offer;

export const selectOffersNearby = (state: RootState) =>
  state.offer.offersNearby;

export const selectReviews = (state: RootState) => state.offer.reviews;

export const selectIsOfferLoading = (state: RootState) => state.offer.isLoading;
export const selectOfferHasError = (state: RootState) => state.offer.hasError;

export const selectReviewsCount = createSelector(
  [selectReviews],
  (reviews) => reviews.length
);

export const selectSortedReviews = createSelector([selectReviews], (reviews) =>
  [...reviews]
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    })
    .slice(0, 10)
);

import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferDataAction } from './offer-details.thunks';

import { toggleFavoriteAction } from '../../../features/favorites/model/favorites.thunks';
import { postReviewAction } from '../../../features/review-form/model/review-form.thunks';
import type { FullOffer, Offers } from '../../../shared/types/offer.type';
import { IReview } from '../../../shared/types/review.type';

interface currentOfferState {
  offer: FullOffer | null;
  offersNearby: Offers;
  reviews: IReview[];
  isLoading: boolean;
  hasError: boolean;
}

const INITIAL_STATE: currentOfferState = {
  offer: null,
  offersNearby: [],
  reviews: [],
  isLoading: false,
  hasError: false,
};

export const offerDetailsSlice = createSlice({
  name: 'currentOffer',
  initialState: INITIAL_STATE,
  reducers: {
    clearOfferDetails: (state) => {
      state.offer = null;
      state.offersNearby = [];
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferDataAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferDataAction.fulfilled, (state, action) => {
        state.offer = action.payload.offer;
        state.offersNearby = action.payload.offersNearby;
        state.reviews = action.payload.reviews;
        state.isLoading = false;
      })
      .addCase(fetchOfferDataAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer.isFavorite = updatedOffer.isFavorite;
        }

        const index = state.offersNearby.findIndex(
          (item) => item.id === updatedOffer.id
        );
        if (index !== -1) {
          state.offersNearby[index].isFavorite = updatedOffer.isFavorite;
        }
      });
  },
});

export const { clearOfferDetails } = offerDetailsSlice.actions;

export const offerDetailsReducer = offerDetailsSlice.reducer;

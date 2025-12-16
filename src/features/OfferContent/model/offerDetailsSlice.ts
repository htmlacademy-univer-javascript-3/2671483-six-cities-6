import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferDataAction } from './offer-details.thunks';

import type { FullOffer, Offers } from '../../../shared/types/Offer.type';
import { IReview } from '../../../shared/types/Review.type';
import { postReviewAction } from '../../ReviewForm/model/review.thunks';

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
      });
  },
});

export const { clearOfferDetails } = offerDetailsSlice.actions;

export const offerDetailsReducer = offerDetailsSlice.reducer;

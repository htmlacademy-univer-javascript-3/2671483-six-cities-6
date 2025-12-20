import { createSlice } from '@reduxjs/toolkit';
import { fetchOffersAction } from './offers.thunks';

import { toggleFavoriteAction } from '../../../features/Favorites/model/favorites.thunks';
import type { Offers } from '../../../shared/types/Offer.type';

interface offersListState {
  list: Offers;
  isLoading: boolean;
  hasError: boolean;
}

const INITIAL_STATE: offersListState = {
  list: [],
  isLoading: false,
  hasError: false,
};

export const offersListSlice = createSlice({
  name: 'offersList',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.list = [];
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const updateOffer = action.payload;

        const index = state.list.findIndex(
          (offer) => offer.id === updateOffer.id
        );

        if (index !== -1) {
          state.list[index] = updateOffer;
        }
      });
  },
});

export const offerListReducer = offersListSlice.reducer;

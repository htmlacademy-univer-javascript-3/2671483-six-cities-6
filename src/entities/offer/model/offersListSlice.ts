import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffersAction } from './offers.thunks';

import type { Offers } from '../../../shared/types/Offer.type';

import { DEFAULT_CITY } from '../../../shared/config/const';

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
  reducers: {
    setOffersList: (state, action: PayloadAction<Offers>) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isLoading = false;

        state.list = action.payload.filter((o) => o.city.name === DEFAULT_CITY);
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.list = [];
      });
  },
});

export const { setOffersList } = offersListSlice.actions;

export const offerListReducer = offersListSlice.reducer;

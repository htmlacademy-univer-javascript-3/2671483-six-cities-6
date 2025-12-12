import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffersAction } from './offers.thunks';

import { DEFAULT_CITY } from '../../../shared/config/const';
import type { Offers } from '../../../shared/types/Offer.type';

interface offersListState {
  list: Offers;
  filteredList: Offers;
  isLoading: boolean;
  hasError: boolean;
}

const INITIAL_STATE: offersListState = {
  list: [],
  filteredList: [],
  isLoading: false,
  hasError: false,
};

export const offersListSlice = createSlice({
  name: 'offersList',
  initialState: INITIAL_STATE,
  reducers: {
    setOffersList: (state, action: PayloadAction<Offers>) => {
      state.filteredList = action.payload;
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

        state.list = action.payload;
        state.filteredList = action.payload.filter(
          (item) => item.city.name === DEFAULT_CITY
        );
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

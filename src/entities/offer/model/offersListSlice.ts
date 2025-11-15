import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offers } from '../../../shared/types/Offer.type';

import { DEFAULT_CITY } from '../../../shared/config/const';

import { offers } from '../../../mocks/offers';

interface offersListState {
  list: Offers;
}

const INITAL_STATE: offersListState = {
  list: offers.filter((o) => o.city.name === DEFAULT_CITY)
};

export const offersListSlice = createSlice({
  name: 'offersList',
  initialState: INITAL_STATE,
  reducers: {
    setOffersList: (state, action: PayloadAction<Offers>) => {
      state.list = action.payload;
    }
  }
});

export const { setOffersList } = offersListSlice.actions;

export const offerListReducer = offersListSlice.reducer;

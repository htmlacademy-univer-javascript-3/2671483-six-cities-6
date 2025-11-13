import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offers } from '../../../shared/types/Offer.type';

interface offersListState {
  list: Offers;
}

const INITAL_STATE: offersListState = {
  list: []
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

export const offerListReducer = offersListSlice.reducer;

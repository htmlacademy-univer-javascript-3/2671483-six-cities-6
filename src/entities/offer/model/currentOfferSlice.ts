import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../../shared/types/Offer.type';

interface currentOfferState {
  data: Offer | null;
}

const INITAL_STATE: currentOfferState = {
  data: null
};

export const currentOfferSlice = createSlice({
  name: 'currentOffer',
  initialState: INITAL_STATE,
  reducers: {
    setCurrentOffer: (state, action: PayloadAction<Offer>) => {
      state.data = action.payload;
    }
  }
});

export const currentOfferReducer = currentOfferSlice.reducer;

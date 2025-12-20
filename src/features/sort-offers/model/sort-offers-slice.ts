import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SORT_OPTIONS } from '../../../shared/config/const';

interface sortOffersState {
  sortOption: (typeof SORT_OPTIONS)[number];
}

const INITIAL_STATE: sortOffersState = {
  sortOption: SORT_OPTIONS[0],
};

export const sortOffersSlice = createSlice({
  name: 'sortOffers',
  initialState: INITIAL_STATE,
  reducers: {
    changeSortOption: (
      state,
      action: PayloadAction<(typeof SORT_OPTIONS)[number]>
    ) => {
      state.sortOption = action.payload;
    },
  },
});

export const { changeSortOption } = sortOffersSlice.actions;

export const sortOffersReducer = sortOffersSlice.reducer;

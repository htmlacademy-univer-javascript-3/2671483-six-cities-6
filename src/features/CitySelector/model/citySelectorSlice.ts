import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../../shared/config/const';

interface CitySelectorState {
  city: typeof DEFAULT_CITY[number];
}

const INITAL_STATE: CitySelectorState = {
  city: DEFAULT_CITY
};

export const CitySelectorSlice = createSlice({
  name: 'citySelector',
  initialState: INITAL_STATE,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    }
  }
});

export const { changeCity} = CitySelectorSlice.actions;

export const citySelectorReducer = CitySelectorSlice.reducer;

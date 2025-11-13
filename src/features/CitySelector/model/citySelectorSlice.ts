import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CitySelectorState {
  city: string;
}

const INITAL_STATE: CitySelectorState = {
  city: 'Paris'
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

export const citySelectorReducer = CitySelectorSlice.reducer;

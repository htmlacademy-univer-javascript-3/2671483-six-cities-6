import { createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../../shared/types/Offer.type';
import { fetchFavoritesAction, toggleFavoriteAction } from './favorites.thunks';

interface FavoritesState {
  list: Offers;
  isLoading: boolean;
  hasError: boolean;
}

const INITIAL_STATE: FavoritesState = {
  list: [],
  isLoading: false,
  hasError: false,
};

const favoritesSlice = createSlice({
  name: 'favoritesList',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        if (updatedOffer.isFavorite) {
          state.list.push(updatedOffer);
        } else {
          state.list = state.list.filter(
            (offer) => offer.id !== updatedOffer.id
          );
        }
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;

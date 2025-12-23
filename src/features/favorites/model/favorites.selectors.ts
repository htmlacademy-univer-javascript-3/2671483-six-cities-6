import { RootState } from '../../../app/store';

export const selectFavorites = (state: RootState) => state.favoritesOffers.list;

export const selectIsFavoritesLoading = (state: RootState) =>
  state.favoritesOffers.isLoading;

export const selectFavoritesHasError = (state: RootState) =>
  state.favoritesOffers.hasError;

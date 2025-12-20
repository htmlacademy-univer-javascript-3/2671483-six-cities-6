import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../../shared/config/api-route';

import type { ExtraType } from '../../../shared/types/extra.type';
import type { Offer, Offers } from '../../../shared/types/offer.type';

interface ToggleFavoritesArgs {
  offerId: string;
  status: 1 | 0;
}

export const fetchFavoritesAction = createAsyncThunk<
  Offers,
  undefined,
  ExtraType
>('favorites/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(ApiRoute.Favorite);
  return data;
});

export const toggleFavoriteAction = createAsyncThunk<
  Offer,
  ToggleFavoritesArgs,
  ExtraType
>('favorites/toggleFavorite', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(
    ApiRoute.FavoriteStatus(offerId, status),
    { offerId, status }
  );
  return data;
});

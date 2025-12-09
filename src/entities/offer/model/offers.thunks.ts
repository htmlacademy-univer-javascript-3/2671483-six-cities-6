import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../../shared/config/api-route';

import type { Offers } from '../../../shared/types/Offer.type';

export const fetchOffersAction = createAsyncThunk<
  Offers,
  undefined,
  {
    extra: AxiosInstance;
  }
>('offersList/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>(ApiRoute.Offers);
  return data;
});

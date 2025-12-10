import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../../shared/config/api-route';

import type { Offer, Offers } from '../../../shared/types/Offer.type';

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

export const fetchOfferAction = createAsyncThunk<
  Offer,
  string,
  {
    extra: AxiosInstance;
  }
>('offersList/fetchOffer', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer>(ApiRoute.Offer(offerId));
  return data;
});

export const fetchOffersNearbyAction = createAsyncThunk<
  Offers,
  string,
  {
    extra: AxiosInstance;
  }
>('offersList/fetchOffersNearby', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offers>(ApiRoute.OffersNearby(offerId));
  return data;
});

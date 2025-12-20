import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { selectCurrentCity } from '../../../features/CitySelector/model/citySelector.selectors';

export const selectOffers = (state: RootState) => state.offerList.list;

export const selectOffersByCity = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

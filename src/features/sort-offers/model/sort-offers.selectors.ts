import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { selectOffersByCity } from '../../../entities/offer/model/offers.selectors';
import { getSortedOffers } from './sort-utils';

export const selectActiveSort = (state: RootState) =>
  state.sortOffers.sortOption;

export const selectSortedOffers = createSelector(
  [selectOffersByCity, selectActiveSort],
  (offers, activeSort) => getSortedOffers(offers, activeSort)
);

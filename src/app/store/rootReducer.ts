import { combineReducers } from '@reduxjs/toolkit';
import { citySelectorReducer } from '../../features/CitySelector/model/citySelectorSlice';
import { currentOfferReducer } from '../../entities/offer/model/currentOfferSlice';
import { offerListReducer } from '../../entities/offer/model/offersListSlice';
import { sortOffersReducer } from '../../features/SortOffers/model/sortOffersSlice';

export const rootReducer = combineReducers({
  city: citySelectorReducer,
  currentOffer: currentOfferReducer,
  offerList: offerListReducer,
  sortOffers: sortOffersReducer
});

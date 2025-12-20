import { combineReducers } from '@reduxjs/toolkit';
import { offerListReducer } from '../../entities/offer/model/offers-list-slice';
import { userReducer } from '../../entities/user/model/user-slice';
import { citySelectorReducer } from '../../features/city-selector/model/city-selector-slice';
import { favoritesReducer } from '../../features/favorites/model/favorites-slice';
import { sortOffersReducer } from '../../features/sort-offers/model/sort-offers-slice';
import { offerDetailsReducer } from '../../widgets/offer-content/model/offer-details-slice';

export const rootReducer = combineReducers({
  user: userReducer,
  city: citySelectorReducer,
  offer: offerDetailsReducer,
  offerList: offerListReducer,
  sortOffers: sortOffersReducer,
  favoritesOffers: favoritesReducer,
});

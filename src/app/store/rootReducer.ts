import { combineReducers } from '@reduxjs/toolkit';
import { offerListReducer } from '../../entities/offer/model/offersListSlice';
import { userReducer } from '../../entities/user/model/userSlice';
import { citySelectorReducer } from '../../features/CitySelector/model/citySelectorSlice';
import { favoritesReducer } from '../../features/Favorites/model/favoritesSlice';
import { offerDetailsReducer } from '../../features/OfferContent/model/offerDetailsSlice';
import { sortOffersReducer } from '../../features/SortOffers/model/sortOffersSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  city: citySelectorReducer,
  offer: offerDetailsReducer,
  offerList: offerListReducer,
  sortOffers: sortOffersReducer,
  favoritesOffers: favoritesReducer,
});

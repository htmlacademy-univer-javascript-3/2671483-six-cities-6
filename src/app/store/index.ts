import { configureStore } from '@reduxjs/toolkit';
import { citySelectorReducer } from '../../features/CitySelector/model/citySelectorSlice';
import { currentOfferReducer } from '../../entities/offer/model/currentOfferSlice';
import { offerListReducer } from '../../entities/offer/model/offersListSlice';

export default configureStore({
  reducer: {
    city: citySelectorReducer,
    currentOffer: currentOfferReducer,
    offerList: offerListReducer
  }
});

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { citySelectorReducer } from '../../features/CitySelector/model/citySelectorSlice';
import { currentOfferReducer } from '../../entities/offer/model/currentOfferSlice';
import { offerListReducer } from '../../entities/offer/model/offersListSlice';

const rootReducer = combineReducers({
  city: citySelectorReducer,
  currentOffer: currentOfferReducer,
  offerList: offerListReducer
});

export const setupStore = () => configureStore({
  reducer: rootReducer
});

export const store = setupStore();

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

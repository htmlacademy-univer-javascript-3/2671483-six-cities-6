import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux';
import { changeCity } from './citySelectorSlice';
import { setOffersList } from '../../../entities/offer/model/offersListSlice';
import { changeSortOption } from '../../SortOffers/model/sortOffersSlice';

import { ALL_CITIES, SORT_OPTIONS } from '../../../shared/config/const';

import { offers } from '../../../mocks/offers';

export function useCitySelector() {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city.city);

  const onCityChange = (cityName: typeof ALL_CITIES[number]) => {
    dispatch(changeSortOption(SORT_OPTIONS[0]));
    dispatch(changeCity(cityName));

    const offersForSelectedCity = offers.filter((offer) => offer.city.name === cityName);

    dispatch(setOffersList(offersForSelectedCity));
  };

  return {cities: ALL_CITIES, selectedCity, onCityChange};
}

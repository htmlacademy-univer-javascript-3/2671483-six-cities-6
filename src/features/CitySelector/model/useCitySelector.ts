import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux';
import { changeCity } from './citySelectorSlice';

import { ALL_CITIES } from '../../../shared/config/const';
import { offers } from '../../../mocks/offers';
import { setOffersList } from '../../../entities/offer/model/offersListSlice';

export function useCitySelector() {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city.city);

  const onCityChange = (cityName: typeof ALL_CITIES[number]) => {
    dispatch(changeCity(cityName));

    const offersForSelectedCity = offers.filter((offer) => offer.city.name === cityName);

    dispatch(setOffersList(offersForSelectedCity));
  };

  return {cities: ALL_CITIES, selectedCity, onCityChange};
}

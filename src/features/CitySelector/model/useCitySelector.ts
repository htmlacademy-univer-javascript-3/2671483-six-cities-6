import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux';
import { changeCity } from './citySelectorSlice';

import { ALL_CITIES } from '../../../shared/config/const';

export function useCitySelector() {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city.city);

  const onCityChange = (cityName: typeof ALL_CITIES[number]) => {
    dispatch(changeCity(cityName));
  };

  return {cities: ALL_CITIES, selectedCity, onCityChange};
}

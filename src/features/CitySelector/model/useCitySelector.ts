import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/redux';
import { changeSortOption } from '../../SortOffers/model/sortOffersSlice';
import { changeCity } from './citySelectorSlice';

import { useCallback } from 'react';
import { ALL_CITIES, SORT_OPTIONS } from '../../../shared/config/const';
import { selectCurrentCity } from './citySelector.selectors';

export function useCitySelector() {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(selectCurrentCity);

  const onCityChange = useCallback(
    (cityName: (typeof ALL_CITIES)[number]) => {
      if (cityName === selectedCity) {
        return;
      }

      dispatch(changeSortOption(SORT_OPTIONS[0]));
      dispatch(changeCity(cityName));
    },
    [dispatch, selectedCity]
  );

  return { cities: ALL_CITIES, selectedCity, onCityChange };
}

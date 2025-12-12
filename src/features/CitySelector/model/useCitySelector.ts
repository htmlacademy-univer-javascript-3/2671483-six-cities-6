import { setOffersList } from '../../../entities/offer/model/offersListSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/redux';
import { changeSortOption } from '../../SortOffers/model/sortOffersSlice';
import { changeCity } from './citySelectorSlice';

import { ALL_CITIES, SORT_OPTIONS } from '../../../shared/config/const';

export function useCitySelector() {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city.city);
  const offers = useAppSelector((state) => state.offerList.list);

  const onCityChange = (cityName: (typeof ALL_CITIES)[number]) => {
    dispatch(changeSortOption(SORT_OPTIONS[0]));
    dispatch(changeCity(cityName));

    const offersForSelectedCity = offers.filter(
      (offer) => offer.city.name === cityName
    );

    dispatch(setOffersList(offersForSelectedCity));
  };

  return { cities: ALL_CITIES, selectedCity, onCityChange };
}

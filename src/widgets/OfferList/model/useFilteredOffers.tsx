import { useAppSelector } from '../../../shared/lib/hooks/redux';

export const useFilteredOffers = () => {
  const selectedCity = useAppSelector((state) => state.city.city);
  const offers = useAppSelector((state) => state.offerList.list);

  return { selectedCity, offers: offers };
};

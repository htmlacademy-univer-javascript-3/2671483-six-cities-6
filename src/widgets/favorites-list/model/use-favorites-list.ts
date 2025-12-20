import { useAppSelector } from '../../../shared/lib/hooks/redux';

import type { Offers } from '../../../shared/types/offer.type';

type GroupedOffers = Record<string, Offers>;

const groupOffersByCity = (offers: Offers): GroupedOffers =>
  offers.reduce((acc: GroupedOffers, offer) => {
    const city = offer.city.name;

    if (!acc[city]) {
      acc[city] = [];
    }

    acc[city].push(offer);
    return acc;
  }, {});

export const useFavoritesList = () => {
  const { isLoading, hasError, list } = useAppSelector(
    (state) => state.favoritesOffers
  );

  const isFavoritesEmpty = list.length === 0;
  const groupedOffers = groupOffersByCity(list);
  const cityNames = Object.keys(groupedOffers);

  return {
    isFavoritesEmpty,
    isLoading,
    hasError,
    groupedOffers,
    cityNames,
  };
};

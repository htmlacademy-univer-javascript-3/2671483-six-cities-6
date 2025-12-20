import { SORT_OPTIONS } from '../../../shared/config/const';
import { Offers } from '../../../shared/types/offer.type';

export const sortOffersMap: Record<
  (typeof SORT_OPTIONS)[number],
  (offers: Offers) => Offers
> = {
  Popular: (offers: Offers) => offers.slice(),
  'Price: low to high': (offers: Offers) =>
    offers.slice().sort((a, b) => a.price - b.price),
  'Price: high to low': (offers: Offers) =>
    offers.slice().sort((a, b) => b.price - a.price),
  'Top rated first': (offers: Offers) =>
    offers.slice().sort((a, b) => b.rating - a.rating),
};

export const getSortedOffers = (
  offers: Offers,
  sortType: (typeof SORT_OPTIONS)[number]
): Offers => sortOffersMap[sortType](offers);

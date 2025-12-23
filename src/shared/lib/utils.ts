import { ALL_CITIES } from '../config/const';
import { AppRoute } from '../config/route';
import { Offers } from '../types/offer.type';

export const getOfferPath = (id: string | number) =>
  AppRoute.Offer.replace(':offerId', String(id));

export const getLimitedPoints = (limit: number, points: Offers) => {
  const safeLimit = Math.max(0, limit);
  return points.slice(0, safeLimit);
};

export const getRandomCity = () => {
  const randomIndex = Math.floor(Math.random() * ALL_CITIES.length);
  return ALL_CITIES[randomIndex];
};

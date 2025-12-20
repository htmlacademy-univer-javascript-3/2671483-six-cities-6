import { AppRoute } from '../config/route';
import { Offers } from '../types/offer.type';

export const getOfferPath = (id: string | number) =>
  AppRoute.Offer.replace(':offerId', String(id));

export const getLimitedPoints = (limit: number, points: Offers) => {
  const safeLimit = Math.max(0, limit);
  return points.slice(0, safeLimit);
};

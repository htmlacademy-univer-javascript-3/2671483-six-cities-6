import { AppRoute } from '../config/route';

export const getOfferPath = (id: string | number) => AppRoute.Offer.replace(':offerId', String(id));

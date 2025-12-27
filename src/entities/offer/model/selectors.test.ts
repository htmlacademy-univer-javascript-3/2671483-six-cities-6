import { RootState } from '../../../app/store';
import { Offer } from '../../../shared/types/offer.type';
import {
  getFavoriteOffers,
  selectIsOffersLoading,
  selectOffers,
  selectOffersByCity,
} from './offers.selectors';

describe('Selectors: Offers', () => {
  const mockOffers = [
    {
      id: '1',
      city: { name: 'Paris' },
      isFavorite: 1,
    },
    {
      id: '2',
      city: { name: 'Amsterdam' },
      isFavorite: 0,
    },
    {
      id: '3',
      city: { name: 'Paris' },
      isFavorite: 0,
    },
  ] as Offer[];

  const mockState = {
    offerList: {
      list: mockOffers,
      isLoading: true,
      hasError: false,
    },
    city: {
      city: 'Paris',
    },
  } as RootState;

  it('should return offers list from state', () => {
    const result = selectOffers(mockState);
    expect(result).toEqual(mockOffers);
  });

  it('should return loading status from state', () => {
    const result = selectIsOffersLoading(mockState);
    expect(result).toBe(true);
  });

  it('should filter offers by city', () => {
    const result = selectOffersByCity(mockState);

    expect(result).toHaveLength(2);
    expect(result.every((offer) => offer.city.name === 'Paris')).toBe(true);
  });

  it('should return only favorite offers', () => {
    const result = getFavoriteOffers(mockState);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});

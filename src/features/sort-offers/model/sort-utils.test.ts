import { Offers } from '../../../shared/types/offer.type';
import { getSortedOffers } from './sort-utils';

describe('Utility: getSortedOffers', () => {
  const mockOffers = [
    { id: '1', price: 100, rating: 3 },
    { id: '2', price: 300, rating: 5 },
    { id: '3', price: 200, rating: 4 },
  ] as Offers;

  it('should return offers in original order when "Popular"', () => {
    const result = getSortedOffers(mockOffers, 'Popular');

    expect(result).toEqual(mockOffers);
    expect(result).not.toBe(mockOffers);
  });

  it('should sort offers by price from low to high', () => {
    const result = getSortedOffers(mockOffers, 'Price: low to high');

    expect(result[0].price).toBe(100);
    expect(result[1].price).toBe(200);
    expect(result[2].price).toBe(300);
  });

  it('should sort offers by price from high to low', () => {
    const result = getSortedOffers(mockOffers, 'Price: high to low');

    expect(result[0].price).toBe(300);
    expect(result[1].price).toBe(200);
    expect(result[2].price).toBe(100);
  });

  it('should sort offers by rating from high to low', () => {
    const result = getSortedOffers(mockOffers, 'Top rated first');

    expect(result[0].rating).toBe(5);
    expect(result[1].rating).toBe(4);
    expect(result[2].rating).toBe(3);
  });
});

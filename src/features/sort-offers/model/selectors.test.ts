import { RootState } from '../../../app/store';
import { SORT_OPTIONS } from '../../../shared/config/const';
import { Offer } from '../../../shared/types/offer.type';
import { selectActiveSort, selectSortedOffers } from './sort-offers.selectors';

describe('Selectors: SortOffers', () => {
  const mockOffers = [
    {
      id: '1',
      price: 100,
      rating: 4,
      title: 'Low Price',
      city: { name: 'Paris' },
    },
    {
      id: '2',
      price: 500,
      rating: 5,
      title: 'High Price',
      city: { name: 'Paris' },
    },
  ] as Offer[];

  const mockState = {
    sortOffers: {
      sortOption: SORT_OPTIONS[1],
    },
    city: {
      city: 'Paris',
    },
    offerList: {
      list: mockOffers,
      isLoading: false,
    },
  } as RootState;

  it('should return active sort option from state', () => {
    const result = selectActiveSort(mockState);
    expect(result).toBe(SORT_OPTIONS[1]);
  });

  it('should return sorted offers array', () => {
    const result = selectSortedOffers(mockState);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0].city.name).toBe('Paris');
  });
});

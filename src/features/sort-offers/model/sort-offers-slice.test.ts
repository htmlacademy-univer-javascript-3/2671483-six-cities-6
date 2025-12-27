import { SORT_OPTIONS } from '../../../shared/config/const';
import { changeSortOption, sortOffersReducer } from './sort-offers-slice';

describe('Slice: sortOffers', () => {
  const initialState = {
    sortOption: SORT_OPTIONS[0],
  };

  it('should return initial state with empty action', () => {
    const result = sortOffersReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should change sort option with "changeSortOption" action', () => {
    const newSortOption = SORT_OPTIONS[1];

    const result = sortOffersReducer(
      initialState,
      changeSortOption(newSortOption)
    );

    expect(result.sortOption).toBe(newSortOption);
  });
});

import { RootState } from '../../../app/store';
import { Offer } from '../../../shared/types/offer.type';
import {
  selectFavorites,
  selectFavoritesHasError,
  selectIsFavoritesLoading,
} from './favorites.selectors';

describe('Selectors: Favorites', () => {
  const mockOffers = [
    { id: '1', title: 'Favorite Hotel', isFavorite: 1 },
  ] as Offer[];

  const mockState = {
    favoritesOffers: {
      list: mockOffers,
      isLoading: true,
      hasError: false,
    },
  } as RootState;

  it('should return favorites list from state', () => {
    const result = selectFavorites(mockState);
    expect(result).toEqual(mockOffers);
  });

  it('should return isLoading status from state', () => {
    const result = selectIsFavoritesLoading(mockState);
    expect(result).toBe(true);
  });

  it('should return hasError status from state', () => {
    const result = selectFavoritesHasError(mockState);
    expect(result).toBe(false);
  });
});

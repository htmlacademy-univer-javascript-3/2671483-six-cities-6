import { Offer } from '../../../shared/types/offer.type';
import { favoritesReducer } from './favorites-slice';
import { fetchFavoritesAction, toggleFavoriteAction } from './favorites.thunks';

describe('Slice: favorites', () => {
  const initialState = {
    list: [],
    isLoading: false,
    hasError: false,
  };

  const mockOffer = {
    id: '1',
    title: 'Favorite Hotel',
    isFavorite: 1 as const,
  } as Offer;

  it('should return initial state with empty action', () => {
    const result = favoritesReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  describe('fetchFavoritesAction', () => {
    it('should set isLoading to true on "pending"', () => {
      const result = favoritesReducer(
        initialState,
        fetchFavoritesAction.pending
      );
      expect(result.isLoading).toBe(true);
      expect(result.hasError).toBe(false);
    });

    it('should set list and isLoading to false on "fulfilled"', () => {
      const mockOffers = [mockOffer];
      const result = favoritesReducer(
        initialState,
        fetchFavoritesAction.fulfilled(mockOffers, '', undefined)
      );
      expect(result.list).toEqual(mockOffers);
      expect(result.isLoading).toBe(false);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should add offer to list if isFavorite is 1', () => {
      const updatedOffer = { ...mockOffer, id: '2', isFavorite: 1 as const };

      const result = favoritesReducer(
        initialState,
        toggleFavoriteAction.fulfilled(updatedOffer, '', {
          offerId: '2',
          status: 1,
        })
      );

      expect(result.list).toHaveLength(1);
      expect(result.list[0].id).toBe('2');
    });

    it('should remove offer from list if isFavorite is 0', () => {
      const stateWithFavorite = {
        ...initialState,
        list: [mockOffer],
      };

      const updatedOffer = { ...mockOffer, isFavorite: 0 as const };

      const result = favoritesReducer(
        stateWithFavorite,
        toggleFavoriteAction.fulfilled(updatedOffer, '', {
          offerId: '1',
          status: 0,
        })
      );

      expect(result.list).toHaveLength(0);
    });
  });
});

import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as selectors from '../../../features/favorites/model/favorites.selectors';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import type { Offer } from '../../../shared/types/offer.type';
import { useFavoritesList } from './use-favorites-list';

vi.mock('../../../shared/lib/hooks/redux', () => ({
  useAppSelector: vi.fn(),
}));

describe('Hook: useFavoritesList', () => {
  const mockOffer = (city: string, id: string): Offer =>
    ({
      id,
      title: `Offer ${id}`,
      type: 'apartment',
      price: 100,
      city: { name: city, location: { latitude: 0, longitude: 0, zoom: 10 } },
      location: { latitude: 0, longitude: 0, zoom: 10 },
      isFavorite: 1,
      isPremium: false,
      rating: 4,
      previewImage: 'img.jpg',
    } as Offer);

  it('should return empty state when no favorites', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === selectors.selectFavorites) {
        return [];
      }
      if (selector === selectors.selectIsFavoritesLoading) {
        return false;
      }
      if (selector === selectors.selectFavoritesHasError) {
        return false;
      }
      return null;
    });

    const { result } = renderHook(() => useFavoritesList());

    expect(result.current.isFavoritesEmpty).toBe(true);
    expect(result.current.cityNames).toHaveLength(0);
  });

  it('should correctly group offers by city', () => {
    const favorites = [
      mockOffer('Paris', '1'),
      mockOffer('Paris', '2'),
      mockOffer('Amsterdam', '3'),
    ];

    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === selectors.selectFavorites) {
        return favorites;
      }
      if (selector === selectors.selectIsFavoritesLoading) {
        return false;
      }
      if (selector === selectors.selectFavoritesHasError) {
        return false;
      }
      return null;
    });

    const { result } = renderHook(() => useFavoritesList());

    expect(result.current.cityNames).toEqual(['Paris', 'Amsterdam']);
    expect(result.current.groupedOffers['Paris']).toHaveLength(2);
    expect(result.current.groupedOffers['Amsterdam']).toHaveLength(1);
    expect(result.current.isFavoritesEmpty).toBe(false);
  });

  it('should return loading and error status from store', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === selectors.selectFavorites) {
        return [];
      }
      if (selector === selectors.selectIsFavoritesLoading) {
        return true;
      }
      if (selector === selectors.selectFavoritesHasError) {
        return true;
      }
      return null;
    });

    const { result } = renderHook(() => useFavoritesList());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(true);
  });
});

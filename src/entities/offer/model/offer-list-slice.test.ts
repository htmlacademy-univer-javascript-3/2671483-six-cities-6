import { toggleFavoriteAction } from '../../../features/favorites/model/favorites.thunks';
import { Offer, Offers } from '../../../shared/types/offer.type';
import { offerListReducer } from './offers-list-slice';
import { fetchOffersAction } from './offers.thunks';

describe('Slice: offersList', () => {
  const initialState = {
    list: [],
    isLoading: false,
    hasError: false,
  };

  const mockOffer = {
    id: '1',
    title: 'Test Offer',
    isFavorite: 0 as const,
    price: 100,
    type: 'apartment',
    city: {
      name: 'Paris',
      location: { latitude: 0, longitude: 0, zoom: 10 },
    },
    location: { latitude: 0, longitude: 0, zoom: 10 },
    isPremium: false,
    rating: 4,
    previewImage: 'img/1.jpg',
  } as Offer;

  it('should return initial state with empty action', () => {
    const result = offerListReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  describe('fetchOffersAction', () => {
    it('should set isLoading to true and hasError to false on "pending"', () => {
      const result = offerListReducer(initialState, fetchOffersAction.pending);

      expect(result.isLoading).toBe(true);
      expect(result.hasError).toBe(false);
    });

    it('should set list to offers and isLoading to false on "fulfilled"', () => {
      const mockOffers: Offers = [mockOffer];
      const result = offerListReducer(
        initialState,
        fetchOffersAction.fulfilled(mockOffers, '', undefined)
      );

      expect(result.list).toEqual(mockOffers);
      expect(result.isLoading).toBe(false);
    });

    it('should set hasError to true and clear list on "rejected"', () => {
      const stateWithData = { ...initialState, list: [mockOffer] };
      const result = offerListReducer(
        stateWithData,
        fetchOffersAction.rejected
      );

      expect(result.hasError).toBe(true);
      expect(result.isLoading).toBe(false);
      expect(result.list).toEqual([]);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should update specific offer in list on "fulfilled"', () => {
      const stateWithOffers = {
        ...initialState,
        list: [mockOffer, { ...mockOffer, id: '2', title: 'Second' }],
      };

      const updatedOffer = { ...mockOffer, isFavorite: 1 as const };

      const result = offerListReducer(
        stateWithOffers,
        toggleFavoriteAction.fulfilled(updatedOffer, '', {
          offerId: '1',
          status: 1,
        })
      );

      expect(result.list[0].isFavorite).toBe(1);
      expect(result.list[1].id).toBe('2');
      expect(result.list).toHaveLength(2);
    });

    it('should not change state if offer id is not found', () => {
      const stateWithOffers = { ...initialState, list: [mockOffer] };
      const unknownOffer = { ...mockOffer, id: '999' };

      const result = offerListReducer(
        stateWithOffers,
        toggleFavoriteAction.fulfilled(unknownOffer, '', {
          offerId: '999',
          status: 1,
        })
      );

      expect(result.list).toEqual(stateWithOffers.list);
    });
  });
});

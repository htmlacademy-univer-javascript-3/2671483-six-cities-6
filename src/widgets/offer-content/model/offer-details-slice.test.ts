import { toggleFavoriteAction } from '../../../features/favorites/model/favorites.thunks';
import { FullOffer, Offer } from '../../../shared/types/offer.type';
import { offerDetailsReducer } from './offer-details-slice';
import { fetchOfferDataAction } from './offer-details.thunks';

describe('Slice: offerDetails', () => {
  const initialState = {
    offer: null,
    offersNearby: [],
    reviews: [],
    isLoading: false,
    hasError: false,
  };

  const mockFullOffer = {
    id: '1',
    title: 'Luxury Appt',
    isFavorite: 0,
  } as FullOffer;
  const mockNearbyOffer = {
    id: '2',
    title: 'Nearby Hotel',
    isFavorite: 0,
  } as Offer;

  it('should return initial state with empty action', () => {
    expect(offerDetailsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('toggleFavoriteAction.fulfilled', () => {
    it('should update "isFavorite" in main offer', () => {
      const stateWithData = {
        ...initialState,
        offer: { ...mockFullOffer, isFavorite: 0 as const },
        offersNearby: [],
      };

      const updatedOffer = {
        id: '1',
        isFavorite: 1 as const,
      } as Offer;

      const result = offerDetailsReducer(
        stateWithData,
        toggleFavoriteAction.fulfilled(updatedOffer, '', {
          offerId: '1',
          status: 1,
        })
      );

      expect(result.offer?.isFavorite).toBe(1);
    });

    it('should update "isFavorite" in nearby offers', () => {
      const stateWithData = {
        ...initialState,
        offer: null,
        offersNearby: [{ ...mockNearbyOffer, id: '2', isFavorite: 0 as const }],
      };

      const updatedOffer = {
        id: '2',
        isFavorite: 1 as const,
      } as Offer;

      const result = offerDetailsReducer(
        stateWithData,
        toggleFavoriteAction.fulfilled(updatedOffer, '', {
          offerId: '2',
          status: 1,
        })
      );

      expect(result.offersNearby[0].isFavorite).toBe(1);
    });
  });

  describe('fetchOfferDataAction', () => {
    it('should update state on "fulfilled"', () => {
      const payload = {
        offer: mockFullOffer,
        offersNearby: [mockNearbyOffer],
        reviews: [],
      };

      const result = offerDetailsReducer(
        initialState,
        fetchOfferDataAction.fulfilled(payload, '', '1')
      );

      expect(result.offer).toEqual(mockFullOffer);
      expect(result.isLoading).toBe(false);
    });
  });
});

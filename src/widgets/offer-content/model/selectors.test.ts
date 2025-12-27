import { RootState } from '../../../app/store';
import { IReview } from '../../../shared/types/review.type';
import {
  selectOffer,
  selectOfferHasError,
  selectReviewsCount,
  selectSortedReviews,
} from './offer-details.selectors';

describe('Selectors: OfferDetails', () => {
  const mockReviews = [
    { id: 1, date: '2023-01-01T12:00:00Z', comment: 'Oldest' },
    { id: 2, date: '2023-05-01T12:00:00Z', comment: 'Newest' },
    { id: 3, date: '2023-03-01T12:00:00Z', comment: 'Middle' },
  ] as unknown as IReview[];

  const mockState = {
    offer: {
      offer: { id: '1', title: 'Hotel' },
      offersNearby: [],
      reviews: mockReviews,
      isLoading: false,
      hasError: true,
    },
  } as unknown as RootState;

  it('should return offer data and error status', () => {
    expect(selectOffer(mockState)).toEqual({ id: '1', title: 'Hotel' });
    expect(selectOfferHasError(mockState)).toBe(true);
  });

  it('should return correct reviews count', () => {
    const result = selectReviewsCount(mockState);

    expect(result).toBe(3);
  });

  it('should return sorted and sliced reviews', () => {
    const sortedReviews = selectSortedReviews(mockState);

    expect(sortedReviews[0].comment).toBe('Newest');
    expect(sortedReviews[1].comment).toBe('Middle');
    expect(sortedReviews[2].comment).toBe('Oldest');
  });

  it('should return no more than 10 reviews', () => {
    const manyReviews = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      date: `2023-01-${10 + i}T12:00:00Z`,
    })) as unknown as IReview[];

    const stateWithManyReviews = {
      offer: { reviews: manyReviews },
    } as RootState;

    const result = selectSortedReviews(stateWithManyReviews);

    expect(result).toHaveLength(10);
  });
});

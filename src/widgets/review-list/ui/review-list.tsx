import { Review } from '../../../entities/review';

import type { IReview } from '../../../shared/types/review.type';

type ReviewListProps = {
  reviews: IReview[];
};

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}

export default ReviewList;

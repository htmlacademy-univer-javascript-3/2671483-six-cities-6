import { formatDate } from '../../shared/lib/date';
import type { IReview } from '../../shared/types/Review.type';
import RatingStars from '../../shared/ui/RatingStars';

type ReviewProps = {
  review: IReview;
};

function Review({ review }: ReviewProps) {
  const { dateTimeValue, displayValue } = formatDate(review.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <RatingStars rating={review.rating} />
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={dateTimeValue}>
          {displayValue}
        </time>
      </div>
    </li>
  );
}

export default Review;

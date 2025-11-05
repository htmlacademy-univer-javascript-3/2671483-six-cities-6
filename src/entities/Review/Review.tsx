import { formatDate } from '../../shared/lib/date';
import type { Review } from '../../shared/types/Review.type';
import RatingStars from '../../shared/ui/RatingStars';

type ReviewProps = {
  data: Review;
};

function Review({ data }: ReviewProps) {
  const { dateTimeValue, displayValue } = formatDate(data.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={data.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{data.user.name}</span>
      </div>
      <div className="reviews__info">
        <RatingStars rating={data.rating} />
        <p className="reviews__text">{data.comment}</p>
        <time className="reviews__time" dateTime={dateTimeValue}>
          {displayValue}
        </time>
      </div>
    </li>
  );
}

export default Review;

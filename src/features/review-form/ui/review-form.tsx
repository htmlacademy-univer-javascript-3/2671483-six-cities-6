import { RatingInput } from '../../../shared/ui/rating-input';
import { useReviewForm } from '../model/use-review-form';

import { MIN_COMMENT_LENGTH, RATINGS } from '../../../shared/config/const';

import { useParams } from 'react-router-dom';

function ReviewForm() {
  const { offerId } = useParams();
  const { comment, rating, isValid, isPending, handleChange, handleSubmit } =
    useReviewForm(offerId as string);

  return (
    <form
      className="reviews__form form"
      method="post"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, title }) => (
          <RatingInput
            key={value}
            value={value}
            title={title}
            checked={rating === value}
            onChange={handleChange}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isPending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;

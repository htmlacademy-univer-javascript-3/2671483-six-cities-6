import { useState } from 'react';
import RatingInput from '../../shared/ui/RatingInput';

import { MIN_COMMENT_LENGTH, RATINGS } from '../../shared/config/const';

import type { ReviewData } from '../../shared/types/Review.type';

const INITIAL_REVIEW_FORM_DATA: ReviewData = { comment: '', rating: 0 };

function ReviewForm() {
  const [formData, setFormData] = useState<ReviewData>(
    INITIAL_REVIEW_FORM_DATA
  );

  const handleChangeField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name as keyof ReviewData]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormData(INITIAL_REVIEW_FORM_DATA);
  };

  const isDisabled =
    formData.rating === 0 || formData.comment.length < MIN_COMMENT_LENGTH;

  return (
    <form className="reviews__form form" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, title }) => (
          <RatingInput
            key={value}
            value={value}
            title={title}
            checked={formData.rating === value}
            onChange={handleChangeField}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleChangeField}
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
          disabled={isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;

type StarsRatingProps = {
  value: number;
  title?: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function RatingInput({ value, title, checked, onChange }: StarsRatingProps) {
  const id = `${value}-stars`;

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={id}
        type="radio"
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export { RatingInput };

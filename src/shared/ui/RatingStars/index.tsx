type RatingStarsProps = {
  rating?: number;
  withValue?: boolean;
  block?: 'place-card' | 'offer' | 'reviews';
};

function RatingStars({
  rating = 0,
  withValue = false,
  block = 'reviews',
}: RatingStarsProps): JSX.Element {
  return (
    <div className={`${block}__rating rating`}>
      <div className={`${block}__stars rating__stars`}>
        <span style={{ width: `${rating * 20}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {withValue && (
        <span className={`${block}__rating-value rating__value`}>{rating}</span>
      )}
    </div>
  );
}

export default RatingStars;

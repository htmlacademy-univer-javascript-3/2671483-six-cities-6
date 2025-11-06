type RatingStarsProps = {
  rating: number;
};

function RatingStars({ rating }: RatingStarsProps): JSX.Element {
  return (
    <div className="reviews__rating rating">
      <div className="reviews__stars rating__stars">
        <span style={{ width: `${rating * 20}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

export default RatingStars;

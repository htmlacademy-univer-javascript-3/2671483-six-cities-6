export type RatingValue = '0' | '1' | '2' | '3' | '4' | '5';

export interface Review {
  comment: string;
  rating: RatingValue;
}

export interface RatingTitle {
  value: RatingValue;
  title: string;
}

import { User } from './User.type';

export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

export interface Review {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: RatingValue;
}

export interface ReviewData {
  comment: string;
  rating: number;
}

export interface RatingTitle {
  value: RatingValue;
  title: string;
}

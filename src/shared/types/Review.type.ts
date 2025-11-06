import { User } from './User.type';

export interface IReview {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export interface ReviewData {
  comment: string;
  rating: number;
}

export interface RatingTitle {
  value: number;
  title: string;
}

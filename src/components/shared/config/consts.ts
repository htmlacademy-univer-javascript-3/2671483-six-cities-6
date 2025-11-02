import { RatingTitle } from '../types/Review.type';

export const LIMIT = 8;

export const MIN_COMMENT_LENGTH = 50;

export const RATINGS: RatingTitle[] = [
  { value: '5', title: 'perfect' },
  { value: '4', title: 'good' },
  { value: '3', title: 'not bad' },
  { value: '2', title: 'badly' },
  { value: '1', title: 'terribly' },
];

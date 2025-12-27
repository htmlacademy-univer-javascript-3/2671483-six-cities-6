import { render, screen } from '@testing-library/react';
import { IReview } from '../../../shared/types/review.type';
import ReviewList from './review-list';

describe('Component: ReviewList', () => {
  const mockReviews: IReview[] = [
    {
      id: '1',
      date: '2023-05-18T14:13:56.569Z',
      user: { name: 'Isaac', avatarUrl: 'img/1.jpg', isPro: false },
      comment: 'Nice place!',
      rating: 4,
    },
    {
      id: '2',
      date: '2023-06-10T14:13:56.569Z',
      user: { name: 'John', avatarUrl: 'img/2.jpg', isPro: true },
      comment: 'Very good!',
      rating: 5,
    },
  ];

  it('should render correctly with reviews count', () => {
    const expectedCount = mockReviews.length;
    const expectedTitleText = /Reviews/i;

    render(<ReviewList reviews={mockReviews} reviewCount={expectedCount} />);

    const titleElement = screen.getByText(expectedTitleText);
    const countElement = screen.getByText(expectedCount.toString());
    const listItems = screen.getAllByRole('listitem');

    expect(titleElement).toBeInTheDocument();
    expect(countElement).toBeInTheDocument();
    expect(listItems).toHaveLength(expectedCount);
  });
});

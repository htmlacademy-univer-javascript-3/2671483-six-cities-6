import { render, screen } from '@testing-library/react';
import { IReview } from '../../shared/types/review.type';
import Review from './review';

describe('Component: Review', () => {
  const mockReview: IReview = {
    id: '1',
    date: '2023-05-18T14:13:56.569Z',
    user: {
      name: 'Isaac',
      avatarUrl: 'img/avatar.jpg',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4,
  };

  it('should render correctly with review data', () => {
    const expectedName = mockReview.user.name;
    const expectedComment = mockReview.comment;
    const expectedDateDisplay = /May 18/i;
    const expectedDateTime = '2023-05-18';

    render(<Review review={mockReview} />);

    expect(screen.getByText(expectedName)).toBeInTheDocument();
    expect(screen.getByText(expectedComment)).toBeInTheDocument();
    expect(screen.getByAltText(/Reviews avatar/i)).toHaveAttribute(
      'src',
      mockReview.user.avatarUrl
    );

    const timeElement = screen.getByText(expectedDateDisplay);

    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', expectedDateTime);
  });
});

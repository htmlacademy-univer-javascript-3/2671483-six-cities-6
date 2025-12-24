import { render, screen } from '@testing-library/react';
import RatingStars from './index';

describe('Component: RatingStars', () => {
  it('should render correctly with default props', () => {
    const expectedWidth = '0%';

    const { container } = render(<RatingStars />);

    const starsElement = container.querySelector('.rating__stars span');

    expect(starsElement).toBeInTheDocument();
    expect(starsElement).toHaveStyle({ width: expectedWidth });
  });

  it('should render correctly with rating 4 and value', () => {
    const rating = 4;
    const expectedWidth = '80%';
    const expectedValue = '4';

    render(<RatingStars rating={rating} withValue />);

    const ratingValue = screen.getByText(expectedValue);
    const starsElement = screen.getByText(/Rating/i).previousElementSibling;

    expect(ratingValue).toBeInTheDocument();
    expect(starsElement).toHaveStyle({ width: expectedWidth });
  });

  it('should render correctly with float rating value', () => {
    const floatRating = 3.6;
    const expectedWidth = '72%';

    const { container } = render(<RatingStars rating={floatRating} />);
    const starsElement = container.querySelector('.rating__stars span');

    expect(starsElement).toBeInTheDocument();
    expect(starsElement).toHaveStyle({ width: expectedWidth });
  });

  it('should not render rating value by default', () => {
    const rating = 5;
    const ratingValueText = '5';

    render(<RatingStars rating={rating} />);

    const ratingValue = screen.queryByText(ratingValueText);

    expect(ratingValue).not.toBeInTheDocument();
  });
});

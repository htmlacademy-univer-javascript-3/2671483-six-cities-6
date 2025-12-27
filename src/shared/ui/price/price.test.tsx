import { render, screen } from '@testing-library/react';
import { Price } from './index';

describe('Component: Price', () => {
  const expectedPrice = '120';
  const expectedPeriod = '/ night';

  it('should render correctly for "offer" block', () => {
    const mockBlock = 'offer';

    render(<Price block={mockBlock}>{expectedPrice}</Price>);

    const priceValue = screen.getByText(new RegExp(`€${expectedPrice}`, 'i'));
    const pricePeriod = screen.getByText(new RegExp(expectedPeriod, 'i'));

    expect(priceValue).toBeInTheDocument();
    expect(pricePeriod).toBeInTheDocument();
  });

  it('should render correctly for "place-card" block', () => {
    const mockBlock = 'place-card';

    render(<Price block={mockBlock}>{expectedPrice}</Price>);

    const priceValue = screen.getByText(new RegExp(`€${expectedPrice}`, 'i'));

    expect(priceValue).toBeInTheDocument();
  });
});

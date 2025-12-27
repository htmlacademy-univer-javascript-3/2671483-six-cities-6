import { render, screen } from '@testing-library/react';
import { Offers } from '../../types/offer.type';
import { OffersCount } from './index';

describe('Component: OffersCount', () => {
  const mockCity = 'Amsterdam';
  const mockOffers = [{ id: '1' }, { id: '2' }, { id: '3' }] as Offers;

  it('should render correctly with offers length and city name', () => {
    const expectedCount = mockOffers.length.toString();
    const expectedCity = mockCity;
    const expectedText = new RegExp(
      `${expectedCount} places to stay in ${expectedCity}`,
      'i'
    );

    render(<OffersCount offers={mockOffers} city={mockCity} />);

    const countElement = screen.getByText(expectedText);

    expect(countElement).toBeInTheDocument();
    expect(countElement.tagName).toBe('B');
  });

  it('should render correctly when offers list is empty', () => {
    const emptyOffers = [] as Offers;
    const expectedText = new RegExp(`0 places to stay in ${mockCity}`, 'i');

    render(<OffersCount offers={emptyOffers} city={mockCity} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

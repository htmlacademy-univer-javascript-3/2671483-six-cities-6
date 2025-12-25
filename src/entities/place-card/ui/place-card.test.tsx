import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Offer } from '../../../shared/types/offer.type';
import { PlaceCard } from './place-card';

describe('Component: PlaceCard', () => {
  const mockOffer: Offer = {
    id: '6af6f711-c28d-4ee3-a7d5-f27c36cfb209',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: { latitude: 0, longitude: 0, zoom: 10 },
    },
    location: { latitude: 0, longitude: 0, zoom: 10 },
    isFavorite: 0,
    isPremium: true,
    rating: 4.8,
    previewImage: 'img/1.jpg',
  };

  const bookmarkTestId = 'bookmark-button';
  const renderBookmark = () => (
    <div data-testid={bookmarkTestId}>Bookmark Button</div>
  );

  it('should render correctly with offer data', () => {
    const expectedTitle = mockOffer.title;
    const expectedPrice = `€${mockOffer.price}`;
    const expectedType = /Apartment/i;

    render(
      <MemoryRouter>
        <PlaceCard offer={mockOffer} renderBookmarkBtn={renderBookmark} />
      </MemoryRouter>
    );

    const titleElement = screen.getByText(expectedTitle);
    const priceElement = screen.getByText(expectedPrice);
    const typeElement = screen.getByText(expectedType);
    const premiumMark = screen.getByText(/Premium/i);
    const bookmarkElement = screen.getByTestId(bookmarkTestId);

    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(typeElement).toBeInTheDocument();
    expect(premiumMark).toBeInTheDocument();
    expect(bookmarkElement).toBeInTheDocument();
  });

  it('should not render premium mark when isPremium is false', () => {
    const nonPremiumOffer = { ...mockOffer, isPremium: false };

    render(
      <MemoryRouter>
        <PlaceCard offer={nonPremiumOffer} renderBookmarkBtn={renderBookmark} />
      </MemoryRouter>
    );

    const premiumMark = screen.queryByText(/Premium/i);

    expect(premiumMark).not.toBeInTheDocument();
  });
});

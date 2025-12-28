import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import type { Offer } from '../../../shared/types/offer.type';
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
    const expectedType = /apartment/i;

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
    const linkElement = screen.getByRole('link', { name: expectedTitle });

    expect(titleElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(typeElement).toBeInTheDocument();
    expect(premiumMark).toBeInTheDocument();
    expect(bookmarkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', `/offer/${mockOffer.id}`);
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

  it('should call onHoverStart and onHoverEnd when mouse interaction occurs', () => {
    const onHoverStart = vi.fn();
    const onHoverEnd = vi.fn();

    render(
      <MemoryRouter>
        <PlaceCard
          offer={mockOffer}
          renderBookmarkBtn={renderBookmark}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      </MemoryRouter>
    );

    const card = screen.getByRole('article');

    fireEvent.mouseEnter(card);
    expect(onHoverStart).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(card);
    expect(onHoverEnd).toHaveBeenCalledTimes(1);
  });
});

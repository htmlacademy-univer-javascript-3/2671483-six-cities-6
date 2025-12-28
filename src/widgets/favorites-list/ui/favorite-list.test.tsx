import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Offer } from '../../../shared/types/offer.type';
import { useFavoritesList } from '../model/use-favorites-list';
import { FavoritesList } from './favorites-list';

vi.mock('../model/use-favorites-list');
const mockUseFavoritesList = vi.mocked(useFavoritesList);

vi.mock('../../../shared/ui/loader', () => ({
  Loader: () => <div data-testid="loader" />,
}));

vi.mock('../../../entities/place-card', () => ({
  PlaceCard: ({ offer }: { offer: { title: string } }) => (
    <div>{offer.title}</div>
  ),
}));

describe('Component: FavoritesList', () => {
  it('should render Loader when isLoading is true', () => {
    mockUseFavoritesList.mockReturnValue({
      isFavoritesEmpty: true,
      isLoading: true,
      hasError: false,
      cityNames: [],
      groupedOffers: {},
    });

    render(<FavoritesList />);

    const loaderElement = screen.getByTestId('loader');

    expect(loaderElement).toBeInTheDocument();
  });

  it('should render error message when hasError is true', () => {
    mockUseFavoritesList.mockReturnValue({
      isFavoritesEmpty: true,
      isLoading: false,
      hasError: true,
      cityNames: [],
      groupedOffers: {},
    });

    render(<FavoritesList />);

    const errorElement = screen.getByText(/Failed to load favorite offers/i);

    expect(errorElement).toBeInTheDocument();
  });

  it('should render empty state when isFavoritesEmpty is true', () => {
    mockUseFavoritesList.mockReturnValue({
      isFavoritesEmpty: true,
      isLoading: false,
      hasError: false,
      cityNames: [],
      groupedOffers: {},
    });

    render(<FavoritesList />);

    const emptyTitle = screen.getByText(/Nothing yet saved/i);

    expect(emptyTitle).toBeInTheDocument();
  });

  it('should render list of cities and offers when data is loaded', () => {
    const cityName = 'Paris';
    const mockOffer = { id: '1', title: 'Nice Apartment' };

    mockUseFavoritesList.mockReturnValue({
      isFavoritesEmpty: false,
      isLoading: false,
      hasError: false,
      cityNames: [cityName],
      groupedOffers: { [cityName]: [mockOffer as Offer] },
    });

    render(
      <MemoryRouter>
        <FavoritesList />
      </MemoryRouter>
    );

    const cityElement = screen.getByText(cityName);
    const offerElement = screen.getByText(mockOffer.title);

    expect(cityElement).toBeInTheDocument();
    expect(offerElement).toBeInTheDocument();
  });
});

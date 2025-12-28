import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import type { Offer } from '../../../shared/types/offer.type';
import { MainContent } from './main-content';

const mockStore = configureMockStore();

vi.mock('../../map/ui', () => ({
  default: () => <div data-testid="map" />,
}));

vi.mock('../../offer-list-wrapper', () => ({
  OfferListWrapper: () => <div data-testid="offer-list-wrapper" />,
}));

vi.mock('./main-content-empty', () => ({
  MainContentEmpty: ({ city }: { city: string }) => (
    <div data-testid="empty-content">{city}</div>
  ),
}));

const mockOffer = {
  id: '1',
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
} as Offer;

describe('Component: MainContent', () => {
  it('should render empty state when offers is empty', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MainContent
          offers={[]}
          selectedCity="Paris"
          selectedPoint={undefined}
          onListItemHover={vi.fn()}
        />
      </Provider>
    );

    const emptyElement = screen.getByTestId('empty-content');
    const listElement = screen.queryByTestId('offer-list-wrapper');

    expect(emptyElement).toBeInTheDocument();
    expect(emptyElement).toHaveTextContent('Paris');
    expect(listElement).not.toBeInTheDocument();
  });

  it('should render content with list and map when offers is not empty', () => {
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MainContent
            offers={[mockOffer]}
            selectedCity="Paris"
            selectedPoint={undefined}
            onListItemHover={vi.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const listElement = screen.getByTestId('offer-list-wrapper');
    const mapElement = screen.getByTestId('map');
    const citiesContainer = container.querySelector('.cities');

    expect(listElement).toBeInTheDocument();
    expect(mapElement).toBeInTheDocument();
    expect(citiesContainer).toBeInTheDocument();
  });
});

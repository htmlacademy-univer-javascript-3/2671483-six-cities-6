import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { OfferListWrapper } from './offer-list-wrapper';

const mockStore = configureMockStore();

vi.mock('../../offer-list/ui/offer-list', () => ({
  default: () => <div data-testid="offer-list" />,
}));

vi.mock('../../../features/sort-offers', () => ({
  SortOffers: () => <div data-testid="sort-offers" />,
}));

vi.mock('../../../shared/ui/offers-count', () => ({
  OffersCount: () => <div data-testid="offers-count" />,
}));

describe('Component: OfferListWrapper', () => {
  it('should render main block with count and sort when block is main', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferListWrapper offers={[]} block="main" selectedCity="Paris" />
        </MemoryRouter>
      </Provider>
    );

    const titleElement = screen.getByText(/Places/i);
    const countElement = screen.getByTestId('offers-count');
    const sortElement = screen.getByTestId('sort-offers');
    const listElement = screen.getByTestId('offer-list');

    expect(titleElement).toBeInTheDocument();
    expect(countElement).toBeInTheDocument();
    expect(sortElement).toBeInTheDocument();
    expect(listElement).toBeInTheDocument();
  });

  it('should render nearby block without count and sort', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferListWrapper offers={[]} block="nearby" />
        </MemoryRouter>
      </Provider>
    );

    const titleElement = screen.getByText(/Other places in the neighbourhood/i);
    const countElement = screen.queryByTestId('offers-count');
    const sortElement = screen.queryByTestId('sort-offers');
    const listElement = screen.getByTestId('offer-list');

    expect(titleElement).toBeInTheDocument();
    expect(countElement).not.toBeInTheDocument();
    expect(sortElement).not.toBeInTheDocument();
    expect(listElement).toBeInTheDocument();
  });
});

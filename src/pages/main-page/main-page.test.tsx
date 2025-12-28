import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as offersSelectors from '../../entities/offer/model/offers.selectors';
import * as citySelectors from '../../features/city-selector/model/city-selector.selectors';
import * as sortSelectors from '../../features/sort-offers/model/sort-offers.selectors';
import type { Offer } from '../../shared/types/offer.type';
import MainPage from './main-page';

vi.mock('../../widgets/header', () => ({
  Header: () => <div data-testid="header" />,
}));

vi.mock('../../widgets/main-content', () => ({
  MainContent: () => <div data-testid="main-content" />,
}));

vi.mock('../../features/city-selector', () => ({
  CitySelector: () => <div data-testid="city-selector" />,
}));

vi.mock('../../shared/ui/loader', () => ({
  Loader: () => <div data-testid="loader" />,
}));

const mockStore = configureMockStore();

describe('Component: MainPage', () => {
  const mockCityName = 'Paris';

  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 100,
    city: {
      name: mockCityName,
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
    },
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
    isFavorite: 0,
    isPremium: false,
    rating: 4,
    previewImage: 'img.jpg',
  };

  it('should render loader when isLoading is true', () => {
    const store = mockStore({});
    vi.spyOn(offersSelectors, 'selectIsOffersLoading').mockReturnValue(true);
    vi.spyOn(sortSelectors, 'selectSortedOffers').mockReturnValue([]);
    vi.spyOn(citySelectors, 'selectCurrentCity').mockReturnValue(mockCityName);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage limit={10} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render main content when loading is finished', () => {
    const store = mockStore({});
    vi.spyOn(offersSelectors, 'selectIsOffersLoading').mockReturnValue(false);
    vi.spyOn(sortSelectors, 'selectSortedOffers').mockReturnValue([mockOffer]);
    vi.spyOn(citySelectors, 'selectCurrentCity').mockReturnValue(mockCityName);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage limit={10} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });

  it('should apply empty class when no offers available', () => {
    const store = mockStore({});
    vi.spyOn(offersSelectors, 'selectIsOffersLoading').mockReturnValue(false);
    vi.spyOn(sortSelectors, 'selectSortedOffers').mockReturnValue([]);
    vi.spyOn(citySelectors, 'selectCurrentCity').mockReturnValue(mockCityName);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage limit={10} />
        </MemoryRouter>
      </Provider>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('page__main--index-empty');
  });
});

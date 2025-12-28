import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../../shared/config/auth-status';
import type { Offer } from '../../../shared/types/offer.type';
import { OfferContent } from './offer-content';

const mockStore = configureMockStore();

const mockFullOffer = {
  id: '1',
  title: 'Luxury Villa',
  images: ['img1.jpg'],
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  rating: 4.5,
  isPremium: true,
  price: 500,
  type: 'house',
  bedrooms: 3,
  maxAdults: 4,
  goods: ['Wi-Fi'],
  host: { name: 'Angelina', isPro: true, avatarUrl: 'img/1.png' },
};

describe('Component: OfferContent', () => {
  it('should render Loader when isLoading is true', () => {
    const store = mockStore({
      offer: { isLoading: true, offer: null, hasError: false, reviews: [] },
    });

    const { container } = render(
      <Provider store={store}>
        <OfferContent points={[]} selectedPoint={undefined} />
      </Provider>
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should render gallery, details and map when data is loaded', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
      offer: {
        isLoading: false,
        offer: mockFullOffer,
        hasError: false,
        reviews: [],
      },
    });

    const points = [mockFullOffer] as unknown as Offer[];

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferContent points={points} selectedPoint={undefined} />
        </MemoryRouter>
      </Provider>
    );
    const offerSection = container.querySelector('.offer');
    const mapElement = container.querySelector('.leaflet-container');

    expect(screen.getByText(mockFullOffer.title)).toBeInTheDocument();
    expect(offerSection).toBeInTheDocument();
    expect(mapElement).toBeInTheDocument();
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../../shared/config/auth-status';
import type { FullOffer } from '../../../shared/types/offer.type';
import { OfferDetails } from './offer-details';

const mockStore = configureMockStore();

const mockFullOffer = {
  id: 'offer-1',
  title: 'Luxury Villa',
  type: 'house',
  price: 500,
  rating: 4.5,
  bedrooms: 3,
  maxAdults: 4,
  isPremium: true,
  isFavorite: false,
  goods: ['Wi-Fi', 'Kitchen'],
  description: 'A great place',
  host: { name: 'Angelina', isPro: true, avatarUrl: 'img/1.png' },
  images: ['img/1.jpg'],
} as unknown as FullOffer;

describe('Component: OfferDetails', () => {
  it('should render correct offer info and ReviewForm when user is authorized', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@mail.ru', avatarUrl: 'img/1.png' },
      },
      offer: {
        reviews: [],
        offer: mockFullOffer,
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferDetails offer={mockFullOffer} reviews={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Luxury Villa')).toBeInTheDocument();
  });

  it('should NOT render ReviewForm when user is not authorized', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
      offer: {
        reviews: [],
        offer: mockFullOffer,
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferDetails offer={mockFullOffer} reviews={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Luxury Villa')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Submit/i })
    ).not.toBeInTheDocument();
  });
});

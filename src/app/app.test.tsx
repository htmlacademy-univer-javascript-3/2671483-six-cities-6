import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import { AuthorizationStatus } from '../shared/config/auth-status';
import { AppRoute } from '../shared/config/route';
import App from './app';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    BrowserRouter: ({
      children,
    }: {
      children: React.ReactNode;
    }): React.ReactNode => children,
  };
});

describe('Application Routing', () => {
  const store = mockStore({
    user: { authorizationStatus: AuthorizationStatus },
    city: { city: 'Paris' },
    offerList: { list: [], isLoading: false },
    sortOffers: { sortOption: 'Popular' },
    offer: {
      offer: null,
      offersNearby: [],
      reviews: [],
      isLoading: false,
      hasError: false,
    },
    favoritesOffers: { list: [] },
  });

  it('should render "MainPage" when navigate to Root', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Root]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when navigate to Login', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Login]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole('heading', { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  it('should render "OfferPage" when navigate to Offer', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/Other places in the neighbourhood/i)
    ).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when navigate to non-existent route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/bad-route']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});

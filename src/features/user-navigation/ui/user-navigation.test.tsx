import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../../shared/config/auth-status';
import UserNavigation from './user-navigation';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: UserNavigation', () => {
  const initialState = {
    user: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    },
    offerList: {
      list: [],
      isLoading: false,
    },
    favoritesOffers: {
      list: [],
    },
  };

  it('should render "Sign in" when user is not authorized', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserNavigation />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render user email and favorite count when authorized', () => {
    const store = mockStore({
      ...initialState,
      user: {
        user: {
          email: 'test@example.com',
          avatarUrl: 'img/1.png',
        },
        authorizationStatus: AuthorizationStatus.Auth,
      },
      offerList: {
        list: [
          { id: 1, isFavorite: true },
          { id: 2, isFavorite: true },
        ],
        isLoading: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserNavigation />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should dispatch logoutAction on click', async () => {
    const store = mockStore({
      ...initialState,
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: { email: 'test@example.com' },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserNavigation />
        </MemoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Sign out/i));
    const actions = store.getActions();

    expect(actions[0].type).toBe('user/logout/pending');
  });
});

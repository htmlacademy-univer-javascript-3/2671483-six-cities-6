import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthorizationStatus } from '../../shared/config/auth-status';
import { AppRoute } from '../../shared/config/route';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();

describe('Component: PrivateRoute', () => {
  it('should render "Outlet" (private content) when user is authorized', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route
                path={AppRoute.Favorites}
                element={<span>Private Page Content</span>}
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Private Page Content/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login Page/i)).not.toBeInTheDocument();
  });

  it('should redirect to "/login" when user is not authorized', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Favorites]}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route
                path={AppRoute.Favorites}
                element={<span>Private Page Content</span>}
              />
            </Route>
            <Route path={AppRoute.Login} element={<span>Login Page</span>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Private Page Content/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });
});

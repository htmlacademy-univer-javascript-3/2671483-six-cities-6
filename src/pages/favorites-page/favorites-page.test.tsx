import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { vi } from 'vitest';
import * as favoritesThunks from '../../features/favorites/model/favorites.thunks';
import FavoritesPage from './favorites-page';

const middlewares = [thunk];
const mockStore = configureMockStore<Record<string, unknown>, AnyAction>(
  middlewares
);

vi.mock('../../widgets/header', () => ({
  Header: () => <header data-testid="header" />,
}));

vi.mock('../../widgets/favorites-list', () => ({
  FavoritesList: () => <div data-testid="favorites-list" />,
}));

vi.mock('../../shared/ui', () => ({
  Logo: () => <div data-testid="logo" />,
}));

describe('Component: FavoritesPage', () => {
  it('should dispatch fetchFavoritesAction on mount', () => {
    const store = mockStore({});
    const fetchFavoritesSpy = vi.spyOn(favoritesThunks, 'fetchFavoritesAction');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(fetchFavoritesSpy).toHaveBeenCalled();
  });

  it('should render all page sections correctly', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('page__main--favorites');
  });
});

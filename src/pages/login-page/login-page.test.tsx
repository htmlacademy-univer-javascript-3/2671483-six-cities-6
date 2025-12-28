import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi, type Mock } from 'vitest';
import { changeCity } from '../../features/city-selector/model/city-selector-slice';
import { AppRoute } from '../../shared/config/route';
import LoginPage from './login-page';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../../features/login-form/ui/login-form', () => ({
  LoginForm: () => <div data-testid="login-form" />,
}));

vi.mock('../../widgets/header', () => ({
  Header: () => <header data-testid="header" />,
}));

vi.mock('../../shared/lib/utils', () => ({
  getRandomCity: () => 'Amsterdam',
}));

const mockStore = configureMockStore();

describe('Component: LoginPage', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });

  it('should dispatch changeCity and navigate to root when city link is clicked', async () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const cityLink = screen.getByRole('link', { name: 'Amsterdam' });
    await userEvent.click(cityLink);

    const actions = store.getActions();

    expect(actions[0].type).toBe(changeCity.type);
    expect(actions[0].payload).toBe('Amsterdam');
    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Root);
  });
});

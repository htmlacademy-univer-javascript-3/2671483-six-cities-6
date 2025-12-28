import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi, type Mock } from 'vitest';
import { AppRoute } from '../../../shared/config/route';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import { useLoginForm } from '../model/use-login-form';
import { LoginForm } from './login-form';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../../../shared/lib/hooks/redux');
vi.mock('../model/use-login-form');
vi.mock('../../../entities/user/model/user.selectors');

const mockUseAppSelector = vi.mocked(useAppSelector);
const mockUseLoginForm = vi.mocked(useLoginForm);
const mockNavigate = vi.fn();

describe('Component: LoginForm', () => {
  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    vi.clearAllMocks();
  });

  it('should render correctly when user is not authorized', () => {
    mockUseAppSelector.mockReturnValue(false);
    mockUseLoginForm.mockReturnValue({
      formData: { email: '', password: '' },
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should redirect to root when user is authorized', () => {
    mockUseAppSelector.mockReturnValue(true);
    mockUseLoginForm.mockReturnValue({
      formData: { email: '', password: '' },
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Root);
  });
});

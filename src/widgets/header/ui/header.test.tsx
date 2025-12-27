import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Header from './header';

vi.mock('../../../features/user-navigation', () => ({
  UserNavigation: () => <div data-testid="user-navigation" />,
}));

describe('Component: Header', () => {
  const navigationTestId = 'user-navigation';

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoElement = screen.getByRole('link');
    const navigationElement = screen.getByTestId(navigationTestId);

    expect(logoElement).toBeInTheDocument();
    expect(navigationElement).toBeInTheDocument();
  });

  it('should not render navigation when showNavigation is false', () => {
    render(
      <MemoryRouter>
        <Header showNavigation={false} />
      </MemoryRouter>
    );

    const navigationElement = screen.queryByTestId(navigationTestId);

    expect(navigationElement).not.toBeInTheDocument();
  });
});

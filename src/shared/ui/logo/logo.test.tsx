import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '../../config/route';
import { Logo } from './index';

describe('Component: Logo', () => {
  it('should render correctly with default props', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    const logoImage = screen.getByAltText(/6 cities logo/i);
    const linkElement = screen.getByRole('link');

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'img/logo.svg');
    expect(logoImage).toHaveAttribute('width', '81');

    expect(linkElement).toHaveAttribute('href', AppRoute.Root);
    expect(linkElement).toHaveClass('header__logo-link');
  });

  it('should render correctly when block is "footer"', () => {
    const customWidth = 64;
    const customHeight = 33;

    render(
      <MemoryRouter>
        <Logo block="footer" width={customWidth} height={customHeight} />
      </MemoryRouter>
    );

    const logoImage = screen.getByAltText(/6 cities logo/i);
    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveClass('footer__logo-link');
    expect(logoImage).toHaveAttribute('width', customWidth.toString());
    expect(logoImage).toHaveAttribute('height', customHeight.toString());
  });
});

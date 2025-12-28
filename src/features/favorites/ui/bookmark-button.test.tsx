import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { useFavorites } from '../model/use-favorites';
import { BookmarkButton } from './bookmark-button';

vi.mock('../model/use-favorites');
const mockUseFavorites = vi.mocked(useFavorites);

describe('Component: BookmarkButton', () => {
  it('should render correctly in default state', () => {
    mockUseFavorites.mockReturnValue({
      toggleFavorite: vi.fn(),
    });

    render(<BookmarkButton offerId="1" isFavorite={0} />);

    const buttonElement = screen.getByRole('button');
    const spanElement = screen.getByText(/To bookmarks/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('place-card__bookmark-button');
    expect(spanElement).toBeInTheDocument();
  });

  it('should have active class when isFavorite is 1', () => {
    mockUseFavorites.mockReturnValue({
      toggleFavorite: vi.fn(),
    });

    render(<BookmarkButton offerId="1" isFavorite={1} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('place-card__bookmark-button--active');
  });

  it('should use offer block classes when block prop is offer', () => {
    mockUseFavorites.mockReturnValue({
      toggleFavorite: vi.fn(),
    });

    render(<BookmarkButton offerId="1" isFavorite={0} block="offer" />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('offer__bookmark-button');
  });

  it('should call toggleFavorite when clicked', async () => {
    const toggleFavorite = vi.fn();
    mockUseFavorites.mockReturnValue({
      toggleFavorite,
    });

    render(<BookmarkButton offerId="1" isFavorite={0} />);

    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    expect(toggleFavorite).toHaveBeenCalledTimes(1);
  });
});

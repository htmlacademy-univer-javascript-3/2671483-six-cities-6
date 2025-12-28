import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { useSortOffers } from '../model/use-sort-offers';
import MemoizedSortOffers from './sort-offers';

vi.mock('../model/use-sort-offers');
const mockUseSortOffers = vi.mocked(useSortOffers);

describe('Component: SortOffers', () => {
  it('should render correctly with closed list', () => {
    mockUseSortOffers.mockReturnValue({
      isOpen: false,
      activeSort: 'Popular',
      handleToggle: vi.fn(),
      handleSelect: vi.fn(),
    });

    render(<MemoizedSortOffers />);

    const captionElement = screen.getByText(/Sort by/i);
    const typeElement = screen.getByText('Popular');
    const listElement = screen.queryByRole('list');

    expect(captionElement).toBeInTheDocument();
    expect(typeElement).toBeInTheDocument();
    expect(listElement).not.toBeInTheDocument();
  });

  it('should render open list when isOpen is true', () => {
    mockUseSortOffers.mockReturnValue({
      isOpen: true,
      activeSort: 'Popular',
      handleToggle: vi.fn(),
      handleSelect: vi.fn(),
    });

    render(<MemoizedSortOffers />);

    const listElement = screen.getByRole('list');
    const optionElement = screen.getByText('Price: low to high');

    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass('places__options--opened');
    expect(optionElement).toBeInTheDocument();
  });

  it('should call handleToggle when type is clicked', async () => {
    const handleToggle = vi.fn();
    mockUseSortOffers.mockReturnValue({
      isOpen: false,
      activeSort: 'Popular',
      handleToggle,
      handleSelect: vi.fn(),
    });

    render(<MemoizedSortOffers />);

    const typeElement = screen.getByText('Popular');
    await userEvent.click(typeElement);

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('should call handleSelect when option is clicked', async () => {
    const handleSelect = vi.fn();
    mockUseSortOffers.mockReturnValue({
      isOpen: true,
      activeSort: 'Popular',
      handleToggle: vi.fn(),
      handleSelect,
    });

    render(<MemoizedSortOffers />);

    const optionElement = screen.getByText('Price: low to high');
    await userEvent.click(optionElement);

    expect(handleSelect).toHaveBeenCalledWith('Price: low to high');
  });
});

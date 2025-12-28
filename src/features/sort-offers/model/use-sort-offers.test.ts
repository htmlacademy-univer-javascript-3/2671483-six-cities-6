import { act, renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SORT_OPTIONS } from '../../../shared/config/const';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import { changeSortOption } from './sort-offers-slice';
import { useSortOffers } from './use-sort-offers';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../../shared/lib/hooks/redux', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('./sort-offers-slice', () => ({
  changeSortOption: vi.fn((option: string) => ({
    type: 'sort/changeSortOption',
    payload: option,
  })),
}));

describe('Hook: useSortOffers', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDispatch).mockReturnValue(dispatch);
  });

  it('should initialize with default state', () => {
    vi.mocked(useAppSelector).mockReturnValue(SORT_OPTIONS[0]);

    const { result } = renderHook(() => useSortOffers());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.activeSort).toBe(SORT_OPTIONS[0]);
  });

  it('should toggle isOpen state when handleToggle is called', () => {
    vi.mocked(useAppSelector).mockReturnValue(SORT_OPTIONS[0]);
    const { result } = renderHook(() => useSortOffers());

    act(() => {
      result.current.handleToggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleToggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should dispatch action and close list when a new option is selected', () => {
    const initialOption = SORT_OPTIONS[0];
    const newOption = SORT_OPTIONS[1];
    vi.mocked(useAppSelector).mockReturnValue(initialOption);

    const { result } = renderHook(() => useSortOffers());

    act(() => {
      result.current.handleToggle();
    });

    act(() => {
      result.current.handleSelect(newOption);
    });

    expect(dispatch).toHaveBeenCalledWith(changeSortOption(newOption));
    expect(result.current.isOpen).toBe(false);
  });

  it('should not dispatch action if same option is selected', () => {
    const currentOption = SORT_OPTIONS[0];
    vi.mocked(useAppSelector).mockReturnValue(currentOption);

    const { result } = renderHook(() => useSortOffers());

    act(() => {
      result.current.handleSelect(currentOption);
    });

    expect(dispatch).not.toHaveBeenCalled();
    expect(result.current.isOpen).toBe(false);
  });
});

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ALL_CITIES, SORT_OPTIONS } from '../../../shared/config/const';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/redux';
import { changeSortOption } from '../../sort-offers/model/sort-offers-slice';
import { changeCity } from './city-selector-slice';
import { useCitySelector } from './use-city-selector';

vi.mock('../../../shared/lib/hooks/redux', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('./city-selector-slice', () => ({
  changeCity: vi.fn((city: string) => ({
    type: 'city/changeCity',
    payload: city,
  })),
}));

vi.mock('../../sort-offers/model/sort-offers-slice', () => ({
  changeSortOption: vi.fn((option: string) => ({
    type: 'sort/changeSortOption',
    payload: option,
  })),
}));

describe('Hook: useCitySelector', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
  });

  it('should return initial values', () => {
    vi.mocked(useAppSelector).mockReturnValue(ALL_CITIES[0]);

    const { result } = renderHook(() => useCitySelector());

    expect(result.current.cities).toEqual(ALL_CITIES);
    expect(result.current.selectedCity).toBe(ALL_CITIES[0]);
    expect(typeof result.current.onCityChange).toBe('function');
  });

  it('should dispatch actions when city changes', () => {
    const initialCity = ALL_CITIES[0];
    const newCity = ALL_CITIES[1];
    vi.mocked(useAppSelector).mockReturnValue(initialCity);

    const { result } = renderHook(() => useCitySelector());

    act(() => {
      result.current.onCityChange(newCity);
    });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(changeSortOption).toHaveBeenCalledWith(SORT_OPTIONS[0]);
    expect(changeCity).toHaveBeenCalledWith(newCity);
  });

  it('should not dispatch actions when same city is selected', () => {
    const currentCity = ALL_CITIES[0];
    vi.mocked(useAppSelector).mockReturnValue(currentCity);

    const { result } = renderHook(() => useCitySelector());

    act(() => {
      result.current.onCityChange(currentCity);
    });

    expect(dispatch).not.toHaveBeenCalled();
  });
});

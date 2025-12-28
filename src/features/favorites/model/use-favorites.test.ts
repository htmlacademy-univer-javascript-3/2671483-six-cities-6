import { act, renderHook } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppRoute } from '../../../shared/config/route';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/lib/hooks/redux';
import { toggleFavoriteAction } from './favorites.thunks';
import { useFavorites } from './use-favorites';

vi.mock('../../../shared/lib/hooks/redux', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('./favorites.thunks', () => ({
  toggleFavoriteAction: vi.fn(
    (payload: { offerId: string; status: number }) => ({
      type: 'favorites/toggle',
      payload,
    })
  ),
}));

describe('Hook: useFavorites', () => {
  const dispatch = vi.fn();
  const navigate = vi.fn();
  const mockOfferId = 'offer-1';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
    vi.mocked(useNavigate).mockReturnValue(navigate);
  });

  it('should redirect to login when user is not authorized', () => {
    vi.mocked(useAppSelector).mockReturnValue(false);

    const { result } = renderHook(() => useFavorites(mockOfferId, 0));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(navigate).toHaveBeenCalledWith(AppRoute.Login);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch toggleFavoriteAction when user is authorized and isFavorite is 0', () => {
    vi.mocked(useAppSelector).mockReturnValue(true);

    const { result } = renderHook(() => useFavorites(mockOfferId, 0));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(dispatch).toHaveBeenCalled();
    expect(toggleFavoriteAction).toHaveBeenCalledWith({
      offerId: mockOfferId,
      status: 1,
    });
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should dispatch toggleFavoriteAction with status 0 when isFavorite is 1', () => {
    vi.mocked(useAppSelector).mockReturnValue(true);

    const { result } = renderHook(() => useFavorites(mockOfferId, 1));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(toggleFavoriteAction).toHaveBeenCalledWith({
      offerId: mockOfferId,
      status: 0,
    });
  });
});

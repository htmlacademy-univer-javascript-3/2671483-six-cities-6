import { act, renderHook } from '@testing-library/react';
import { ChangeEvent, FormEvent } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MIN_COMMENT_LENGTH } from '../../../shared/config/const';
import { useAppDispatch } from '../../../shared/lib/hooks/redux';
import { useReviewForm } from './use-review-form';

vi.mock('../../../shared/lib/hooks/redux', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('./review-form.thunks', () => ({
  postReviewAction: vi.fn(
    (payload: { offerId: string; comment: string; rating: number }) => ({
      type: 'review/post',
      payload,
    })
  ),
}));

describe('Hook: useReviewForm', () => {
  const dispatch = vi.fn(() => Promise.resolve());
  const mockOfferId = 'offer-1';
  const validComment = 'A'.repeat(MIN_COMMENT_LENGTH + 1);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(
      dispatch as unknown as ReturnType<typeof useAppDispatch>
    );
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useReviewForm(mockOfferId));
    expect(result.current.comment).toBe('');
    expect(result.current.isPending).toBe(false);
  });

  it('should update state and validate data correctly', () => {
    const { result } = renderHook(() => useReviewForm(mockOfferId));

    act(() => {
      result.current.handleChange({
        target: { name: 'rating', value: '5' },
      } as ChangeEvent<HTMLInputElement>);

      result.current.handleChange({
        target: { name: 'comment', value: validComment },
      } as ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.rating).toBe(5);
    expect(result.current.isValid).toBe(true);
  });

  it('should handle form submission and reset state', async () => {
    const { result } = renderHook(() => useReviewForm(mockOfferId));
    const mockSubmitEvent = { preventDefault: vi.fn() } as unknown as FormEvent;

    act(() => {
      result.current.handleChange({
        target: { name: 'rating', value: '5' },
      } as ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: 'comment', value: validComment },
      } as ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.isValid).toBe(true);

    await act(async () => {
      await result.current.handleSubmit(mockSubmitEvent);
    });

    expect(mockSubmitEvent.preventDefault).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(result.current.comment).toBe('');
    expect(result.current.isPending).toBe(false);
  });

  it('should not dispatch action if form is invalid', async () => {
    const { result } = renderHook(() => useReviewForm(mockOfferId));
    const mockSubmitEvent = { preventDefault: vi.fn() } as unknown as FormEvent;

    await act(async () => {
      await result.current.handleSubmit(mockSubmitEvent);
    });

    expect(dispatch).not.toHaveBeenCalled();
  });
});

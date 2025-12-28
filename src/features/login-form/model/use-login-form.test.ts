import { AnyAction } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import { ChangeEvent, FormEvent } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loginAction } from '../../../entities/user/model/user.thunks';
import { useAppDispatch } from '../../../shared/lib/hooks/redux';
import { AuthData } from '../../../shared/types/user.type';
import { useLoginForm } from './use-login-form';

vi.mock('../../../shared/lib/hooks/redux', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('../../../entities/user/model/user.thunks', () => ({
  loginAction: vi.fn(
    (payload: AuthData): AnyAction => ({
      type: 'user/login',
      payload,
    })
  ),
}));

describe('Hook: useLoginForm', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(
      dispatch as unknown as ReturnType<typeof useAppDispatch>
    );
  });

  it('should initialize with empty email and password', () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.formData).toEqual({
      email: '',
      password: '',
    });
  });

  it('should update formData when handleChange is called', () => {
    const { result } = renderHook(() => useLoginForm());
    const mockEvent = {
      target: { name: 'email', value: 'test@test.ru' },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChange(mockEvent);
    });

    expect(result.current.formData.email).toBe('test@test.ru');
  });

  it('should dispatch loginAction when handleSubmit is called with valid data', () => {
    const { result } = renderHook(() => useLoginForm());

    // Заполняем форму
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@test.ru' },
      } as ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: 'password', value: 'password123' },
      } as ChangeEvent<HTMLInputElement>);
    });

    const mockSubmitEvent = {
      preventDefault: vi.fn(),
    } as unknown as FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(mockSubmitEvent);
    });

    expect(mockSubmitEvent.preventDefault).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(loginAction).toHaveBeenCalledWith({
      email: 'test@test.ru',
      password: 'password123',
    });
  });

  it('should not dispatch loginAction when data is incomplete', () => {
    const { result } = renderHook(() => useLoginForm());
    const mockSubmitEvent = {
      preventDefault: vi.fn(),
    } as unknown as FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(mockSubmitEvent);
    });

    expect(dispatch).not.toHaveBeenCalled();
  });
});

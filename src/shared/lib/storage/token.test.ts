import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AUTH_TOKEN_KEY_NAME } from '../../config/app-settings';
import { dropToken, getToken, saveToken } from './token';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Storage: Token', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should return empty string when no token in localStorage', () => {
    const result = getToken();
    expect(result).toBe('');
  });

  it('should save token to localStorage', () => {
    const mockToken = 'test-token';
    saveToken(mockToken);
    expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBe(mockToken);
  });

  it('should return correct token from localStorage', () => {
    const mockToken = 'secret-token';
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, mockToken);
    const result = getToken();
    expect(result).toBe(mockToken);
  });

  it('should remove token from localStorage', () => {
    const mockToken = 'token-to-remove';
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, mockToken);
    dropToken();
    expect(localStorage.getItem(AUTH_TOKEN_KEY_NAME)).toBeNull();
  });
});

import { RootState } from '../../../app/store';
import { AuthorizationStatus } from '../../../shared/config/auth-status';
import {
  selectAuthorizationStatus,
  selectIsAuthorized,
  selectUser,
  selectUserData,
} from './user.selectors';

describe('Selectors: User', () => {
  const mockUser = {
    name: 'John',
    avatarUrl: 'img/avatar.jpg',
    isPro: false,
    email: 'john@doe.com',
    token: 'secret',
  };

  const mockState = {
    user: {
      user: mockUser,
      authorizationStatus: AuthorizationStatus.Auth,
    },
  } as RootState;

  it('should return the entire user slice from state', () => {
    const result = selectUser(mockState);
    expect(result).toEqual(mockState.user);
  });

  it('should return user data from state', () => {
    const result = selectUserData(mockState);
    expect(result).toEqual(mockUser);
  });

  it('should return authorization status from state', () => {
    const result = selectAuthorizationStatus(mockState);
    expect(result).toBe(AuthorizationStatus.Auth);
  });

  it('should return true if status is Auth', () => {
    const result = selectIsAuthorized(mockState);
    expect(result).toBe(true);
  });

  it('should return false if status is NoAuth', () => {
    const noAuthState = {
      user: {
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    } as RootState;

    const result = selectIsAuthorized(noAuthState);
    expect(result).toBe(false);
  });
});

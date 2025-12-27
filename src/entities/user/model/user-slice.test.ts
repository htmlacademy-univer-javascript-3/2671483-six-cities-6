import { AuthorizationStatus } from '../../../shared/config/auth-status';
import { UserData } from '../../../shared/types/user.type';
import { userReducer } from './user-slice';
import { checkAuthAction, loginAction, logoutAction } from './user.thunks';

describe('Slice: user', () => {
  const initialState = {
    user: null,
    authorizationStatus: AuthorizationStatus.Unknown,
  };

  const mockUser: UserData = {
    name: 'John Doe',
    avatarUrl: 'img/avatar.jpg',
    isPro: false,
    email: 'john@doe.com',
    token: 'secret-token',
  };

  it('should return initial state with empty action', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  describe('checkAuthAction', () => {
    it('should set Auth status and user on "fulfilled"', () => {
      const result = userReducer(
        initialState,
        checkAuthAction.fulfilled(mockUser, '', undefined)
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.user).toEqual(mockUser);
    });

    it('should set NoAuth status on "rejected"', () => {
      const result = userReducer(
        initialState,
        checkAuthAction.rejected(null, '', undefined)
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.user).toBeNull();
    });
  });

  describe('loginAction', () => {
    it('should set Auth status and user on "fulfilled"', () => {
      const loginData = { email: 'john@doe.com', password: '123' };
      const result = userReducer(
        initialState,
        loginAction.fulfilled(mockUser, '', loginData)
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.user).toEqual(mockUser);
    });

    it('should set NoAuth status on "rejected"', () => {
      const loginData = { email: 'john@doe.com', password: '123' };
      const result = userReducer(
        initialState,
        loginAction.rejected(null, '', loginData)
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });
  });

  describe('logoutAction', () => {
    it('should set NoAuth status and clear user on "fulfilled"', () => {
      const stateWithUser = {
        user: mockUser,
        authorizationStatus: AuthorizationStatus.Auth,
      };

      const result = userReducer(
        stateWithUser,
        logoutAction.fulfilled(undefined, '', undefined)
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.user).toBeNull();
    });
  });
});

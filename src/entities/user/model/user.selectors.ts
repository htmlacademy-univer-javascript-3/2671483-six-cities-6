import { RootState } from '../../../app/store';
import { AuthorizationStatus } from '../../../shared/config/auth-status';

export const selectUser = (state: RootState) => state.user;

export const selectUserData = (state: RootState) => state.user.user;

export const selectAuthorizationStatus = (state: RootState) =>
  state.user.authorizationStatus;

export const selectIsAuthorized = (state: RootState) =>
  state.user.authorizationStatus === AuthorizationStatus.Auth;

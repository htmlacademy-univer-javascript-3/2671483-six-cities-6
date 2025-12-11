import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoute } from '../../../shared/config/api-route';
import { dropToken, saveToken } from '../../../shared/lib/storage/token';

import type { ExtraType } from '../../../shared/types/Extra.type';
import type { AuthData, User } from '../../../shared/types/User.type';

export const checkAuthAction = createAsyncThunk<User, undefined, ExtraType>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(ApiRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<User, AuthData, ExtraType>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<User>(ApiRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, ExtraType>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  }
);

import { configureMockStore } from '@jedmao/redux-mock-store';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../app/store';
import { ApiRoute } from '../../../shared/config/api-route';
import * as tokenStorage from '../../../shared/lib/storage/token';
import { checkAuthAction, loginAction, logoutAction } from './user.thunks';

vi.mock('../../../shared/lib/storage/token', () => ({
  saveToken: vi.fn(),
  dropToken: vi.fn(),
  getToken: vi.fn(() => 'test-token'),
}));

type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;
const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('Async actions: User', () => {
  const axiosInstance = axios.create();
  const mockAxiosAdapter = new MockAdapter(axiosInstance);
  const middleware = [thunk.withExtraArgument(axiosInstance)];
  const mockStoreCreator = configureMockStore<
    RootState,
    Action<string>,
    AppThunkDispatch
  >(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({} as RootState);
    mockAxiosAdapter.reset();
    vi.clearAllMocks();
  });

  it('checkAuthAction: should dispatch "pending" and "fulfilled" on success', async () => {
    mockAxiosAdapter
      .onGet(ApiRoute.Login)
      .reply(200, { email: 'test@test.ru' });

    await store.dispatch(checkAuthAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toContain(checkAuthAction.pending.type);
    expect(actions).toContain(checkAuthAction.fulfilled.type);
  });

  it('loginAction: should dispatch "pending", "fulfilled" and SAVE token', async () => {
    const fakeUser = { email: 'test@test.ru', password: 'password' };
    const mockServerResponse = {
      token: 'secret-token-123',
      email: 'test@test.ru',
    };

    mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, mockServerResponse);

    await store.dispatch(loginAction(fakeUser));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toContain(loginAction.pending.type);
    expect(actions).toContain(loginAction.fulfilled.type);

    expect(tokenStorage.saveToken).toHaveBeenCalledWith(
      mockServerResponse.token
    );
    expect(tokenStorage.saveToken).toHaveBeenCalledTimes(1);
  });

  it('logoutAction: should dispatch "pending", "fulfilled" and DROP token', async () => {
    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

    await store.dispatch(logoutAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toContain(logoutAction.pending.type);
    expect(actions).toContain(logoutAction.fulfilled.type);

    expect(tokenStorage.dropToken).toHaveBeenCalledTimes(1);
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../app/store';
import { ApiRoute } from '../../../shared/config/api-route';
import { checkAuthAction, loginAction, logoutAction } from './user.thunks';

type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;
const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('Async actions: User (Logic only)', () => {
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

  it('loginAction: should dispatch "pending" and "fulfilled" on success', async () => {
    const fakeUser = { email: 'test@test.ru', password: 'password' };
    mockAxiosAdapter
      .onPost(ApiRoute.Login)
      .reply(200, { token: 'secret', email: 'test@test.ru' });

    await store.dispatch(loginAction(fakeUser));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toContain(loginAction.pending.type);
    expect(actions).toContain(loginAction.fulfilled.type);
  });

  it('logoutAction: should dispatch "pending" and "fulfilled" on success', async () => {
    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

    await store.dispatch(logoutAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toContain(logoutAction.pending.type);
    expect(actions).toContain(logoutAction.fulfilled.type);
  });
});

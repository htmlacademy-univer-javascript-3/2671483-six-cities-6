import { configureMockStore } from '@jedmao/redux-mock-store';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../app/store';
import { ApiRoute } from '../../../shared/config/api-route';
import { fetchOffersAction } from './offers.thunks';

type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;

const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('Async actions: Offers', () => {
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

  describe('fetchOffersAction', () => {
    it('should dispatch "pending" and "fulfilled" on success (200)', async () => {
      const mockOffers = [{ id: '1', title: 'Paris' }];
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      const fulfilledAction = store.getActions()[1] as ReturnType<
        typeof fetchOffersAction.fulfilled
      >;
      expect(fulfilledAction.payload).toEqual(mockOffers);
    });

    it('should dispatch "pending" and "rejected" on failure (400)', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400);

      await store.dispatch(fetchOffersAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });
});

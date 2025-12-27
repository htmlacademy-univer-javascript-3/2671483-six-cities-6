import { configureMockStore } from '@jedmao/redux-mock-store';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../app/store';
import { ApiRoute } from '../../../shared/config/api-route';
import { fetchFavoritesAction, toggleFavoriteAction } from './favorites.thunks';

type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;
const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('Async actions: Favorites', () => {
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

  describe('fetchFavoritesAction', () => {
    it('should dispatch "pending" and "fulfilled" when server response 200', async () => {
      const mockFavorites = [
        { id: '1', title: 'Nice hotel', isFavorite: true },
      ];
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());
      const fulfilledAction = store.getActions()[1] as ReturnType<
        typeof fetchFavoritesAction.fulfilled
      >;

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
      expect(fulfilledAction.payload).toEqual(mockFavorites);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should dispatch "pending" and "fulfilled" when status is changed', async () => {
      const mockOffer = { id: '1', title: 'Nice hotel', isFavorite: true };
      const statusArgs = { offerId: '1', status: 1 as const };

      mockAxiosAdapter
        .onPost(ApiRoute.FavoriteStatus(statusArgs.offerId, statusArgs.status))
        .reply(200, mockOffer);

      await store.dispatch(toggleFavoriteAction(statusArgs));
      const actions = extractActionsTypes(store.getActions());
      const toggleFulfilledAction = store.getActions()[1] as ReturnType<
        typeof toggleFavoriteAction.fulfilled
      >;

      expect(actions).toEqual([
        toggleFavoriteAction.pending.type,
        toggleFavoriteAction.fulfilled.type,
      ]);
      expect(toggleFulfilledAction.payload).toEqual(mockOffer);
    });
  });
});

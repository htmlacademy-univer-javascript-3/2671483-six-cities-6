import { configureMockStore } from '@jedmao/redux-mock-store';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../app/store';
import { ApiRoute } from '../../../shared/config/api-route';
import { IReview } from '../../../shared/types/review.type';
import { postReviewAction } from './review-form.thunks';

type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;
const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('Async actions: Review', () => {
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

  it('should dispatch "pending" and "fulfilled" when post review is successful', async () => {
    const mockOfferId = 'offer-1';
    const mockReviewData = { comment: 'Beautiful place!', rating: 5 };
    const mockServerResponse: IReview = {
      id: '1',
      user: { name: 'John', avatarUrl: '', isPro: false },
      date: '2023-10-10',
      ...mockReviewData,
    };

    mockAxiosAdapter
      .onPost(ApiRoute.Comments(mockOfferId))
      .reply(200, mockServerResponse);

    await store.dispatch(
      postReviewAction({ offerId: mockOfferId, ...mockReviewData })
    );

    const actions = store.getActions();
    const actionTypes = extractActionsTypes(actions);
    const fulfilledAction = actions[1] as ReturnType<
      typeof postReviewAction.fulfilled
    >;

    expect(actionTypes).toEqual([
      postReviewAction.pending.type,
      postReviewAction.fulfilled.type,
    ]);
    expect(fulfilledAction.payload).toEqual(mockServerResponse);
  });
});

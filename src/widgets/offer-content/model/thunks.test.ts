import { configureMockStore } from '@jedmao/redux-mock-store';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../app/store';
import { ApiRoute } from '../../../shared/config/api-route';
import { FullOffer, Offers } from '../../../shared/types/offer.type';
import { IReview } from '../../../shared/types/review.type';
import { fetchOfferDataAction } from './offer-details.thunks';

type AppThunkDispatch = ThunkDispatch<RootState, AxiosInstance, Action>;
const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('Async actions: OfferDetails', () => {
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

  it('should dispatch "pending" and "fulfilled" when all data fetched successfully', async () => {
    const mockOfferId = 'offer-1';
    const mockOffer = { id: mockOfferId, title: 'Luxury Appt' } as FullOffer;
    const mockNearby = [{ id: 'offer-2', title: 'Nearby' }] as Offers;
    const mockReviews = [{ id: 1, comment: 'Nice' }] as unknown as IReview[];

    mockAxiosAdapter.onGet(ApiRoute.Offer(mockOfferId)).reply(200, mockOffer);
    mockAxiosAdapter
      .onGet(ApiRoute.OffersNearby(mockOfferId))
      .reply(200, mockNearby);
    mockAxiosAdapter
      .onGet(ApiRoute.Comments(mockOfferId))
      .reply(200, mockReviews);

    await store.dispatch(fetchOfferDataAction(mockOfferId));

    const actions = store.getActions();
    const actionTypes = extractActionsTypes(actions);
    const fulfilledAction = actions[1] as ReturnType<
      typeof fetchOfferDataAction.fulfilled
    >;

    expect(actionTypes).toEqual([
      fetchOfferDataAction.pending.type,
      fetchOfferDataAction.fulfilled.type,
    ]);
    expect(fulfilledAction.payload).toEqual({
      offer: mockOffer,
      offersNearby: mockNearby,
      reviews: mockReviews,
    });
  });
});

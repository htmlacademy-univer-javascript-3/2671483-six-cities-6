import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import { vi } from 'vitest';
import { AppRoute } from '../../shared/config/route';
import * as offerSelectors from '../../widgets/offer-content/model/offer-details.selectors';
import * as offerThunks from '../../widgets/offer-content/model/offer-details.thunks';
import OfferPage from './offer-page';

const middlewares = [thunk];
const mockStore = configureMockStore<Record<string, unknown>, AnyAction>(
  middlewares
);

vi.mock('../../widgets/header', () => ({
  Header: () => <div data-testid="header" />,
}));

vi.mock('../../widgets/offer-content', () => ({
  OfferContent: () => <div data-testid="offer-content" />,
}));

vi.mock('../../widgets/offer-list-wrapper', () => ({
  OfferListWrapper: () => <div data-testid="offer-list-wrapper" />,
}));

vi.mock('../../shared/ui/loader', () => ({
  Loader: () => <div data-testid="loader" />,
}));

describe('Component: OfferPage', () => {
  const mockOfferId = '6af6f711-c28d-4ee3-a7d5-f27c36cfb209';

  it('should dispatch fetchOfferDataAction on mount', () => {
    const store = mockStore({});
    const fetchOfferSpy = vi.spyOn(offerThunks, 'fetchOfferDataAction');
    vi.spyOn(offerSelectors, 'selectIsOfferLoading').mockReturnValue(true);
    vi.spyOn(offerSelectors, 'selectOfferHasError').mockReturnValue(false);
    vi.spyOn(offerSelectors, 'selectOffersNearby').mockReturnValue([]);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/offer/${mockOfferId}`]}>
          <Routes>
            <Route path="/offer/:offerId" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(fetchOfferSpy).toHaveBeenCalledWith(mockOfferId);
  });

  it('should render loader when isLoading is true', () => {
    const store = mockStore({});
    vi.spyOn(offerSelectors, 'selectIsOfferLoading').mockReturnValue(true);
    vi.spyOn(offerSelectors, 'selectOfferHasError').mockReturnValue(false);
    vi.spyOn(offerSelectors, 'selectOffersNearby').mockReturnValue([]);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/offer/${mockOfferId}`]}>
          <Routes>
            <Route path="/offer/:offerId" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should redirect to NotFound when hasError is true', () => {
    const store = mockStore({});
    vi.spyOn(offerSelectors, 'selectIsOfferLoading').mockReturnValue(false);
    vi.spyOn(offerSelectors, 'selectOfferHasError').mockReturnValue(true);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/offer/${mockOfferId}`]}>
          <Routes>
            <Route path="/offer/:offerId" element={<OfferPage />} />
            <Route
              path={AppRoute.NotFound}
              element={<div>NotFound Page</div>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/NotFound Page/i)).toBeInTheDocument();
  });

  it('should render content when data is loaded successfully', () => {
    const store = mockStore({});
    vi.spyOn(offerSelectors, 'selectIsOfferLoading').mockReturnValue(false);
    vi.spyOn(offerSelectors, 'selectOfferHasError').mockReturnValue(false);
    vi.spyOn(offerSelectors, 'selectOffersNearby').mockReturnValue([]);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/offer/${mockOfferId}`]}>
          <Routes>
            <Route path="/offer/:offerId" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('offer-content')).toBeInTheDocument();
  });
});

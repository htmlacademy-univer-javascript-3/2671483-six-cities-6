import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationStatus } from '../../../shared/config/auth-status';
import { Offers } from '../../../shared/types/offer.type';
import OfferList from './offer-list';

const mockStore = configureMockStore();

const mockOffers = [
  {
    id: '1',
    title: 'Nice apartment',
    type: 'apartment',
    price: 100,
    isFavorite: false,
    rating: 4,
  },
  {
    id: '2',
    title: 'Big house',
    type: 'house',
    price: 200,
    isFavorite: true,
    rating: 5,
  },
] as unknown as Offers;

describe('Component: OfferList', () => {
  const store = mockStore({
    user: { authorizationStatus: AuthorizationStatus.NoAuth },
  });

  it('should render correct number of offer cards limited by "limit" prop', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferList offers={mockOffers} limit={1} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nice apartment')).toBeInTheDocument();
    expect(screen.queryByText('Big house')).not.toBeInTheDocument();
  });

  it('should call onListItemHover with offer id when mouse enters and with undefined when mouse leaves', () => {
    const onListItemHover = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferList offers={mockOffers} onListItemHover={onListItemHover} />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByText('Nice apartment').closest('article');

    if (card) {
      fireEvent.mouseEnter(card);
      expect(onListItemHover).toHaveBeenCalledWith('1');

      fireEvent.mouseLeave(card);
      expect(onListItemHover).toHaveBeenCalledWith(undefined);
    } else {
      throw new Error('Card element not found');
    }
  });
});

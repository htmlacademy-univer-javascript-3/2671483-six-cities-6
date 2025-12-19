import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOffersList } from '../../../entities/offer/model/offersListSlice';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import { getSortedOffers } from './sort-utils';
import { changeSortOption } from './sortOffersSlice';

import { SORT_OPTIONS } from '../../../shared/config/const';

export function useSortOffers() {
  const dispatch = useDispatch();
  const activeSort = useAppSelector((state) => state.sortOffers.sortOption);
  const offers = useAppSelector((state) => state.offerList.filteredList);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option: (typeof SORT_OPTIONS)[number]) => {
      if (option === activeSort) {
        setIsOpen(false);
        return;
      }

      dispatch(changeSortOption(option));
      dispatch(setOffersList(getSortedOffers(offers, option)));
      setIsOpen(false);
    },
    [dispatch, offers, activeSort]
  );
  return { isOpen, activeSort, handleToggle, handleSelect };
}

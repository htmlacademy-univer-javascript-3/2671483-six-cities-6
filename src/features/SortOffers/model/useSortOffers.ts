import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSortOption } from './sortOffersSlice';
import { setOffersList } from '../../../entities/offer/model/offersListSlice';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import { getSortedOffers } from './sort-utils';

import { SORT_OPTIONS } from '../../../shared/config/const';

export function useSortOffers() {
  const dispatch = useDispatch();
  const activeSort = useAppSelector((state) => state.sortOffers.sortOption);
  const offers = useAppSelector((state) => state.offerList.list);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: (typeof SORT_OPTIONS)[number]) => {
    dispatch(changeSortOption(option));
    dispatch(setOffersList(getSortedOffers(offers, option)));
    setIsOpen(false);
  };
  return {isOpen, activeSort, handleToggle, handleSelect};
}

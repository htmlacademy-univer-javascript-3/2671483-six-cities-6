import { useState } from 'react';
import { SORT_OPTIONS } from '../../../shared/config/const';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import { changeSortOption } from './sortOffersSlice';

export function useSortOffers() {
  const dispatch = useDispatch();
  const activeSort = useAppSelector((state) => state.sortOffers.sortOption);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: (typeof SORT_OPTIONS)[number]) => {
    dispatch(changeSortOption(option));
    setIsOpen(false);
  };
  return {isOpen, activeSort, handleToggle, handleSelect};
}

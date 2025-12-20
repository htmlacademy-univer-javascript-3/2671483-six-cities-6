import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import { changeSortOption } from './sortOffersSlice';

import { SORT_OPTIONS } from '../../../shared/config/const';

export function useSortOffers() {
  const dispatch = useDispatch();
  const activeSort = useAppSelector((state) => state.sortOffers.sortOption);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option: (typeof SORT_OPTIONS)[number]) => {
      if (option !== activeSort) {
        dispatch(changeSortOption(option));
      }

      setIsOpen(false);
    },
    [dispatch, activeSort]
  );
  return { isOpen, activeSort, handleToggle, handleSelect };
}

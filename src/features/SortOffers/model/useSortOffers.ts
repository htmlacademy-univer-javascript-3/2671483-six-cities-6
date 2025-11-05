import { useState } from 'react';
import { SORT_OPTIONS } from '../../../shared/config/const';

export function useSortOffers() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSort, setActiveSort] = useState<(typeof SORT_OPTIONS)[number]>(
    SORT_OPTIONS[0]
  );

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: (typeof SORT_OPTIONS)[number]) => {
    setActiveSort(option);
    setIsOpen(false);
  };
  return {isOpen, activeSort, handleToggle, handleSelect};
}

import { useSortOffers } from '../model/use-sort-offers';

import { memo } from 'react';
import { SORT_OPTIONS } from '../../../shared/config/const';
import { getArrowStyles } from '../lib/styles';

function SortOffers() {
  const { isOpen, activeSort, handleToggle, handleSelect } = useSortOffers();
  const arrowStyles = getArrowStyles(isOpen);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
      >
        {activeSort}
        <svg
          className="places__sorting-arrow"
          style={arrowStyles}
          width="7"
          height="4"
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {SORT_OPTIONS.map((option) => (
            <li
              key={option}
              className="places__option"
              tabIndex={0}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

const MemoizedSortOffers = memo(SortOffers);

export default MemoizedSortOffers;

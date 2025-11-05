import { useSortOffers } from '../model/useSortOffers';

import { SORT_OPTIONS } from '../../../shared/config/const';
import { CSSProperties } from 'react';

function SortOffers() {
  const { isOpen, activeSort, handleToggle, handleSelect } = useSortOffers();

  const arrowStyles = (): CSSProperties => {
    const initialTranslate = 'translateY(-50%)';

    const combinnedTransform = `${initialTranslate} rotateX(${
      isOpen ? '0deg' : '180deg'
    })`;

    return {
      transition: 'transform 0.3s ease',
      transform: combinnedTransform,
      transformOrigin: 'center',
    };
  };

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
          style={arrowStyles()}
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

export default SortOffers;

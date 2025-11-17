import { CSSProperties } from 'react';

export const getArrowStyles = (isOpen: boolean): CSSProperties => {
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

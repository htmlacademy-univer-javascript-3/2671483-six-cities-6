import { useState } from 'react';

export const useFavorites = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleFavorite = () => {
    setIsActive((prev) => !prev);
  };

  return {isActive, toggleFavorite};
};

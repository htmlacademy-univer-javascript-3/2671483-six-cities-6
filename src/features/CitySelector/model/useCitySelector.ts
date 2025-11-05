import { useState } from 'react';


export function useCitySelector() {
  const [activeCity, setActiveCity] = useState<typeof cities[number]>('Amsterdam');

  const cities = [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf',
  ] as const;

  const handleCityChange = (city: typeof cities[number]) => {
    setActiveCity(city);
  };

  return {cities, activeCity, handleCityChange};
}

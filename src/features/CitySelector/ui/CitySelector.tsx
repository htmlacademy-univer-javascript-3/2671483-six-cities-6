import { memo } from 'react';
import { useCitySelector } from '../model/useCitySelector';

function CitySelector(): JSX.Element {
  const { cities, selectedCity, onCityChange } = useCitySelector();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li
            key={city}
            className="locations__item"
            onClick={() => onCityChange(city)}
          >
            <span
              className={`locations__item-link tabs__item ${
                city === selectedCity ? 'tabs__item--active' : ''
              }`}
            >
              <span>{city}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const MemoizedCitySelector = memo(CitySelector);

export default MemoizedCitySelector;

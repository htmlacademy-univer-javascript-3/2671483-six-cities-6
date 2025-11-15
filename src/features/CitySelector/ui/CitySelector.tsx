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
            <a
              className={`locations__item-link tabs__item ${
                city === selectedCity ? 'tabs__item--active' : ''
              }`}
              href="#"
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitySelector;

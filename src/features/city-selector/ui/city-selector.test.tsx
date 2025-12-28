import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { useCitySelector } from '../model/use-city-selector';
import MemoizedCitySelector from './city-selector';

vi.mock('../model/use-city-selector');
const mockUseCitySelector = vi.mocked(useCitySelector);

describe('Component: CitySelector', () => {
  const mockCities = [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf',
  ] as const;

  it('should render list of cities correctly', () => {
    mockUseCitySelector.mockReturnValue({
      cities: mockCities,
      selectedCity: mockCities[0],
      onCityChange: vi.fn(),
    });

    render(<MemoizedCitySelector />);

    mockCities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should apply active class only to selected city', () => {
    const selectedCity = mockCities[1];
    mockUseCitySelector.mockReturnValue({
      cities: mockCities,
      selectedCity,
      onCityChange: vi.fn(),
    });

    render(<MemoizedCitySelector />);

    const activeCityLink = screen
      .getByText(selectedCity)
      .closest('.locations__item-link');
    const inactiveCityLink = screen
      .getByText(mockCities[0])
      .closest('.locations__item-link');

    expect(activeCityLink).toHaveClass('tabs__item--active');
    expect(inactiveCityLink).not.toHaveClass('tabs__item--active');
  });

  it('should call onCityChange when city is clicked', async () => {
    const onCityChange = vi.fn();
    mockUseCitySelector.mockReturnValue({
      cities: mockCities,
      selectedCity: mockCities[0],
      onCityChange,
    });

    render(<MemoizedCitySelector />);

    const cityItem = screen.getByText(mockCities[2]);
    await userEvent.click(cityItem);

    expect(onCityChange).toHaveBeenCalledWith(mockCities[2]);
  });
});

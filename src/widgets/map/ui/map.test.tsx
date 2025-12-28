import { render } from '@testing-library/react';
import { vi } from 'vitest';
import type { City, Offer } from '../../../shared/types/offer.type';
import useMap from '../model/use-map';
import Map from './map';

vi.mock('../model/use-map');
const mockUseMap = vi.mocked(useMap);

describe('Component: Map', () => {
  const mockCity: City = {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  };

  const mockPoints = [
    {
      id: '1',
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
      city: mockCity,
    },
  ] as Offer[];

  it('should render map container with correct classes', () => {
    mockUseMap.mockReturnValue(null);

    const { container } = render(
      <Map
        currentCity={mockCity}
        points={mockPoints}
        block="cities"
        selectedPoint={undefined}
      />
    );

    const mapElement = container.querySelector('.cities__map');

    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveClass('map');
  });

  it('should call useMap hook with provided props', () => {
    mockUseMap.mockReturnValue(null);
    const selectedPoint = '1';

    render(
      <Map
        currentCity={mockCity}
        points={mockPoints}
        block="offer"
        selectedPoint={selectedPoint}
      />
    );

    expect(mockUseMap).toHaveBeenCalledWith(
      mockPoints,
      expect.any(Object),
      selectedPoint,
      undefined,
      mockCity
    );
  });
});

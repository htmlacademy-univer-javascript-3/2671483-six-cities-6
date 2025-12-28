import { renderHook } from '@testing-library/react';
import leaflet from 'leaflet';
import { MutableRefObject } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MapPoint } from '../../../shared/types/map.type';
import { City } from '../../../shared/types/offer.type';
import useMap from './use-map';

vi.mock('leaflet', async () => {
  const actual = await vi.importActual<typeof import('leaflet')>('leaflet');

  const mockMapInstance = {
    setView: vi.fn(),
    removeLayer: vi.fn(),
    addLayer: vi.fn(),
    _container: { style: {} },
  };

  const mockTileLayer = {
    addTo: vi.fn().mockReturnThis(),
  };

  const mockLayerGroup = {
    addTo: vi.fn().mockReturnThis(),
  };

  return {
    ...actual,
    default: {
      ...actual,
      map: vi.fn().mockReturnValue(mockMapInstance),
      tileLayer: vi.fn().mockReturnValue(mockTileLayer),
      layerGroup: vi.fn().mockReturnValue(mockLayerGroup),
    },
    Marker: vi.fn().mockReturnValue({
      setIcon: vi.fn().mockReturnThis(),
      addTo: vi.fn().mockReturnThis(),
    }),
  };
});

describe('Hook: useMap', () => {
  const mockCity: City = {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
  };

  const mockPoints: MapPoint[] = [
    {
      id: '1',
      location: { latitude: 48.8, longitude: 2.3, zoom: 10 },
      city: mockCity,
    },
  ];

  let mapRef: MutableRefObject<HTMLDivElement | null>;

  beforeEach(() => {
    vi.clearAllMocks();
    mapRef = { current: document.createElement('div') };
  });

  it('should initialize map instance when ref and location are provided', () => {
    renderHook(() =>
      useMap(mockPoints, mapRef, undefined, undefined, mockCity)
    );

    expect(leaflet.map).toHaveBeenCalled();
    expect(leaflet.tileLayer).toHaveBeenCalled();
  });

  it('should call setView when city location changes', () => {
    const { rerender, result } = renderHook(
      ({ city }) => useMap(mockPoints, mapRef, undefined, undefined, city),
      { initialProps: { city: mockCity } }
    );

    const newCity: City = {
      name: 'Amsterdam',
      location: { latitude: 52.37, longitude: 4.89, zoom: 10 },
    };

    rerender({ city: newCity });

    const mapInstance = result.current;
    expect(mapInstance?.setView).toHaveBeenCalledWith(
      [newCity.location.latitude, newCity.location.longitude],
      newCity.location.zoom
    );
  });
});

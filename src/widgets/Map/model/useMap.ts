import leaflet, {
  LatLngExpression,
  layerGroup,
  LayerGroup as LLayerGroup,
  Map as LMap,
  Marker,
} from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import type { MapPoint } from '../../../shared/types/Map.type';
import type { City, Offer } from '../../../shared/types/Offer.type';

import {
  currentCustomIcon,
  defaultCustomIcon,
} from '../../../shared/lib/map-utils/map-icons';

const getCurrentCity = (points: MapPoint[]): City | undefined =>
  points[0]?.city;

function useMap(
  points: MapPoint[],
  mapRef: MutableRefObject<HTMLDivElement | null>,
  selectedPoint: Offer['id'] | undefined,
  activePoint?: MapPoint
): LMap | null {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  const currentCity = getCurrentCity(points);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && currentCity) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: currentCity.location.latitude,
          lng: currentCity.location.longitude,
        } as LatLngExpression,
        zoom: currentCity.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, currentCity]);

  useEffect(() => {
    if (map && currentCity) {
      const allPoints = activePoint ? [...points, activePoint] : points;

      map.setView(
        [currentCity.location.latitude, currentCity.location.longitude],
        currentCity.location.zoom
      );

      const markerLayer: LLayerGroup = layerGroup().addTo(map);

      allPoints.forEach((point: MapPoint) => {
        const marker: Marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        const isCurrentActive = activePoint && point.id === activePoint.id;
        const isHovered =
          selectedPoint !== undefined && point.id === selectedPoint;

        marker
          .setIcon(
            isCurrentActive || isHovered ? currentCustomIcon : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, activePoint, points, selectedPoint, currentCity]);

  return map;
}

export default useMap;

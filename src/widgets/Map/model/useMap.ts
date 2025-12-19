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

function useMap(
  points: MapPoint[],
  mapRef: MutableRefObject<HTMLDivElement | null>,
  selectedPoint: Offer['id'] | undefined,
  activePoint?: MapPoint,
  currentCity?: City
): LMap | null {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  const location = currentCity?.location;

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && location) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        } as LatLngExpression,
        zoom: location.zoom,
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
  }, [mapRef, location]);

  useEffect(() => {
    if (map && location) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [location, map]);

  useEffect(() => {
    if (map) {
      const markerLayer: LLayerGroup = layerGroup().addTo(map);
      const allPoints = activePoint ? [...points, activePoint] : points;

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
  }, [map, activePoint, points, selectedPoint]);

  return map;
}

export default useMap;

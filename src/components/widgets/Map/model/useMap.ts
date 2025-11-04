import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet, { layerGroup, Marker, Map as LMap, LayerGroup as LLayerGroup, LatLngExpression } from 'leaflet';

import type { City, Offer } from '../../../shared/types/Offer.type';

import { currentCustomIcon, defaultCustomIcon } from '../../../shared/lib/map-utils/map-icons';

function useMap(
  mapRef: MutableRefObject<HTMLDivElement | null>,
  city: City,
  points: Offer[],
  selectedPoint: Offer['id'] | undefined
): LMap | null {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        } as LatLngExpression,
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  useEffect(() => {
    if (map) {
      const markerLayer: LLayerGroup = layerGroup().addTo(map);
      points.forEach((point: Offer) => {
        const marker: Marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return map;
}

export default useMap;

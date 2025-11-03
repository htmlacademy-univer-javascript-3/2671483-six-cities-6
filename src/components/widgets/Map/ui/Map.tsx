import { useEffect, useRef } from 'react';
import useMap from '../model/useMap';
import { layerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import type { City, Offer } from '../../../shared/types/Offer.type';

import {
  currentCustomIcon,
  defaultCustomIcon,
} from '../../../shared/lib/map-utils/map-icons';

type MapProps = {
  city: City;
  points: Offer[];
  selectedPoint: Offer['id'] | undefined;
};

function Map(props: MapProps): JSX.Element {
  const { city, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
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

  return <div ref={mapRef} className="cities__map map"></div>;
}

export default Map;

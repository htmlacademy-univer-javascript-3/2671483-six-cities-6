import { useRef } from 'react';
import useMap from '../model/useMap';
import 'leaflet/dist/leaflet.css';

import type { City, Offer } from '../../../shared/types/Offer.type';

type MapProps = {
  city: City;
  points: Offer[];
  selectedPoint: Offer['id'] | undefined;
};

function Map(props: MapProps): JSX.Element {
  const { city, points, selectedPoint } = props;

  const mapRef = useRef(null);

  useMap(mapRef, city, points, selectedPoint);

  return <div ref={mapRef} className="cities__map map"></div>;
}

export default Map;

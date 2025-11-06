import { CSSProperties, useRef } from 'react';
import useMap from '../model/useMap';
import 'leaflet/dist/leaflet.css';

import type { City, Offer } from '../../../shared/types/Offer.type';

type MapProps = {
  block: 'cities' | 'offer';
  city: City;
  points: Offer[];
  selectedPoint: Offer['id'] | undefined;
};

const mapStyles: CSSProperties = {
  height: '100%',
  minHeight: '500px',
  width: '100%',
  maxWidth: '1144px',
  margin: '0 auto',
};

function Map(props: MapProps): JSX.Element {
  const { block, city, points, selectedPoint } = props;

  const mapRef = useRef(null);

  useMap(mapRef, city, points, selectedPoint);

  return <div ref={mapRef} className={`${block}__map map`} style={mapStyles} />;
}

export default Map;

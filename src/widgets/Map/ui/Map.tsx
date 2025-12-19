import 'leaflet/dist/leaflet.css';
import { CSSProperties, memo, useRef } from 'react';
import useMap from '../model/useMap';

import type { MapPoint } from '../../../shared/types/Map.type';
import type { City, Offer, Offers } from '../../../shared/types/Offer.type';

type MapProps = {
  currentCity?: City;
  activePoint?: MapPoint;
  points: Offers;
  block: 'cities' | 'offer';
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
  const { currentCity, activePoint, points, block, selectedPoint } = props;

  const mapRef = useRef(null);

  useMap(points, mapRef, selectedPoint, activePoint, currentCity);

  return <div ref={mapRef} className={`${block}__map map`} style={mapStyles} />;
}

const areEqual = (prevProps: MapProps, nextProps: MapProps) =>
  prevProps.selectedPoint === nextProps.selectedPoint &&
  prevProps.currentCity?.location.latitude ===
    nextProps.currentCity?.location.latitude &&
  prevProps.currentCity?.location.longitude ===
    nextProps.currentCity?.location.longitude &&
  prevProps.points.length === nextProps.points.length;

const MemoizedMap = memo(Map, areEqual);

export default MemoizedMap;

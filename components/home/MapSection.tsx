import Map from './Map';
import useMap from '@/hooks/useMap';
import { NaverMap } from '@/types/map';
import React from 'react';
import Markers from './Markers';

const MapSection = () => {
  const { initializeMap } = useMap();
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
  };

  return (
    <>
      <Map onLoad={onLoadMap}></Map>
      <Markers />
    </>
  );
};

export default MapSection;

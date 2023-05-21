import Map from './Map';
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import { NaverMap } from '@/types/map';
import React, { useMemo } from 'react';
import useCurrentStore from '@/hooks/useCurrentStore';
import Markers from './Markers';
import { useRouter } from 'next/router';
import { Coordinates } from '@/types/store';

const MapSection = () => {
  /** initial zoom, center from url query */
  const router = useRouter();
  const query = useMemo(
    () => new URLSearchParams(router.asPath.slice(1)), // slice로 / 문자 제거
    [router.asPath]
  );

  const initialZoom = useMemo(
    () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
    [query]
  );
  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get('lat') && query.get('lng')
        ? [Number(query.get('lat')), Number(query.get('lng'))]
        : INITIAL_CENTER,
    [query]
  );

  /** onLoadMap */
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
    naver.maps.Event.addListener(map, 'click', clearCurrentStore);
  };

  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialZoom={initialZoom}
        initialCenter={initialCenter}
      ></Map>
      <Markers />
    </>
  );
};

export default MapSection;

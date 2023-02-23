import { MAP_KEY } from '@/hooks/useMap';
import { STORE_KEY } from '@/hooks/useStores';
import { ImageIcon, NaverMap } from '@/types/map';
import { Store } from '@/types/store';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import Marker from './Marker';

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY);
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  const [selectedStore, setSelectedStore] = useState(false);

  if (!map || !stores) return null;

  const onClickMarker = () => {
    setSelectedStore((prev) => !prev);
    // selectedStore 가 변하지 않는 이유?
    // 1. onClickMarker 함수가 새로 생성되지 않는다.
    // 2. onClickMarker 함수가 생성되지 않는 이유는?
    //    - useCallback 을 사용하지 않았기 때문이다.
    console.log('selectedStore: ', selectedStore);
  };

  return (
    <>
      {stores.map((store) => {
        return (
          <Marker
            icon={generateStoreMarkerIcon(store.season, selectedStore)}
            map={map}
            coordinates={store.coordinates}
            key={store.nid}
            onClick={onClickMarker}
          />
        );
      })}
    </>
  );
};

export default Markers;

const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;
const NUMBER_OF_MARKER = 13;
const SCALE = 2 / 3;

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(
  markerIndex: number,
  isSelected: boolean
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: isSelected ? 'images/markers-selected.png' : 'images/markers.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0),
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT
    ),
  };
}

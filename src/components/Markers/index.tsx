import { Icon, PointExpression } from 'leaflet';
import { useState } from 'react';
import { Marker as MarkerComponent } from 'react-leaflet';
import { Marker } from '../../types';
import MarkerPopup from '../MarkerPopup';

type MarkersProps = {
  zoom: number;
  editMarkerId?: number;
  markers?: Marker[];
  setMarkerId?: React.Dispatch<React.SetStateAction<number>>;
};

const Markers: React.FC<MarkersProps> = ({
  zoom,
  markers,
  editMarkerId,
  setMarkerId,
}) => {
  const [hoverId, setHoverId] = useState(0);

  const getMarkerSize = (num = 1): PointExpression => {
    const getTuple = (n: number): PointExpression => [n, n * 2.25];

    if (zoom <= 8) return getTuple(15 * num);
    if (zoom <= 10) return getTuple(20 * num);
    if (zoom === 11) return getTuple(20 * num);
    if (zoom === 12) return getTuple(30 * num);
    return getTuple(40 * num);
  };

  const getYPos = (x: number) => {
    if (zoom === 16) return x + 0.0008;
    if (zoom === 15) return x + 0.0016;
    if (zoom === 14) return x + 0.0033;
    if (zoom === 13) return x + 0.0063;
    if (zoom === 12) return x + 0.009;
    if (zoom === 11) return x + 0.012;
    if (zoom === 10) return x + 0.024;
    if (zoom === 9) return x + 0.05;
    if (zoom === 8) return x + 0.06;
    if (zoom === 7) return x + 0.125;
    if (zoom === 6) return x + 0.25;
    return x;
  };

  const hoveredMarkerIcon = new Icon({
    iconUrl: require('../../files/images/marker.png'),
    iconSize: getMarkerSize(1.05),
    className: 'marker-hovered',
  });

  const markerIcon = new Icon({
    iconUrl: require('../../files/images/marker.png'),
    iconSize: getMarkerSize(),
  });

  return (
    <>
      {markers
        ?.filter?.((marker) => marker?.points?.length > 0)
        ?.map((marker) => {
          const isHovering = marker?.id === hoverId;

          if (marker?.id === editMarkerId)
            return (
              <MarkerComponent
                key={marker?.id}
                position={[getYPos(marker?.points?.[0]), marker?.points?.[1]]}
                icon={hoveredMarkerIcon}
              >
                <MarkerPopup />
              </MarkerComponent>
            );

          return (
            <MarkerComponent
              key={marker?.id}
              position={[getYPos(marker?.points?.[0]), marker?.points?.[1]]}
              icon={isHovering ? hoveredMarkerIcon : markerIcon}
              eventHandlers={{
                mouseover: () => setHoverId(marker?.id),
                mouseout: () => setHoverId(0),
                click: () => setMarkerId?.(0),
              }}
            >
              <MarkerPopup handleEdit={() => setMarkerId?.(marker?.id)} />
            </MarkerComponent>
          );
        })}
    </>
  );
};

export default Markers;

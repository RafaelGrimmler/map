import { Icon } from 'leaflet';
import { useState } from 'react';
import { Marker as MarkerComponent } from 'react-leaflet';
import { Marker } from '../../types';
import MarkerPopup from '../MarkerPopup';
import MarkerPositionAlert from '../../modules/edit/components/MarkerPositionAlert';

type MarkersProps = {
  editMarkerId?: number;
  markers?: Marker[];
  setMarkerId?: React.Dispatch<React.SetStateAction<number>>;
  handleMarkerPosition?: (lat: number, lng: number) => void;
};

const Markers: React.FC<MarkersProps> = ({
  markers,
  editMarkerId,
  setMarkerId,
  handleMarkerPosition,
}) => {
  const [reposition, setReposition] = useState<any>(undefined);
  const [hoverId, setHoverId] = useState(0);

  const hoveredMarkerIcon = new Icon({
    iconUrl: require('../../files/images/marker.png'),
    className: 'marker hovered',
  });

  const markerIcon = new Icon({
    iconUrl: require('../../files/images/marker.png'),
    className: 'marker',
  });

  return (
    <>
      {markers
        ?.filter?.((marker) => marker?.points?.length > 0)
        ?.map((marker) => {
          const isHovering = marker?.id === hoverId;

          console.log(marker?.points);

          if (marker?.id === editMarkerId)
            return (
              <MarkerComponent
                key={marker?.id}
                draggable
                position={marker?.points as any}
                eventHandlers={{
                  dragend: (e) => {
                    const { lat, lng } = e?.target?._latlng;
                    handleMarkerPosition?.(lat, lng);
                    setReposition(marker?.points);
                  },
                }}
                icon={hoveredMarkerIcon}
              >
                {!reposition && <MarkerPopup />}
              </MarkerComponent>
            );

          return (
            <MarkerComponent
              key={marker?.id}
              position={marker?.points as any}
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
      <MarkerPositionAlert
        open={!!reposition}
        onClose={() => {
          handleMarkerPosition?.(reposition?.[0], reposition?.[1]);
          setReposition(undefined);
        }}
        onConfirm={() => setReposition(undefined)}
      />
    </>
  );
};

export default Markers;

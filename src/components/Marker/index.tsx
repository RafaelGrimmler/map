/* eslint-disable @typescript-eslint/no-unused-vars */
import { Icon } from 'leaflet';
import { Circle, Marker as MarkerComponent } from 'react-leaflet';
import { Image, Marker as MarkerType } from '../../types';
import { useState } from 'react';
import MarkerPopup from '../MarkerPopup';
import MarkerPositionAlert from '../MarkerPositionAlert';

type MarkerProps = {
  marker: MarkerType;
  images?: Image[];
  isEditing?: boolean;
  setMarkerId?: React.Dispatch<React.SetStateAction<number>>;
  handleMarkerPosition?: (lat: number, lng: number) => void;
};

const Marker: React.FC<MarkerProps> = ({
  marker,
  images,
  isEditing,
  setMarkerId,
  handleMarkerPosition,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [oldPoints, setOldPoints] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const icon = new Icon({
    iconUrl: require('../../files/images/marker.png'),
    className: isHovering || isEditing ? 'marker hovered' : 'marker',
  });

  const markerImages = images?.filter((e) => marker?.imageIds?.includes(e?.id));

  return (
    <MarkerComponent
      position={marker?.points as any}
      icon={icon}
      draggable={isEditing}
      eventHandlers={{
        mouseover: () => !isOpen && setIsHovering(true),
        mouseout: () => setIsHovering(false),
        click: () => !isEditing && setMarkerId?.(0),
        popupclose: () => setIsOpen(false),
        popupopen: () => setIsOpen(true),
        dragend: (e) => {
          const { lat, lng } = e?.target?._latlng;
          handleMarkerPosition?.(lat, lng);
          setOldPoints(marker?.points);
        },
      }}
    >
      {oldPoints?.length === 0 && (
        <MarkerPopup
          hiddenEdit={!setMarkerId}
          handleEdit={isEditing ? undefined : () => setMarkerId?.(marker?.id)}
          images={markerImages}
        />
      )}
      {(isEditing || isHovering || isOpen) && (
        <Circle
          center={marker?.points as any}
          radius={marker?.radius}
          className="marker-circle"
        />
      )}
      <MarkerPositionAlert
        open={oldPoints?.length > 0}
        onClose={() => {
          handleMarkerPosition?.(oldPoints?.[0], oldPoints?.[1]);
          setOldPoints([]);
        }}
        onConfirm={() => setOldPoints([])}
      />
    </MarkerComponent>
  );
};

export default Marker;

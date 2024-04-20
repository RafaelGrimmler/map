/* eslint-disable @typescript-eslint/no-unused-vars */
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaCheck } from 'react-icons/fa';
import { Image, Marker, UserProfile } from '../../types';
import {
  StyledCheckBox,
  StyledContainer,
  StyledMarkerContainer,
} from './styles';
import { LatLng } from 'leaflet';
import { useState } from 'react';
import { Text } from '@chakra-ui/react';
import MarkerComponent from '../Marker';
import Polyline from '../Polyline';

type MapProps = {
  defaultZoom?: number;
  userProfile?: UserProfile;
  images?: Image[];
  editLineId?: number;
  editMarkerId?: number;
  markers?: Marker[];
  hiddenToggleMarker?: boolean;
  handleAppendLine?: (coord: LatLng) => void;
  handleAddPoint?: (coord: LatLng) => void;
  handleMarkerPosition?: (lat: number, lng: number) => void;
  setLineId?: React.Dispatch<React.SetStateAction<number>>;
  setMarkerId?: React.Dispatch<React.SetStateAction<number>>;
};

const Map: React.FC<MapProps> = ({
  defaultZoom = 11,
  userProfile,
  editLineId,
  hiddenToggleMarker,
  editMarkerId,
  markers,
  images,
  handleAppendLine,
  handleMarkerPosition,
  setLineId,
  handleAddPoint,
  setMarkerId,
}) => {
  const [showMarker, setShowMarker] = useState(true);
  const [zoom, setZoom] = useState(defaultZoom);

  const handleToggleMarker = () => {
    setMarkerId?.(0);
    setShowMarker(!showMarker);
  };

  const LocationFinderDummy = () => {
    useMapEvents({
      click: (e) => {
        if (editLineId) handleAppendLine?.(e?.latlng);
        if (editMarkerId) handleAddPoint?.(e?.latlng);
      },
      zoom: (e) => setZoom(e.target._zoom),
    });
    return null;
  };

  const selectedMarker = markers?.find((e) => e?.id === editMarkerId) as any;
  const showMarkers = showMarker && !editLineId;

  return (
    <StyledContainer zoom={zoom} editingline={!!editLineId}>
      <MapContainer
        center={[-31.721742613401577, -52.35671997070313]}
        zoom={zoom}
        zoomControl={false}
        minZoom={6}
        maxZoom={16}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_MAP_KEY}`}
        />
        <LocationFinderDummy />
        {userProfile?.lines?.map((line) => (
          <Polyline
            key={line?.id}
            line={line}
            isEditing={editLineId === line?.id}
            handleSelect={() => {
              const hasPoints = selectedMarker?.points?.length > 0;
              if (hasPoints) setMarkerId?.(0);
              if (!editLineId && hasPoints) setLineId?.(line?.id);
            }}
          />
        ))}
        {showMarkers &&
          markers
            ?.filter((marker) => marker?.points?.length > 0)
            ?.map((marker) => (
              <MarkerComponent
                key={marker?.id}
                images={images}
                marker={marker}
                isEditing={editMarkerId === marker?.id}
                setMarkerId={setMarkerId}
                handleMarkerPosition={handleMarkerPosition}
              />
            ))}
      </MapContainer>
      {!hiddenToggleMarker && (
        <StyledMarkerContainer onClick={handleToggleMarker}>
          <StyledCheckBox>
            {showMarker && <FaCheck className="checked" />}
          </StyledCheckBox>
          <Text>Exibir marcadores</Text>
        </StyledMarkerContainer>
      )}
    </StyledContainer>
  );
};

export default Map;

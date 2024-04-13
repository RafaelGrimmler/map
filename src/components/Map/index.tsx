import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaCheck } from 'react-icons/fa';
import { Marker, UserProfile } from '../../types';
import {
  StyledCheckBox,
  StyledContainer,
  StyledMarkerContainer,
} from './styles';
import { LatLng } from 'leaflet';
import Polylines from '../Polylines';
import { useState } from 'react';
import Markers from '../Markers';
import { Text } from '@chakra-ui/react';

type MapProps = {
  defaultZoom?: number;
  userProfile?: UserProfile;
  editLineId?: number;
  markers?: Marker[];
  editMarkerId?: number;
  showMarker?: boolean;
  handleToggleMarker?: (show?: boolean) => void;
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
  showMarker,
  editMarkerId,
  markers,
  handleToggleMarker,
  handleAppendLine,
  handleMarkerPosition,
  setLineId,
  handleAddPoint,
  setMarkerId,
}) => {
  const [zoom, setZoom] = useState(defaultZoom);

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
        {userProfile?.lines && (
          <Polylines
            lines={userProfile?.lines}
            editLineId={editLineId}
            marker={selectedMarker}
            setLineId={setLineId}
            setMarkerId={setMarkerId}
          />
        )}
        {showMarker && !editLineId && (
          <Markers
            editMarkerId={editMarkerId}
            markers={markers}
            setMarkerId={setMarkerId}
            handleMarkerPosition={handleMarkerPosition}
          />
        )}
      </MapContainer>
      {handleToggleMarker && (
        <StyledMarkerContainer onClick={() => handleToggleMarker(!showMarker)}>
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

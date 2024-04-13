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

  return (
    <StyledContainer>
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
            setLineId={setLineId}
            zoom={zoom}
          />
        )}
        {showMarker && <Markers zoom={zoom} markers={markers} />}
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

import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { UserProfile } from '../../types';
import { StyledContainer } from './styles';
import { LatLng } from 'leaflet';
import Polylines from '../Polylines';
import { useState } from 'react';

type MapProps = {
  defaultZoom?: number;
  userProfile?: UserProfile;
  editLineId?: number;
  handleAppendLine?: (coord: LatLng) => void;
  setLineId?: React.Dispatch<React.SetStateAction<number>>;
};

const Map: React.FC<MapProps> = ({
  defaultZoom = 11,
  userProfile,
  editLineId,
  handleAppendLine,
  setLineId,
}) => {
  const [zoom, setZoom] = useState(defaultZoom);

  const LocationFinderDummy = () => {
    useMapEvents({
      click: (e) => {
        if (editLineId) handleAppendLine?.(e?.latlng);
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
      </MapContainer>
    </StyledContainer>
  );
};

export default Map;

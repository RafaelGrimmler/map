import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { User } from '../../types';
import { StyledContainer } from './styles';
import { LatLng } from 'leaflet';
import { useState } from 'react';
import Polyline from '../Polyline';

type MapProps = {
  defaultZoom?: number;
  user?: User;
  editLineId?: number;
  handleAppendLine?: (coord: LatLng) => void;
  setLineId?: React.Dispatch<React.SetStateAction<number>>;
};

const Map: React.FC<MapProps> = ({
  defaultZoom = 11,
  user,
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
    return <></>;
  };

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
          url={`https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_MAP_KEY}`}
        />
        <LocationFinderDummy />
        {user?.lines?.map((line) => (
          <Polyline
            key={line?.id}
            line={line}
            isEditing={editLineId === line?.id}
            handleSelect={() => {
              if (!editLineId) setLineId?.(line?.id);
            }}
          />
        ))}
      </MapContainer>
    </StyledContainer>
  );
};

export default Map;

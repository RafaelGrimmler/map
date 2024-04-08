import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import './map.css';
import 'leaflet/dist/leaflet.css';
import { UserProfile } from '../../types';
// import Polylines from '../Polylines';
import { useTheme } from '@chakra-ui/react';

type MapProps = {
  zoom?: number;
  userProfile?: UserProfile;
};

const Map: React.FC<MapProps> = ({ zoom = 12, userProfile }) => {
  const { colors } = useTheme();

  return (
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
      {/* {userMapFile?.lines && <Polylines lines={userMapFile?.lines} />} */}
      {userProfile?.lines?.map((e) => (
        <Polyline
          key={e?.id}
          positions={e?.lines as any}
          pathOptions={{ color: colors.teal[400], weight: 1 }}
        />
      ))}
    </MapContainer>
  );
};

export default Map;

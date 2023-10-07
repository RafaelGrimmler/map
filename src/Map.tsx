import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@chakra-ui/react';
import './Map.css';

const Map: React.FC = () => {
  console.log();

  return (
    <Box width="100vw" height="100vh">
      <MapContainer center={[-31.776, -52.3594]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_MAP_KEY}`}
        />
      </MapContainer>
    </Box>
  );
};

export default Map;

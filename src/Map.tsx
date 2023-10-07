import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@chakra-ui/react';
import './Map.css'

const Map: React.FC = () => {
  return (
    <Box width="100vw" height="100vh">
      <MapContainer center={[-31.776, -52.3594]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </Box>
  );
};

export default Map;

import { MapContainer, Polyline, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@chakra-ui/react';
import './Map.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { Line, NavbarOptions } from './types';
import { useEditLine } from './helpers/useEditLine';

const Map: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [selected, setSelected] = useState<NavbarOptions>(undefined);

  const { editLine, handleAddCoordinate, ...lineProps } = useEditLine(
    setLines,
    setSelected,
  );

  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        if (editLine) handleAddCoordinate(e?.latlng);
      },
    });
    return null;
  };

  return (
    <Box width="100vw" height="100vh" overflow="hidden" position="relative">
      <MapContainer center={[-31.776, -52.3594]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_MAP_KEY}`}
        />
        <LocationFinderDummy />
        {editLine && (
          <Polyline
            positions={editLine?.lines as any}
            pathOptions={{ color: 'red', weight: 4 }}
          />
        )}
        {lines
          ?.filter((e) => e?.id !== editLine?.id)
          ?.map((e) => {
            return (
              <Polyline
                key={e?.id}
                positions={e?.lines as any}
                pathOptions={{ color: 'red', weight: 4 }}
              />
            );
          })}
      </MapContainer>
      <Navbar
        lineProps={{ editLine, ...lineProps }}
        selected={selected}
        handleSelection={setSelected}
      />
    </Box>
  );
};

export default Map;

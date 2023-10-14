import {
  MapContainer,
  Marker as MarkerComponent,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@chakra-ui/react';
import './Map.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { Line, Marker, NavbarOptions, User } from './types';
import { useLine } from './helpers/useLine';
import { LatLngExpression } from 'leaflet';
import { useZoom } from './helpers/useZoom';
import { useMarker } from './helpers/useMarker';
import DeleteAlert, { DeleteAlertProps } from './components/DeleteAlert';
import Polylines from './components/Polylines';
import { useFile } from './helpers/useFile';

const Map: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [lines, setLines] = useState<Line[]>([]);
  const [alert, setAlert] = useState<Partial<DeleteAlertProps>>({});
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selected, setSelected] = useState<NavbarOptions>(undefined);

  const lineProps = useLine({ lines, setLines, setSelected, setAlert });

  const { lineWeight, upperLineWeight, zoom, markerSize, handleChangeZoom } =
    useZoom();

  const { markerIcon, editMarker, ...markerProps } = useMarker({
    markerSize,
    setMarkers,
    setSelected,
  });

  const fileProps = useFile({ user, lines, setLines, setUser, setSelected });

  const LocationFinderDummy = () => {
    useMapEvents({
      click: (e) => {
        if (lineProps?.editLine) lineProps?.handleAddCoordinate(e?.latlng);
        if (editMarker && editMarker?.position?.length === 0)
          markerProps?.handleAddCoordinate(e?.latlng);
      },
      zoom: (e) => handleChangeZoom(e.target._zoom),
    });
    return null;
  };

  return (
    <Box width="100vw" height="100vh" overflow="hidden" position="relative">
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
        <Polylines
          lines={lines}
          lineProps={lineProps}
          lineWeight={lineWeight}
          upperLineWeight={upperLineWeight}
          selected={selected}
        />
        {editMarker && editMarker?.position?.length > 0 && (
          <MarkerComponent
            position={editMarker?.position as LatLngExpression}
            icon={markerIcon}
          >
            <Popup>dasd</Popup>
          </MarkerComponent>
        )}
        {markers
          ?.filter((e) => e?.id !== editMarker?.id)
          ?.map((e) => (
            <MarkerComponent
              key={e?.id}
              position={e?.position as LatLngExpression}
              icon={markerIcon}
            >
              <Popup>dasd</Popup>
            </MarkerComponent>
          ))}
      </MapContainer>
      <Navbar
        lineProps={lineProps}
        markerProps={{ editMarker, ...markerProps }}
        selected={selected}
        fileProps={fileProps}
        user={user}
        handleSelection={setSelected}
      />
      <DeleteAlert
        open={alert?.open || false}
        onClose={() => setAlert({})}
        onCancel={alert?.onCancel}
        onConfirm={() => alert?.onConfirm?.()}
      />
    </Box>
  );
};

export default Map;

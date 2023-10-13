import {
  Circle,
  MapContainer,
  Marker as MarkerComponent,
  Polyline,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, useTheme } from '@chakra-ui/react';
import './Map.css';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { Line, Marker, NavbarOptions } from './types';
import { useEditLine } from './helpers/useEditLine';
import { LatLngExpression } from 'leaflet';
import { useZoom } from './helpers/useZoom';
import { useMarker } from './helpers/useMarker';

const Map: React.FC = () => {
  const { colors } = useTheme();

  const [hoverLine, setHoverLine] = useState<Line>();
  const [lines, setLines] = useState<Line[]>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selected, setSelected] = useState<NavbarOptions>(undefined);

  const { editLine, handleEditExists, ...lineProps } = useEditLine(
    setLines,
    setSelected,
  );
  const { lineWeight, upperLineWeight, zoom, markerSize, handleChangeZoom } =
    useZoom();
  const { markerIcon, editMarker, ...markerProps } = useMarker({
    markerSize,
    setMarkers,
    setSelected,
  });

  useEffect(() => setHoverLine(undefined), [selected]);

  const LocationFinderDummy = () => {
    useMapEvents({
      click: (e) => {
        if (editLine) lineProps?.handleAddCoordinate(e?.latlng);
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
        {editLine && (
          <>
            <Polyline
              positions={editLine?.lines as any}
              pathOptions={{ color: colors.teal[300], weight: upperLineWeight }}
            />
            {editLine?.lines?.map((e, i) => (
              <Circle
                key={e?.[0] + i}
                center={e as LatLngExpression}
                radius={1}
                color={colors.teal[600]}
                weight={3}
              />
            ))}
          </>
        )}
        {lines
          ?.filter((e) => e?.id !== editLine?.id)
          ?.map((e) => {
            const hovering = hoverLine?.id === e?.id;

            return (
              <Polyline
                key={e?.id}
                positions={e?.lines as any}
                pathOptions={{
                  color: hovering ? colors.teal[300] : colors.teal[400],
                  weight: hovering ? upperLineWeight : lineWeight,
                }}
                eventHandlers={{
                  mouseover: () => setHoverLine(e),
                  mouseout: () => setHoverLine(undefined),
                  click: () => handleEditExists(e),
                }}
              />
            );
          })}
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
        lineProps={{ editLine, ...lineProps }}
        markerProps={{ editMarker, ...markerProps }}
        selected={selected}
        handleSelection={setSelected}
      />
    </Box>
  );
};

export default Map;

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Circle,
  MapContainer,
  TileLayer,
  useMapEvents,
  LayersControl,
  Tooltip,
  Polyline,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { useRef, useState } from 'react';
import { Map as LeafletMap, LatLngExpression } from 'leaflet';

import { StyledContainer } from './styles';
import municipios from '../../files/municipios.json';
import RoadsLayer from '../RoadsLayer';
import { User } from '../../types';
import { useRoutingReturn } from '../../modules/user/helpers/useRouting';

// type MapProps = {
//   user?: any;
//   defaultZoom?: number;
//   disableRoutes?: boolean;
//   waypoints?: LatLng[];
//   routes?: LatLng[][];
//   selectedRoute?: number;
//   selectedLine?: number;
//   handleFindLocation?: (coord: LatLng) => void;
//   handleSelectLine?: (id: number) => void;
// };

type MapProps = {
  user: User;
  routing: useRoutingReturn;
};

const CENTER = [-31.721742613401577, -52.35671997070313] as LatLngExpression;

const Map: React.FC<MapProps> = ({ user, routing }) => {
  const [zoom, setZoom] = useState(11);

  const mapRef = useRef<LeafletMap | null>(null);

  const LocationFinderDummy = () => {
    useMapEvents({
      click: (e) => routing?.addRoute(e.latlng),
      zoomend: () => {
        if (mapRef.current) setZoom(mapRef.current.getZoom());
      },
    });

    return <></>;
  };

  // const onSelectLine = (id: number) => {
  //   if (!disableRoutes && !selectedLine) {
  //     handleSelectLine?.(id);
  //   }
  // };

  return (
    <StyledContainer
      zoom={zoom}
      disableRoutes={false}
      selectingRoutes={routing?.selecting}
    >
      <MapContainer
        center={CENTER}
        zoom={zoom}
        zoomControl={false}
        minZoom={6}
        maxZoom={16}
        ref={mapRef}
        zoomSnap={1}
        zoomDelta={1}
        wheelPxPerZoomLevel={120}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Satélite (Esri)">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Ruas e Nomes (Esri)">
            <RoadsLayer />
          </LayersControl.Overlay>
        </LayersControl>

        <LocationFinderDummy />

        {/* {zoom >= 6 &&
            municipios.map((municipio) => (
              <Circle
                key={municipio.codigo_ibge}
                center={[municipio.latitude, municipio.longitude]}
                radius={1000}
                pathOptions={{
                  color: '#1D51D3',
                  fillColor: '#1D51D3',
                  fillOpacity: 0.7,
                  weight: 1,
                }}
              >
                <Tooltip direction="top" offset={[0, -5]} opacity={1}>
                  {municipio.nome}
                </Tooltip>
              </Circle>
            ))} */}

        {user?.map?.lines?.map((e) =>
          e?.id !== routing?.route?.id ? (
            <Polyline
              key={e?.id}
              positions={e?.points}
              eventHandlers={{ click: () => routing?.selectRoute(e) }}
              className="polyline"
            />
          ) : null,
        )}

        {routing?.enabled && routing?.route && (
          <Polyline
            key={routing?.route?.id}
            positions={routing?.route?.points}
            className="polyline selected"
          />
        )}

        {/* {othersLines?.map((e: any) => (
          <Polyline
            key={e?.id}
            positions={e?.lines}
            className="polyline"
            eventHandlers={{
              click: () => onSelectLine(e?.id),
            }}
          />
        ))}

        {currentLine && <Line line={currentLine} />}

        {waypoints?.map((waypoint, i) => (
          <Circle
            key={`waypoint-map-${i}`}
            center={[waypoint?.lat, waypoint?.lng]}
            radius={100}
            color="#2ecc9d"
            weight={3}
          />
        ))}

        {othersRoutes?.map((route, i) => (
          <Route key={`route-map-${i}`} route={route} />
        ))}

        {currentRoute && <Route route={currentRoute} selected />} */}
      </MapContainer>
    </StyledContainer>
  );
};

export default Map;

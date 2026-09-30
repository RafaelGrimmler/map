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
import {
  OperationAction,
  useRoutingReturn,
} from '../../modules/user/helpers/useRouting';

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
      click: (e) => routing?.handleClick(e.latlng),
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
      selectingRoutes={routing?.selectingRoute}
      disableRoutes={routing?.disableRoutes}
      deletingRoute={routing?.deletingRoute}
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

        {routing?.enabled && routing?.path?.length > 0 && (
          <Polyline
            key="Generated path"
            positions={routing?.path}
            className="polyline selected"
          />
        )}

        {routing?.enabled &&
          routing?.points?.map((p, i) => (
            <Circle
              key={`routing?.points-${i}`}
              center={[p?.lat, p?.lng]}
              radius={7}
              color="#ff5e00"
              weight={3}
            />
          ))}

        {routing?.enabled &&
          routing?.action === OperationAction.FREE &&
          !!routing?.lastRoutePoint && (
            <Circle
              key={`last-point-circle`}
              center={[
                routing?.lastRoutePoint?.[0],
                routing?.lastRoutePoint?.[1],
              ]}
              radius={7}
              color="#ff5e00"
              weight={3}
            />
          )}
      </MapContainer>
    </StyledContainer>
  );
};

export default Map;

import {
  Circle,
  MapContainer,
  Polyline,
  TileLayer,
  useMapEvents,
  LayersControl,
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { useState } from 'react';
import { LatLng } from 'leaflet';

import { StyledContainer } from './styles';
import Route from '../Route';
import Line from '../Line';
import municipios from '../../files/municipios.json';
import RoadsLayer from '../RoadsLayer';

type MapProps = {
  defaultZoom?: number;
  user?: any;
  disableRoutes?: boolean;
  waypoints?: LatLng[];
  routes?: LatLng[][];
  selectedRoute?: number;
  selectedLine?: number;
  handleFindLocation?: (coord: LatLng) => void;
  handleSelectLine?: (id: number) => void;
};

const Map: React.FC<MapProps> = ({
  defaultZoom = 11,
  user,
  disableRoutes,
  waypoints,
  routes,
  selectedRoute,
  selectedLine,
  handleFindLocation,
  handleSelectLine,
}) => {
  const [zoom, setZoom] = useState(defaultZoom);

  const currentRoute = routes?.find((_, i) => selectedRoute === i);

  const othersRoutes = routes?.filter((_, i) => selectedRoute !== i);

  const currentLine = user?.lines?.find((e: any) => selectedLine === e?.id);

  const othersLines = user?.lines?.filter(
    (e: any) => selectedLine !== e?.id,
  );

  const LocationFinderDummy = () => {
    useMapEvents({
      click: (e) => handleFindLocation?.(e?.latlng),
      zoom: (e) => {
        setZoom(e.target._zoom)
      },
    });

    return <></>;
  };

  const onSelectLine = (id: number) => {
    if (!disableRoutes && !selectedLine) {
      handleSelectLine?.(id);
    }
  };

  return (
    <StyledContainer
      zoom={zoom}
      disableRoutes={disableRoutes}
    >
      <MapContainer
        center={[-31.721742613401577, -52.35671997070313]}
        zoom={zoom}
        zoomControl={false}
        minZoom={6}
        maxZoom={16}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer
            checked
            name="Satélite (Esri)"
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay
            checked
            name="Ruas e Nomes (Esri)"
          >
            <RoadsLayer />
          </LayersControl.Overlay>
        </LayersControl>

        <LocationFinderDummy />

        {zoom >= 6 &&
          municipios.map((municipio) => (
            <Circle
              key={municipio.codigo_ibge}
              center={[
                municipio.latitude,
                municipio.longitude,
              ]}
              radius={1000}
              pathOptions={{
                color: '#1D51D3',
                fillColor: '#1D51D3',
                fillOpacity: 0.7,
                weight: 1,
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -5]}
                opacity={1}
              >
                {municipio.nome}
              </Tooltip>
            </Circle>
          ))}

        {othersLines?.map((e: any) => (
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
          <Route
            key={`route-map-${i}`}
            route={route}
          />
        ))}

        {currentRoute && (
          <Route
            route={currentRoute}
            selected
          />
        )}
      </MapContainer>
    </StyledContainer>
  );
};

export default Map;
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

import { User } from '../../types';
import { StyledContainer } from './styles';
import Route from '../Route';
import Line from '../Line';
import municipios from '../../files/municipios.json';

type MapProps = {
  defaultZoom?: number;
  user?: User;
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

  const currentLine = user?.lines?.find((e) => selectedLine === e?.id);

  const othersLines = user?.lines?.filter(
    (e) => selectedLine !== e?.id,
  );

  const LocationFinderDummy = () => {
    useMapEvents({
      click: (e) => handleFindLocation?.(e?.latlng),
      zoom: (e) => setZoom(e.target._zoom),
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
            <TileLayer
              url={`https://tiles.stadiamaps.com/tiles/stamen_terrain_lines/{z}/{x}/{y}.png?api_key=${process.env.REACT_APP_STADIA_API_KEY}`}
              minZoom={0}
              maxZoom={18}
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
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

        {othersLines?.map((e) => (
          <Polyline
            key={e?.id}
            positions={e?.lines as any}
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
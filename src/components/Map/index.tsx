import {
  Circle,
  MapContainer,
  Polyline,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { User } from '../../types';
import { StyledContainer } from './styles';
import { useState } from 'react';
import { LatLng } from 'leaflet';
import Route from '../Route';
import Line from '../Line';

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
  const othersLines = user?.lines?.filter((e) => selectedLine !== e?.id);

  const LocationFinderDummy = () => {
    useMapEvents({
      click: (e) => handleFindLocation?.(e?.latlng),
      zoom: (e) => setZoom(e.target._zoom),
    });
    return <></>;
  };

  const onSelectLine = (id: number) => {
    if (!disableRoutes && !selectedLine) handleSelectLine?.(id);
  };

  return (
    <StyledContainer zoom={zoom} disableRoutes={disableRoutes}>
      <MapContainer
        center={[-31.721742613401577, -52.35671997070313]}
        zoom={zoom}
        zoomControl={false}
        minZoom={6}
        maxZoom={16}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_MAP_KEY}`}
        />
        <LocationFinderDummy />
        {othersLines?.map((e) => (
          <Polyline
            key={e?.id}
            positions={e?.lines as any}
            className="polyline"
            eventHandlers={{ click: () => onSelectLine(e?.id) }}
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
        {currentRoute && <Route route={currentRoute} selected />}
      </MapContainer>
    </StyledContainer>
  );
};

export default Map;

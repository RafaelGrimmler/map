import { LatLng } from 'leaflet';
import { Polyline } from 'react-leaflet';

type RouteProps = { route: LatLng[]; selected?: boolean };

const Route: React.FC<RouteProps> = ({ route, selected }) => {
  return (
    <Polyline
      pathOptions={{ color: selected ? '#2ecc71' : '#8a8a8a' }}
      positions={route}
      className="route"
    />
  );
};

export default Route;

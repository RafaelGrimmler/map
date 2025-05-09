// import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
// import { useMap } from 'react-leaflet';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});

const Routing: React.FC = () => {
  //   const map = useMap();

  //   useEffect(() => {
  //     if (!map) return;

  //   const r = (L as any).Routing.control({
  //     waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
  //     routeWhileDragging: true,
  //   }).addTo(map);

  //   console.log(r);

  //   }, [map]);

  setTimeout(() => {
    const r = (L as any).Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
      routeWhileDragging: true,
    });

    r
      .route([L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)])
      ?.then(console.log);

    console.log(r);
  }, 1000);

  return null;
};

export default Routing;

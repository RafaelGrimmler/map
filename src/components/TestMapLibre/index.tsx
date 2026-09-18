import { useEffect, useRef } from 'react';
import { Map } from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';

const TestMapLibre: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) {
      return;
    }

    const map = new Map({
      container: mapContainer.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-52.3567, -31.7217],
      zoom: 10,
    });

    map.on('load', () => {
      console.log('MapLibre carregou corretamente');
    });

    map.on('error', (event) => {
      console.error('MapLibre error:', event);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '500px',
      }}
    />
  );
};

export default TestMapLibre;
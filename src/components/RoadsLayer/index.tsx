import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { maplibreGL } from '@maplibre/maplibre-gl-leaflet';
import { setWorkerUrl } from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';

setWorkerUrl('/maplibre/maplibre-gl-worker.mjs');

const RoadsLayer: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const roadsLayer = maplibreGL({
      style: '/road-style.json',
    });

    roadsLayer.addTo(map);

    roadsLayer.getContainer().style.zIndex = '1000';

    return () => {
      map.removeLayer(roadsLayer);
    };
  }, [map]);

  return null;
};

export default RoadsLayer;
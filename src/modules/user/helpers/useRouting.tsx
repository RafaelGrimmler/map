import { useState } from 'react';
import { Line } from '../../../types';
import { LatLng } from 'leaflet';

export type useRoutingReturn = {
  route: Line;
  selecting: boolean;
  enabled: boolean;
  selectRoute: (line: Line) => void;
  start: () => void;
  stop: () => void;
  addRoute: (latlng: LatLng) => void;
};

export const useRouting = () => {
  const [enabled, setEnabled] = useState(false);
  const [route, setRoute] = useState<Line>(null);

  const start = () => setEnabled(true);

  const stop = () => {
    setEnabled(false);
    setRoute(null);
  };

  const selectRoute = (line: Line) => {
    if (enabled) setRoute(line);
    console.log('select');
  };

  const addRoute = (latlng: LatLng) => {
    if (enabled) setRoute({ id: null, points: [[latlng?.lat, latlng?.lng]] });
    console.log('add', route);
  };

  const selecting = enabled && route === null;

  return { route, selecting, enabled, selectRoute, start, stop, addRoute };
};

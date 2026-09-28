import { useState, useRef } from 'react';

import { Line } from '../../../types';

import { LatLng } from 'leaflet';

export enum RouteOperation {
  CALCULATE = 'calculate',
  FREE_SELECTION = 'free_selection',
  DELETE = 'delete',
}

export type useRoutingReturn = {
  route: Line;
  selecting: boolean;
  enabled: boolean;
  operation: RouteOperation;
  points: LatLng[];
  path: Array<[number, number]>;
  start: () => void;
  reset: () => void;
  stop: () => void;
  selectRoute: (line: Line) => void;
  handleClick: (latlng: LatLng) => void;
  removePoint: (index: number) => void;
  updatePath: (newPath: Array<[number, number]>) => void;
  chooseOperation: (op: RouteOperation) => void;
};

export const useRouting = () => {
  const [enabled, setEnabled] = useState(false);
  const [route, setRoute] = useState<Line>(null);
  const [operation, setOperation] = useState<RouteOperation>();
  const [points, setPoints] = useState<LatLng[]>([]);
  const [path, setPath] = useState<Array<[number, number]>>([]);

  const copying = useRef(false);
  const selecting = enabled && route === null;

  const start = () => setEnabled(true);

  const reset = () => {
    setRoute(null);
    setOperation(null);
    setPoints([]);
    setPath([]);
    copying.current = false;
  };

  const stop = () => {
    setEnabled(false);
    reset();
  };

  const selectRoute = (line: Line) => {
    if (enabled) {
      copying.current = true;
      setRoute(line);
    }
  };

  const addRoute = (latlng: LatLng) => {
    if (!copying.current) {
      setRoute({ id: null, points: [[latlng?.lat, latlng?.lng]] });
      setPoints([latlng]);
    }
  };

  const addPoint = (latlng: LatLng) => {
    if (points?.length < 5) setPoints((prev) => [...prev, latlng]);
  };

  const removePoint = (index: number) => {
    setPoints((prev) => prev.filter((_, i) => i !== index));
    setPath([]);
  };

  const updatePath = (newPath: Array<[number, number]>) => {
    setPath(newPath);
  };

  const handleClick = (latlng: LatLng) => {
    if (!enabled) return;
    if (!route) addRoute(latlng);
    if (operation === RouteOperation.CALCULATE) addPoint(latlng);
  };

  const chooseOperation = (op: RouteOperation) => {
    setOperation(op);
  };

  return {
    route,
    selecting,
    enabled,
    operation,
    points,
    path,
    start,
    reset,
    stop,
    selectRoute,
    updatePath,
    handleClick,
    removePoint,
    chooseOperation,
  };
};

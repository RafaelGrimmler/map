/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import { Line } from '../../../types';

import { LatLng } from 'leaflet';
import { getTimestamp } from '../../../helpers/useDates';
import { UseUserContainerReturn } from '../../../helpers/useUserContainer';

export enum RouteState {
  LOADING = 'LOADING',
  READY = 'READY',
}

export enum RouteOperation {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

export enum OperationAction {
  CALCULATE = 'CALCULATE',
  FREE = 'FREE',
  DELETE = 'DELETE',
}

export type useRoutingReturn = {
  route: Line;
  disableRoutes: boolean;
  selectingRoute: boolean;
  deletingRoute: boolean;
  enabled: boolean;
  operation: RouteOperation;
  points: LatLng[];
  path: Array<[number, number]>;
  action: OperationAction;
  calculating: boolean;
  calculated: boolean;
  lastRoutePoint: [number, number];
  start: () => void;
  reset: () => void;
  stop: () => void;
  selectRoute: (line: Line) => void;
  handleClick: (latlng: LatLng) => void;
  removePoint: (index: number) => void;
  updatePath: (newPath: Array<[number, number]>) => void;
  chooseOperation: (op: RouteOperation) => void;
  chooseAction: (act: OperationAction) => void;
  changeRouteState: (state: RouteState) => void;
  validate: () => boolean;
  applyChanges: () => void;
  removeLastPointAtRoute: () => void;
};

type UseRoutingArgs = { userController: UseUserContainerReturn };

export const useRouting = ({
  userController,
}: UseRoutingArgs): useRoutingReturn => {
  const [enabled, setEnabled] = useState(false);
  const [route, setRoute] = useState<Line>(null);
  const [operation, setOperation] = useState<RouteOperation>();
  const [action, setAction] = useState<OperationAction>();
  const [points, setPoints] = useState<LatLng[]>([]);
  const [path, setPath] = useState<Array<[number, number]>>([]);
  const [routingState, setRoutingState] = useState<RouteState>();

  const selectingRoute = enabled && operation === RouteOperation.EDIT && !route;
  const deletingRoute = enabled && action === OperationAction.DELETE;
  const disableRoutes =
    enabled && (operation === RouteOperation.ADD || !!route);

  const calculating = enabled && routingState === RouteState.LOADING;
  const calculated = enabled && routingState === RouteState.READY;

  const lastRoutePoint = route?.points?.[route?.points?.length - 1];

  const start = () => setEnabled(true);

  const reset = () => {
    setRoute(null);
    setOperation(null);
    setAction(null);
    setPoints([]);
    setPath([]);
    setRoutingState(null);
  };

  const stop = () => {
    setEnabled(false);
    reset();
  };

  const selectRoute = (line: Line) => {
    if (selectingRoute) setRoute(line);
  };

  const addRoute = () => setRoute({ id: getTimestamp(), points: [] });

  const addPoint = (latlng: LatLng) => {
    if (points?.length < 5 && !calculating) {
      setPoints((prev) => [...prev, latlng]);
      setPath([]);
      setRoutingState(null);
    }
  };

  const addPointAtRoute = (latlng: LatLng) => {
    setRoute((prev) => {
      return {
        ...prev,
        points: [...(prev.points || []), [latlng.lat, latlng.lng]],
      };
    });
  };

  const removeLastPointAtRoute = () => {
    setRoute((prev) => ({ ...prev, points: prev.points?.slice(0, -1) }));
  };

  const removePoint = (index: number) => {
    if (!calculating) {
      setPoints((prev) => prev.filter((_, i) => i !== index));
      setPath([]);
      setRoutingState(null);
    }
  };

  const updatePath = (newPath: Array<[number, number]>) => {
    setPath(newPath);
    setRoutingState(RouteState.READY);
  };

  const handleClick = (latlng: LatLng) => {
    if (!enabled) return;
    if (action === OperationAction.CALCULATE) addPoint(latlng);
    if (action === OperationAction.FREE) addPointAtRoute(latlng);
  };

  const chooseOperation = (op: RouteOperation) => {
    setOperation(op);
    if (op === RouteOperation.ADD) addRoute();
  };

  const chooseAction = (act: OperationAction) => {
    setAction(act);
    if (
      operation === RouteOperation.EDIT &&
      act === OperationAction.CALCULATE
    ) {
      const latlng = { lat: lastRoutePoint?.[0], lng: lastRoutePoint?.[1] };
      setPoints([latlng as any]);
    }
  };

  const changeRouteState = (state: RouteState) => setRoutingState(state);

  const validate = () => {
    if (action === OperationAction.CALCULATE)
      return points?.length > 1 && calculated;
    if (action === OperationAction.FREE) return route?.points?.length > 1;
    if (action === OperationAction.DELETE) return !!route?.id;
    return false;
  };

  const applyChanges = () => {
    if (!validate()) return;

    const r: Line = { id: route?.id, points: [...route?.points, ...path] };

    if (action === OperationAction.DELETE) userController?.deleteRoute(r?.id);
    else userController?.upsertRoute(r);

    reset();
  };

  return {
    route,
    disableRoutes,
    selectingRoute,
    deletingRoute,
    enabled,
    operation,
    points,
    path,
    action,
    calculating,
    calculated,
    lastRoutePoint,
    start,
    reset,
    stop,
    selectRoute,
    updatePath,
    handleClick,
    removePoint,
    chooseOperation,
    chooseAction,
    changeRouteState,
    validate,
    applyChanges,
    removeLastPointAtRoute,
  };
};

import { useState } from 'react';
import { getUserById } from './getUserById';
import { Line, User } from '../types';
import { downloadJSON } from './download';

export type UseUserContainerReturn = {
  user: User;
  pendingDownload: boolean;
  reset: () => void;
  upsertRoute: (route: Line) => void;
  deleteRoute: (id: number) => void;
  uploadMap: (map: any) => void;
  downloadMap: () => void;
};

export const useUserContainer = (id: string): UseUserContainerReturn => {
  const [user, setUser] = useState(getUserById(id));
  const [pendingDownload, setPendingDownload] = useState(false);

  const reset = () => setUser(getUserById(id));

  const upsertRoute = (route: Line) => {
    const existingRouteIndex = user.map.lines.findIndex(
      (line) => line.id === route.id,
    );

    setPendingDownload(true);

    if (existingRouteIndex !== -1) {
      const updatedLines = [...user.map.lines];
      updatedLines[existingRouteIndex] = route;
      setUser({ ...user, map: { ...user.map, lines: updatedLines } });
    } else
      setUser({
        ...user,
        map: { ...user.map, lines: [...user.map.lines, route] },
      });
  };

  const deleteRoute = (id: number) => {
    const updatedLines = user.map.lines.filter((line) => line.id !== id);
    setUser({ ...user, map: { ...user.map, lines: updatedLines } });
    setPendingDownload(true);
  };

  const uploadMap = (map: any) => {
    setUser({ ...user, map });
    setPendingDownload(false);
  };

  const downloadMap = () => {
    downloadJSON('map.json', user.map);
    setPendingDownload(false);
  };

  return {
    user,
    pendingDownload,
    reset,
    upsertRoute,
    deleteRoute,
    uploadMap,
    downloadMap,
  };
};

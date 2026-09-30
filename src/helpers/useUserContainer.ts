import { useState } from 'react';
import { getUserById } from './getUserById';
import { Line, User } from '../types';

export type UseUserContainerReturn = {
  user: User;
  reset: () => void;
  upsertRoute: (route: Line) => void;
};

export const useUserContainer = (id: string): UseUserContainerReturn => {
  const [user, setUser] = useState(getUserById(id));

  const reset = () => setUser(getUserById(id));

  const upsertRoute = (route: Line) => {
    const existingRouteIndex = user.map.lines.findIndex(
      (line) => line.id === route.id,
    );

    if (existingRouteIndex !== -1) {
      const updatedLines = [...user.map.lines];
      updatedLines[existingRouteIndex] = route;
      setUser({ ...user, map: { lines: updatedLines } });
    } else setUser({ ...user, map: { lines: [...user.map.lines, route] } });
  };

  return { user, reset, upsertRoute };
};

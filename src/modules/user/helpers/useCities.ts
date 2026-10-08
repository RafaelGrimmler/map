import { useState } from 'react';
import { UseUserContainerReturn } from '../../../helpers/useUserContainer';

export type UseCitiesReturn = {
  enabled: boolean;
  start: () => void;
  stop: () => void;
};

type UseCitiesArgs = { userController: UseUserContainerReturn };

export const useCities = ({
  userController,
}: UseCitiesArgs): UseCitiesReturn => {
  const [enabled, setEnabled] = useState(false);

  const start = () => {
    setEnabled(true);
  };

  const stop = () => {
    setEnabled(false);
  };

  return { enabled, start, stop };
};

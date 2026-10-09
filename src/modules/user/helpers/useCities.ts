import { useState } from 'react';
import { UseUserContainerReturn } from '../../../helpers/useUserContainer';
import { City } from '../../../types';
import defaultCities from '../../../files/cities.json';

export type UseCitiesReturn = {
  enabled: boolean;
  settings: boolean;
  cities: City[];
  city: City;
  selectingCity: boolean;
  start: () => void;
  stop: () => void;
  startSettings: () => void;
  selectCity: (c: City) => void;
  saveSettings: () => void;
  editCity: (c: Partial<City>) => void;
};

type UseCitiesArgs = { userController: UseUserContainerReturn };

export const useCities = ({
  userController,
}: UseCitiesArgs): UseCitiesReturn => {
  const [enabled, setEnabled] = useState(false);
  const [settings, setSettings] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const [cities, setCities] = useState<City[]>(defaultCities);
  const [city, setCity] = useState<City>(null);

  const selectingCity = settings;

  const start = () => {
    setEnabled(true);
  };

  const stop = () => {
    setEnabled(false);
  };

  const startSettings = () => {
    setSettings(true);
  };

  const selectCity = (c: City) => {
    if (enabled && selectingCity) {
      if (city?.id)
        setCities(cities?.map((o) => (o?.id === city?.id ? city : o)));
      setCity(c);
    }
  };

  const saveSettings = () => {
    if (city?.id) {
      setCities(cities?.map((o) => (o?.id === city?.id ? city : o)));
      setCity(null);
    }
    setSettings(false);
  };

  const editCity = (c: Partial<City>) => setCity({ ...city, ...c });

  return {
    enabled,
    settings,
    cities,
    city,
    selectingCity,
    start,
    stop,
    startSettings,
    selectCity,
    saveSettings,
    editCity,
  };
};

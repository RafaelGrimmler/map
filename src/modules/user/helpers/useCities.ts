import { useState } from 'react';
import { UseUserContainerReturn } from '../../../helpers/useUserContainer';
import { City } from '../../../types';
import defaultCities from '../../../files/cities.json';
import { downloadJSON } from '../../../helpers/download';

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
    let citiesToSave = cities;
    if (city?.id) {
      citiesToSave = cities?.map((o) => (o?.id === city?.id ? city : o));
      setCities(citiesToSave);
      setCity(null);
    }
    downloadJSON('cities.json', citiesToSave);
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

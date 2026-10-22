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
  viewEnabled: boolean;
  viewAll: boolean;
  start: () => void;
  stop: () => void;
  startSettings: () => void;
  selectCity: (c: City) => void;
  saveSettings: () => void;
  editCity: (c: Partial<City>) => void;
  getRadius: (zoom: number) => number;
  toggleView: () => void;
  toggleViewAll: () => void;
};

type UseCitiesArgs = { userController: UseUserContainerReturn };

export const useCities = ({
  userController,
}: UseCitiesArgs): UseCitiesReturn => {
  const [enabled, setEnabled] = useState(false);
  const [settings, setSettings] = useState(false);
  const [cities, setCities] = useState<City[]>(
    defaultCities?.filter((c) => !c?.inactive),
  );
  const [city, setCity] = useState<City>(null);
  const [viewEnabled, setViewEnabled] = useState(true);
  const [viewAll, setViewAll] = useState(false);

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

  const toggleView = () => {
    setViewEnabled(!viewEnabled);
  };

  const toggleViewAll = () => {
    setViewAll(!viewAll);
  };

  const getRadius = (zoom: number) =>
    ({
      6: 7000,
      7: 3500,
      8: 1500,
      9: 800,
      10: 500,
      11: 200,
      12: 90,
      13: 70,
      14: 30,
      15: 18,
      16: 8,
    })[zoom] || 1000;

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
    downloadJSON(
      'cities.json',
      defaultCities?.map(
        (c) => citiesToSave?.find((o) => o?.id === c?.id) || c,
      ),
    );
    setSettings(false);
  };

  const editCity = (c: Partial<City>) => setCity({ ...city, ...c });

  return {
    enabled,
    settings,
    cities,
    city,
    selectingCity,
    viewEnabled,
    viewAll,
    start,
    stop,
    startSettings,
    selectCity,
    saveSettings,
    editCity,
    getRadius,
    toggleView,
    toggleViewAll,
  };
};

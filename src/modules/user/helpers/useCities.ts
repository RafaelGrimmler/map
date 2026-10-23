import { useState } from 'react';
import { UseUserContainerReturn } from '../../../helpers/useUserContainer';
import { City } from '../../../types';
import defaultCities from '../../../files/cities.json';
import { downloadJSON } from '../../../helpers/download';

type CityView = { enabled: boolean; all: boolean; names: boolean };

export type UseCitiesReturn = {
  enabled: boolean;
  settings: boolean;
  cities: City[];
  city: City;
  view: CityView;
  highlightedCity: City;
  start: () => void;
  stop: () => void;
  startSettings: () => void;
  selectCity: (c: City) => void;
  saveSettings: () => void;
  editCity: (c: Partial<City>) => void;
  getRadius: (zoom: number) => number;
  toggleView: (key: keyof CityView) => void;
  selectHighlightedCity: (c: City) => void;
  isVisited: (cityId: string) => boolean;
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
  const [view, setView] = useState<CityView>({
    enabled: true,
    all: false,
    names: true,
  });
  const [highlightedCity, setHighlightedCity] = useState<City>(null);

  const start = () => {
    setEnabled(true);
  };

  const stop = () => {
    setEnabled(false);
    setSettings(false);
    setHighlightedCity(null);
  };

  const startSettings = () => {
    setSettings(true);
  };

  const toggleView = (key: keyof CityView) => {
    setView({ ...view, [key]: !view[key] });
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
    if (!enabled) return;

    if (settings) {
      if (city?.id)
        setCities(cities?.map((o) => (o?.id === city?.id ? city : o)));
      setCity(c);
    } else {
      userController?.toggleCity(c?.id);
    }
  };

  const saveSettings = () => {
    let citiesToSave = cities;
    if (city?.id) {
      citiesToSave = cities?.map((o) => (o?.id === city?.id ? city : o));
      setCities(citiesToSave);
      setCity(null);
      downloadJSON(
        'cities.json',
        defaultCities?.map(
          (c) => citiesToSave?.find((o) => o?.id === c?.id) || c,
        ),
      );
    }
    setSettings(false);
  };

  const editCity = (c: Partial<City>) => setCity({ ...city, ...c });

  const selectHighlightedCity = (c: City) => {
    setHighlightedCity(c);
  };

  const isVisited = (cityId: string) =>
    userController?.user?.map?.cities?.[cityId];

  return {
    enabled,
    settings,
    cities,
    city,
    view,
    highlightedCity,
    start,
    stop,
    startSettings,
    selectCity,
    saveSettings,
    editCity,
    getRadius,
    toggleView,
    selectHighlightedCity,
    isVisited,
  };
};

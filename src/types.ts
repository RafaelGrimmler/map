export type Profile = { name: string; youtube: string; image: string };
export type Line = { id: number; points: Array<[number, number]> };
export type Vehicle = { name: string };

export type User = {
  profile: Profile;
  map: { lines: Line[]; cities: Record<string, boolean> };
  vehicles: Vehicle[];
};

export type City = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  inactive: boolean;
  state: { name: string; abbr: string };
  elevation: number;
};

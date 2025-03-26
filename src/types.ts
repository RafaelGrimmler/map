import { NavbarEnum } from './Enums';

export type Line = { id: number; lines: number[][] };

export type NavbarOptions = NavbarEnum | undefined;

export type User = {
  name: string;
  youtube: string;
  image: string;
  vehicle: string;
  userMap: string;
  lines: Line[];
};

export type MapFile = { userMap: string; lines: Line[] };

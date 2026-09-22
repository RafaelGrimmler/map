export type Profile = { name: string; youtube: string; image: string };
export type Line = { id: string; points: Array<[number, number]> };
export type Vehicle = { name: string }

export type User = { profile: Profile, map: { lines: Line[] }, vehicles: Vehicle[] }
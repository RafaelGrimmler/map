import { NavbarEnum, UserRoleEnum } from "./Enums";

export type Image = { id: number; src: string; createdAt: Date }
export type Line = { id: number; lines: number[][] };
export type Marker = {id: number; points: number[]; imageIds: string[] }

export type NavbarOptions = NavbarEnum | undefined

export type User = {
    id: string;
    name: string;
    vehicle: string;
    role: UserRoleEnum;
}

export type MapFile = { userMap: string; lines: Line[] }

export type UserProfile = {
    name: string;
    image: string;
    vehicle: string;
    userMap: string; 
    lines: Line[]
}
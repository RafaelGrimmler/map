import { MarkerTypeEnum, NavbarEnum, UserRoleEnum } from "./Enums";

export type Line = { id?: number; lines: number[][] };

export type Marker = {id: any; position: number[]; type?: MarkerTypeEnum}

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
    vehicle: string;
    userMap: string; 
    lines: Line[]
}
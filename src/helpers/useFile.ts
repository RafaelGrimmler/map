/* eslint-disable @typescript-eslint/no-var-requires */
import { Line, MapFile, NavbarOptions, User } from "../types"
import { getUsers } from "./getUsers";
import { getTodayFormat } from "./useDates";

export type UseFileReturn = {
    handleExportFile?: () => void;
    handleLoadMapByUser?: (user: User) => void;
    handleReadFile?: (file: any) => void;
}

type UseFile = {
    user?: User;
    lines: Line[];
    setLines: React.Dispatch<React.SetStateAction<Line[]>>;
    setSelected: React.Dispatch<React.SetStateAction<NavbarOptions>>;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const useFile = ({ user, lines, setLines, setSelected, setUser }: UseFile) => {
    const handleExportFile = () => {
        if(!user) return;
        const today = getTodayFormat();
        const fileName = `${user?.id}_${today}.json`;

        const data: MapFile = {
            userMap: user?.id,
            lines,
        };

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = fileName;
    
        link.click();
    }

    const handleReadFile = (file: any) => {
        if(!file) return;
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            const data: MapFile = JSON.parse(e.target?.result as any);
            const user = getUsers()?.find(e => e?.id === data?.userMap)
            console.log(getUsers(), data)
            if(user) {
                setUser(user);
                setLines(data?.lines);
                setSelected(undefined);
            }
        }
    }
 
    const handleLoadMapByUser = (user: User) => {
        const data: MapFile = require(`../files/maps/${user?.id}.json`);

        if(data) {
            setUser(user);
            setLines(data?.lines);
            setSelected(undefined);
        }
    }

    return {
        handleExportFile,
        handleLoadMapByUser,
        handleReadFile,
    }
}


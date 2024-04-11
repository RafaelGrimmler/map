import { LatLng } from "leaflet";
import { Line, UserProfile } from "../../../types";

type UseEditLineArgs = { 
    user: UserProfile; 
    lineId: number; 
    setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
    setLineId: React.Dispatch<React.SetStateAction<number>>;
}

const useEditLine = ({ 
    lineId, 
    user,
    setUser,
    setLineId,
}: UseEditLineArgs) => {
    const handleInsertLine = (line: Line) => {
        setUser({ ...user, lines: [...user?.lines, line] });
    };
    
    const handleAppendLine = (coord: LatLng) => {
        const { lat, lng } = coord || {};

        const lines = user?.lines?.map((line) => {
            if (line?.id === lineId) {
                return { id: lineId, lines: [...line?.lines, [lat, lng]] };
            }

            return line;
        });

        setUser({ ...user, lines });
    };

    const handleUndoLine = () => {
        const lines = user?.lines?.map(line => {
            if(line?.id === lineId) {
                return { 
                    id: lineId, 
                    lines: line?.lines?.filter((_, i) => 
                        i !== line?.lines?.length - 1) 
                }
            }

            return line;
        })

        setUser({ ...user, lines });
    }

    const handleDeleteLine = () => {
        const lines = user?.lines?.filter(line => line?.id !== lineId);
        setUser({ ...user, lines });
        setLineId(0);
    }

    return { 
        handleInsertLine, 
        handleAppendLine,
        handleUndoLine,
        handleDeleteLine,
    }
}

export default useEditLine;
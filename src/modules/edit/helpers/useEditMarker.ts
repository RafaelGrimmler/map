import { LatLng } from "leaflet";
import { Marker } from "../../../types";

type UseEditMarkerArgs = { 
    markerId: number;
    markers: Marker[];
    setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>
}

const useEditMarker = ({ markers, markerId, setMarkers }: UseEditMarkerArgs) => {
    const handleInsertMarker = (marker: Marker) => {
        setMarkers([...markers, marker]);
    };

    const handleAddPoint = (coord: LatLng) => {
        const { lat, lng } = coord || {};
        const marker = markers?.find(e => e?.id === markerId);
        
        if (marker?.points?.length === 0) {
            setMarkers(markers?.map(e => {
                if(e?.id === markerId) return { ...marker, points: [lat, lng] }
                return e
            }))
        }
    }

    return {  handleInsertMarker, handleAddPoint }
}

export default useEditMarker;
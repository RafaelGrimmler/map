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

    const handleMarkerPosition = (lat: number, lng: number) => {
        setMarkers(markers?.map(e => ({
            ...e, 
            points: e?.id === markerId ? [lat,lng] : e?.points
        })))
    }

    const handleMarkerImage = (ids: number[]) => {
        setMarkers(markers?.map(e => ({
            ...e, 
            imageIds: e?.id === markerId ? ids : e?.imageIds,
        })))
    } 

    const handleMarkerRadius = (radius: number) => {
        setMarkers(markers?.map(e => ({
            ...e, 
            radius: e?.id === markerId ? radius : e?.radius,
        })))
    }

    const handleDeleteMarker = () => {
        setMarkers(markers?.filter(e => e?.id !== markerId))
    }
 
    return {  
        handleInsertMarker, 
        handleAddPoint, 
        handleMarkerPosition,
        handleMarkerImage,
        handleMarkerRadius,
        handleDeleteMarker,
    }
}

export default useEditMarker;
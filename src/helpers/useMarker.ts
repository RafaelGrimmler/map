import { Icon, LatLng, PointExpression } from "leaflet";
import { useState } from "react";
import { Marker, NavbarOptions } from "../types";
import { getTimestamp } from "./getTimestamp";

export type UseMarkerReturn = {
    markerIcon: any;
    editMarker: Marker;
    handleAddMarker: () => void;
    handleSaveLine: () => void,
}

type UseMarker = { 
    markerSize: PointExpression;
    setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>
    setSelected: React.Dispatch<React.SetStateAction<NavbarOptions>>
}

export const useMarker = ({ markerSize, setMarkers, setSelected }: UseMarker) => {
    const [editMarker, setEditMarker] = useState<Marker>()

    const markerIcon = new Icon({
        iconUrl: require('../images/marker.png'),
        iconSize: markerSize,
      });

    const handleClose = () => {
        setEditMarker(undefined);
        setSelected(undefined);
    }

    const handleAddMarker = () => {
        const newMarker: Marker = { id: getTimestamp(), position: [] };
        setEditMarker(newMarker);
        setMarkers((markers) => [...markers, newMarker]);
    };

    const handleAddCoordinate = (latlng: LatLng) => {
        const { lat, lng } = latlng || {};
        setEditMarker({ id: editMarker?.id, position: [lat, lng] });
    }

    const handleSaveLine = () => {
        setMarkers((markers) => {
            return markers?.map((e) => {
                if (e?.id === editMarker?.id) return editMarker as Marker;
                return e;
            })
        });
        handleClose();
    };

    return {
        markerIcon,
        editMarker,
        handleAddMarker,
        handleAddCoordinate,
        handleSaveLine,
    }
};

//   import { useState } from 'react';
import { Icon, PointExpression } from "leaflet";

type UseMarker = { markerSize: PointExpression }

export const useMarker = ({ markerSize }: UseMarker) => {
    const markerIcon = new Icon({
        iconUrl: require('../images/marker.png'),
        iconSize: markerSize,
      });


    return {
        markerIcon,
    }
};

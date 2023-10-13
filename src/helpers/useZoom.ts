import { PointExpression } from 'leaflet';
import { useState } from 'react';

export const useZoom = () => {
    const [zoom, setZoom] = useState(12);

    const handleChangeZoom = (e: number) => setZoom(e)

    const getLineWeight = (constant = 1) => {
        if(zoom <= 7) return 0.7 * constant;
        else if(zoom <= 11) return 1 * constant;
        else if(zoom <= 13) return 2 * constant;
        else if(zoom <= 14) return 1.2 * constant;
        else if(zoom <= 16) return 0.8 * constant;
        return 1 * constant;
    }

    const getMarkerSize = (): PointExpression => {
        const getTuple = (n: number): PointExpression => ([n, n * 1.4])
        
        if(zoom <= 8) return getTuple(8)
        else if (zoom <= 10) return getTuple(10)
        else if (zoom <= 12) return getTuple(13)
        return getTuple(20)
    }

    return {
        zoom,
        lineWeight: getLineWeight(),
        upperLineWeight: getLineWeight(2),
        markerSize: getMarkerSize(),
        handleChangeZoom,
    }
};

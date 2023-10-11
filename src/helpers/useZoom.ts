import { PointExpression } from 'leaflet';
import { useState } from 'react';

export const useZoom = () => {
    const [zoom, setZoom] = useState(12);

    const handleChangeZoom = (e: number) => setZoom(e)

    const getLineWeight = (constant = 1) => {
        switch (zoom) {
            case 7: return 0.7 * constant;
            case 8: 
            case 9: 
            case 10: 
            case 11: return 1 * constant;
            case 12: 
            case 13: return 2 * constant;
            case 14: return 1.2 * constant;
            case 15:
            case 16: return 0.8 * constant;
            default: return 1 * constant;
        }
    }

    const getMarkerSize = (): PointExpression => {
        const getTuple = (n: number): PointExpression => ([n, n * 1.4])

        const interval1 = [0,1,2,3,4,5,6,7,8];
        const interval2 = [9,10];
        const interval3 = [11, 12];
        
        if(interval1.includes(zoom)) return getTuple(8)
        else if (interval2.includes(zoom)) return getTuple(10)
        else if (interval3.includes(zoom)) return getTuple(13)
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

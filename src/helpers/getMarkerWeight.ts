export const getMarkerWeight = (zoom: number, num = 1) => {
    const getTuple = (n: number) => [n, n * 2.25];

    if (zoom <= 8) return {
        width: getTuple(15 * num)?.[0] + 'px',
        height: getTuple(15 * num)?.[1] + 'px',
        mt: '-33px',
        ml: '-7px',
    };
    if (zoom <= 11) return {
        width: getTuple(21 * num)?.[0] + 'px',
        height: getTuple(21 * num)?.[1] + 'px',
        mt: '-44px',
        ml: '-10px',
    };
    if (zoom <= 13) return {
        width: getTuple(30 * num)?.[0] + 'px',
        height: getTuple(30 * num)?.[1] + 'px',
        mt: '-67px',
        ml: '-14px',
    };
    return {
        width: getTuple(40 * num)?.[0] + 'px',
        height: getTuple(40 * num)?.[1] + 'px',
        mt: '-85px',
        ml: '-18px',
    };
}

export const getPopupAdjust = (zoom: number) => {
    if (zoom <= 8) return { bottom: '17px', left: '-125px' };
    if (zoom <= 11) return { bottom: '25px', left: '-125px' };
    if (zoom <= 13) return { bottom: '43px', left: '-125px' };
    return { bottom: '57px', left: '-124px' }
}
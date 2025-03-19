export const getMarkerWeight = (zoom: number, num = 1) => {
  const getTuple = (n: number) => [n, n * 2.25];

  if (zoom <= 7)
    return {
      width: getTuple(5 * num)?.[0] + 'px',
      height: getTuple(5 * num)?.[1] + 'px',
      mt: '-11px',
      ml: '-2px',
    };
  if (zoom <= 8)
    return {
      width: getTuple(6 * num)?.[0] + 'px',
      height: getTuple(6 * num)?.[1] + 'px',
      mt: '-13px',
      ml: '-2px',
    };
  if (zoom <= 9)
    return {
      width: getTuple(6 * num)?.[0] + 'px',
      height: getTuple(6 * num)?.[1] + 'px',
      mt: '-13px',
      ml: '-3px',
    };
  if (zoom <= 10)
    return {
      width: getTuple(13 * num)?.[0] + 'px',
      height: getTuple(13 * num)?.[1] + 'px',
      mt: '-28px',
      ml: '-6px',
    };
  if (zoom <= 11)
    return {
      width: getTuple(18 * num)?.[0] + 'px',
      height: getTuple(18 * num)?.[1] + 'px',
      mt: '-39px',
      ml: '-9px',
    };
  if (zoom <= 13)
    return {
      width: getTuple(30 * num)?.[0] + 'px',
      height: getTuple(30 * num)?.[1] + 'px',
      mt: '-65px',
      ml: '-15px',
    };
  return {
    width: getTuple(40 * num)?.[0] + 'px',
    height: getTuple(40 * num)?.[1] + 'px',
    mt: '-88px',
    ml: '-19px',
  };
};

type PopupSize = 'lg' | 'sm' | 'xs';

export const getPopupAdjust = (zoom: number, size: PopupSize) => {
  if (size === 'lg') {
    if (zoom <= 8) return { bottom: '0px', left: '-250px' };
    if (zoom <= 9) return { bottom: '1px', left: '-251px' };
    if (zoom <= 10) return { bottom: '12px', left: '-250px' };
    if (zoom <= 11) return { bottom: '22.5px', left: '-252.5px' };
    if (zoom <= 13) return { bottom: '43px', left: '-250.5px' };
    return { bottom: '57px', left: '-250px' };
  }

  if (size === 'sm') {
    if (zoom <= 8) return { bottom: '0px', left: '-185px' };
    if (zoom <= 9) return { bottom: '1px', left: '-186px' };
    if (zoom <= 10) return { bottom: '12px', left: '-185px' };
    if (zoom <= 11) return { bottom: '22.5px', left: '-185px' };
    if (zoom <= 13) return { bottom: '43px', left: '-186px' };
    return { bottom: '61px', left: '-185px' };
  }
};

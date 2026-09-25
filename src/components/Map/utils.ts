export const getPolylineWeight = (zoom: number) => {
  switch (zoom) {
    case 6:
      return 1;
    case 7:
      return 1.5;
    case 8:
      return 1.5;
    case 9:
      return 1.5;
    case 10:
      return 1.5;
    case 11:
      return 2;
    case 12:
      return 2;
    case 13:
      return 2.8;
    case 14:
      return 3;
    case 15:
      return 3.5;
    case 16:
      return 4;
    default:
      return 1;
  }
};

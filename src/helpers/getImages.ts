import { Image } from '../types';

export const getImages = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const images: Image[] = require('../files/images/images.json')?.images;

  return images?.map((e) => ({ ...e, createdAt: new Date(e?.createdAt) }));
};

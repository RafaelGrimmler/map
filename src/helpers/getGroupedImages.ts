import { Image } from '../types';

type Group = { date: Date; images: Image[] };

export const getGroupedImages = (images: Image[]): Group[] => {
  const groups: Group[] = [];

  images?.forEach((image) => {
    const date = new Date(image?.createdAt);
    const hasGroup = groups?.some?.((group) => {
      const sameMonth = group?.date?.getMonth() === date?.getMonth();
      const sameYear = group?.date?.getFullYear() === date?.getFullYear();

      return sameMonth && sameYear;
    });
    if (!hasGroup) groups?.push({ date, images: [] });
  });

  return groups
    ?.map((group) => {
      const imgs = images?.filter((e) => {
        const sameMonth = group?.date?.getMonth() === e?.createdAt?.getMonth();
        const sameYear =
          group?.date?.getFullYear() === e?.createdAt?.getFullYear();

        return sameMonth && sameYear;
      });

      return { date: group?.date, images: imgs };
    })
    ?.sort((a, b) => b?.date?.getTime() - a?.date?.getTime());
};

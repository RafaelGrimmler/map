import { Image } from "../types";

type Group = { date: Date; images: Image[] }

export const getGroupedImages = (images: Image[]): Group[] => {
    const groups: Group[] = [];

    images?.forEach((image) => {
      const date = new Date(image?.createdAt);
      const hasGroup = groups?.some?.(
        (group) => group?.date?.getTime() === date?.getTime(),
      );
      if (!hasGroup) groups?.push({ date, images: [] });
    });

    return groups?.map(group => {
        const imgs = images?.filter((e) => 
            group?.date?.getTime() === e?.createdAt?.getTime())

        return { date: group?.date, images: imgs }
    })?.sort((a, b) => b?.date?.getTime() - a?.date?.getTime())
}
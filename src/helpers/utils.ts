export const clickElements = (selector: string) => {
  const elements = document?.querySelectorAll(selector);
  elements?.forEach((el: any) => el?.click());
};

export const stopPropagation = (e: any) => {
  e?.preventDefault();
  e?.stopPropagation();
};

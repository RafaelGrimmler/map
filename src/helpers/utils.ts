export const clickElements = (selector: string) => {
    const elements = document?.querySelectorAll(selector);
    elements?.forEach((el: any) => el?.click())
}
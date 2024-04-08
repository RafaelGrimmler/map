export const getTimestamp = () => {
    return new Date().getTime();
}

export const getTodayFormat = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}_${month}_${year}`;
}
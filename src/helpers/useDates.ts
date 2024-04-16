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

export const formatDate = (date: Date) => {
    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Maio',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];

    const month = months?.[date?.getMonth()];
    const day = date?.getDay();
    const year = date?.getFullYear();
    
    return `${day} de ${month} de ${year}`;
}
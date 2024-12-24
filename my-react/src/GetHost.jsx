const BASE_URL = 'http://127.0.0.1:8000'; // Локальный URL
const RADMIN_URL = 'http://26.13.2.150:8080'; // Удаленный URL

const getApiUrl = (isLocal) => {
    return isLocal ? BASE_URL : RADMIN_URL;
};

// Функция для получения полного URL с дополнительным путем
export const buildApiUrl = (isLocal, additionalPath) => {
    const apiUrl = getApiUrl(isLocal); // Получаем базовый URL
    return `${apiUrl}${additionalPath}`; // Формируем полный URL и возвращаем его
};
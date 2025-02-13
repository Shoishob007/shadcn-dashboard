export const getSafeValue = (value, fallback = "N/A") => {
    return value !== undefined && value !== null ? value : fallback;
};
export const formatRelativeDate = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day(s) ago`;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) return `${hours} hour(s) ago`;

    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} minute(s) ago`;
};

export function formatDate(timestamp) {
    const months = ['Jan.', 'Févr.', 'Mar.', 'Avr', 'Mai', 'Juin.', 'Jui.', 'Août.', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year} à ${hours}:${minutes}`;
}

export function formatDateWithoutH(timestamp) {
    const months = ['Jan.', 'Févr.', 'Mar.', 'Avr', 'Mai', 'Juin.', 'Jui.', 'Août.', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${day} ${month} ${year}`;
}
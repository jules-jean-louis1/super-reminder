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

export function notifPush(modalAppend,state, message) {
    modalAppend.innerHTML = `
    <dialog id="notifPush">
        <div class="flex items-center">
            <p class="text-center">${message}</p>
            <button class="ml-2" onclick="document.getElementById('notifPush').close()">X</button>
        </div>
    </dialog>`;
    if (state === 'success') {
        document.getElementById('notifPush').classList.add('bg-green-500');
    } else if (state === 'error') {
        document.getElementById('notifPush').classList.add('bg-red-500');
    } else if (state === 'warning') {
        document.getElementById('notifPush').classList.add('bg-yellow-500');
    } else if (state === 'info') {
        document.getElementById('notifPush').classList.add('bg-blue-500');
    }
}
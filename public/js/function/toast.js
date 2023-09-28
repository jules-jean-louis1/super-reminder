
let toastId = 0; // Variable pour générer des IDs uniques

export function createToast(modalAppend, state, message, timer) {
    const container = document.querySelector('#containerPushNotif');
    container.classList.add('pushNotfif');
    container.classList.remove('hidden');
    toastId++; // Incrémente l'ID à chaque appel de la fonction
    const toast = document.createElement('li');
    const uniqueId = `notifPush-${toastId}`; // Génère un ID unique
    toast.id = uniqueId; // Définit l'ID sur l'élément toast
    toast.classList.add('toasts-top-left', 'h-full', 'w-full')
    toast.innerHTML = `
    <div class="flex justify-center text-white items-center toast h-full w-full">
        <div class="flex items-center justify-between w-full mx-4">
            <div class="flex items-center gap-2">
                <div class="imageContainerToast"></div>
                <p class="text-center">${message}</p>
            </div>
            <div class="flex items-center border-l border-white">
                <button class="ml-2" id="close_${toastId}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18 6l-12 12"/>
                        <path d="M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>`;
    const imageContainerToast = toast.querySelector('.imageContainerToast'); // Utilisez querySelector pour cibler l'élément à l'intérieur du toast
    if (state !== '') {
        if (state === 'success') {
            imageContainerToast.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                    <path d="M9 12l2 2l4 -4"/>
                </svg>`;
            toast.classList.add('bg-green-500');
        } else if (state === 'error') {
            imageContainerToast.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"/>
                    <path d="M12 9v4"/>
                    <path d="M12 17h.01"/>
                </svg>`;
            toast.classList.add('bg-red-500');
        } else if (state === 'warning') {
            imageContainerToast.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
                    <path d="M12 9h.01"/>
                    <path d="M11 12h1v4h1"/>
                </svg>`;
            toast.classList.add('bg-yellow-500');
        } else if (state === 'info') {
            imageContainerToast.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
                    <path d="M12 9h.01"/>
                    <path d="M11 12h1v4h1"/>
                </svg>`;
            toast.classList.add('bg-blue-500');
        }
    }
    modalAppend.appendChild(toast);
    const closeBtn = toast.querySelector(`#close_${toastId}`);
    closeBtn.addEventListener('click', () => {
        // Attendre le délai avant de masquer et de supprimer le toast
        setTimeout(() => {
            container.classList.add("hidden");
            container.classList.remove("pushNotfif");
            setTimeout(() => {
                toast.remove();
            }, timer);
        }, timer);
    });
    setTimeout(() => {
        container.classList.add("hidden");
        container.classList.remove("pushNotfif");
        setTimeout(() => {
            toast.remove();
        }, timer);
    }, timer);
}


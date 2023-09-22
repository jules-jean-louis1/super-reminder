import {
    formatDate,
    formatDateWithoutH,
    notifPush
} from './function/function.js';

const btnAddReminder = document.getElementById('btnAddReminder');
const btnAddList = document.getElementById('btnAddList');
const ListeUserWarpper = document.getElementById('ListeUserWarpper');
const listeFormSelect = document.getElementById('listeFormSelect');
const containerReminderList = document.getElementById('containerReminderList');
const containerPushNotif = document.getElementById('containerPushNotif');

const url = window.location.href;
let segments = url.split('/');
let idIndex = segments.indexOf('reminder') + 1;
const id = segments[idIndex];

const containerModal = document.getElementById('containerModal');
async function addList() {
    containerModal.innerHTML = '';
    containerModal.innerHTML = `
        <dialog id="modalAddList" tabindex="-1" aria-labelledby="modalAddListLabel" aria-hidden="true" class="dialog_fixed">
            <div class="flex justify-between items-center">
                <h2 id="modalAddListLabel">Ajouter une liste</h2>
                <button type="button" id="btnCloseAddList">
                    <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                </button>
            </div>
            <p>Vous ne pouvez crée que 5 listes</p>
            <div>
                <h3>Listes existantes</h3>
                <div id="listsOfReminders"></div>
            </div>
            <div>
                <form action="" method="post" id="formAddList">
                    <input type="text" name="name" id="name" placeholder="Nom de la liste" class="p-2 border border-slate-500 rounded">
                    <p id="errorDisplay"></p>
                    <div>
                        <button type="submit" id="btnAddList" class="p-2 rounded text-white bg-[#ac1de4] w-full">Ajouter une Liste</button>
                    </div>
                </form>
            </div>
        </dialog>`;
    const modalAddList = document.getElementById('modalAddList');
    modalAddList.showModal();

    const btnCloseAddReminder = document.getElementById('btnCloseAddList');
    btnCloseAddReminder.addEventListener('click', () => {
        modalAddList.close();
    });
    const formAddList = document.getElementById('formAddList');
    const errorDisplay = document.getElementById('errorDisplay');
    formAddList.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/super-reminder/reminder/${id}/addList`, {
                method: 'POST',
                body: new FormData(formAddList)
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                modalAddList.close();
                manageReminder();
                setTimeout(() => {
                    notifPush(containerPushNotif, 'success', data.success);
                }, 1000);
            }
            if (data.error) {
                errorDisplay.innerHTML = '';
                errorDisplay.innerHTML = data.error;
            }
        } catch (error) {

        }
    });
    const listsOfReminders = document.getElementById('listsOfReminders');
    getListOfUsers(id).then(data => {
        for (let i = 0; i < data.length; i++) {
            listsOfReminders.innerHTML += `
                <div class="p-2 w-full bg-[#e0e4ec] border border-[#52586633] my-1 rounded-[10px]">
                    <p class="flex items-center">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M9 6l11 0"/>
                              <path d="M9 12l11 0"/>
                              <path d="M9 18l11 0"/>
                              <path d="M5 6l0 .01"/>
                              <path d="M5 12l0 .01"/>
                              <path d="M5 18l0 .01"/>
                            </svg>
                        </span>
                        <span>${data[i].name}</span>
                    </p>
                </div>
            `;
        }
    });
}
async function addReminder() {
    containerModal.innerHTML = '';
    containerModal.innerHTML = `
        <dialog id="modalAddReminder" tabindex="-1" aria-labelledby="modalAddReminderLabel" aria-hidden="true" class="dialog_fixed p-2 border">
            <div class="flex justify-between">
                <h2 id="modalAddReminderLabel">Ajouter un rappel</h2>
                <button type="button" id="btnCloseAddReminder">X</button>
            </div>
            <div>
                <form action="" method="post" id="formAddReminder">
                    <div>
                        <label for="name">Titre</label>
                        <input type="text" name="name" id="name">
                        <p id="errorName"></p>
                    </div>
                    <div>
                        <label for="description">Description</label>
                        <textarea name="description" id="description" cols="30" rows="10"></textarea>
                        <p id="errorDescription"></p>
                    </div>
                    <div>
                        <button type="button" id="btnAddDate">Ajouter une date</button>
                        <button type="button" id="btnAddPriority">Ajouter une priorité</button>
                        <div id="addDate"></div>
                        <div id="addPriority"></div>
                    </div>
                    <div>
                        <label for="status">Status</label>
                        <select name="status" id="status">
                            <option value="0">Pas commencer</option>
                            <option value="1">En cours</option>
                            <option value="2">Terminé</option>
                        </select>
                    </div>
                    <div id="listsOfReminders"></div>
                    <p id="errorDisplay"></p>
                    <div>
                        <button type="submit" id="btnAddReminder">Ajouter un rappel</button>
                    </div>
                </form>
            </div>
        </dialog>
        `;
    const modalAddReminder = document.getElementById('modalAddReminder');
    modalAddReminder.showModal();

    const btnAddDate = document.getElementById('btnAddDate');
    const addDate = document.getElementById('addDate');
    btnAddDate.addEventListener('click', () => {
        const hasHours = addDate.querySelector('#btnAddHours');

        if (!hasHours) {
            addDate.innerHTML = `
        <h3>Heures</h3>
        <div>
            <label for="start">Début</label>
            <input type="date" name="start" id="start">
        </div>
        <div>
            <label for="end">Fin</label>                    
            <input type="date" name="end" id="end">
        </div>
        <p id="errorDate"></p>
        <button type="button" id="btnAddHours">Ajouter des heures</button>
        `;
        } else {
            addDate.innerHTML = '';
        }
        const btnAddHours = document.getElementById('btnAddHours');
        if (btnAddHours) {
            btnAddHours.addEventListener('click', () => {
                const inputStart = document.getElementById('start');
                const inputEnd = document.getElementById('end');
                if (btnAddHours.textContent === 'Ajouter des heures') {
                    inputStart.setAttribute('type', 'datetime-local');
                    inputEnd.setAttribute('type', 'datetime-local');
                    btnAddHours.textContent = 'Supprimer les heures';
                } else {
                    inputStart.setAttribute('type', 'date');
                    inputEnd.setAttribute('type', 'date');
                    btnAddHours.textContent = 'Ajouter des heures';
                }
            });
        }
    });
    const btnAddPriority = document.getElementById('btnAddPriority');
    const addPriority = document.getElementById('addPriority');
    btnAddPriority.addEventListener('click', () => {
        const hasPriority = addPriority.querySelector('#priority');
        if (!hasPriority) {
            addPriority.innerHTML = `
            <h3>Priorité</h3>
            <select name="priority" id="priority">
                <option value="0">Basse</option>
                <option value="1">Moyenne</option>
                <option value="2">Haute</option>
            </select>
            `;
        } else {
            addPriority.innerHTML = '';
        }
    });
    const listsOfReminders = document.getElementById('listsOfReminders');
    getListOfUsers(id).then(data => {
        for (let i = 0; i < data.length; i++) {
            listsOfReminders.innerHTML += `
                <div>
                    <input type="radio" value="${data[i].id}" name="list">
                    <label for="${data[i].name}">${data[i].name}</label>
                </div>
            `;
        }
    });

    const errorDisplay = document.getElementById('errorDisplay');
    const errorName = document.getElementById('errorName');
    const errorDescription = document.getElementById('errorDescription');
    const errorDate = document.getElementById('errorDate');

    const formAddReminder = document.getElementById('formAddReminder');
    formAddReminder.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/super-reminder/reminder/${id}/addTask`, {
                method: 'POST',
                body: new FormData(formAddReminder)
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                errorDisplay.innerHTML = '';
                errorDisplay.innerHTML = data.success;
                setTimeout(() => {
                    modalAddReminder.close();
                }, 1000);
            }
            if (data.error) {
                errorDisplay.innerHTML = '';
                errorDisplay.innerHTML = data.error;
            }
            if (data.name) {
                errorName.innerHTML = '';
                errorName.innerHTML = data.name;
            }
            if (data.description) {
                errorDescription.innerHTML = '';
                errorDescription.innerHTML = data.description;
            }
            if (data.start) {
                errorDate.innerHTML = '';
                errorDate.innerHTML = data.start;
            }
            if (data.end) {
                errorDate.innerHTML = '';
                errorDate.innerHTML = data.end;
            }
            if (data.date) {
                errorDate.innerHTML = '';
                errorDate.innerHTML = data.date;
            }
            if (data.error) {
                errorDisplay.innerHTML = '';
                errorDisplay.innerHTML = data.error;
            }
        } catch (error) {
            console.log(error);
        }
    });

    const btnCloseAddReminder = document.getElementById('btnCloseAddReminder');
    btnCloseAddReminder.addEventListener('click', () => {
        const modalAddReminder = document.getElementById('modalAddReminder');
        modalAddReminder.close();
    });
}
async function getListOfUsers(id) {
    const response = await fetch(`/super-reminder/reminder/${id}/getUserList`);
    const data = await response.json();
    return data;
}

btnAddReminder.addEventListener('click', addReminder);
btnAddList.addEventListener('click', addList);

async function manageReminder(){
    ListeUserWarpper.innerHTML = '';
    getListOfUsers(id).then(list => {
        for (let i = 0; i < list.length; i++) {
            ListeUserWarpper.innerHTML += `
                <div class="listUser border border-[#848484] rounded p-1">
                    <h3 class="flex items-center">
                        <span class="listUserSpan">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M9 6l11 0"/>
                                <path d="M9 12l11 0"/>
                                <path d="M9 18l11 0"/>
                                <path d="M5 6l0 .01"/>
                                <path d="M5 12l0 .01"/>
                                <path d="M5 18l0 .01"/>
                            </svg>
                        </span>
                        <span>${list[i].name}</span>
                    </h3>
                    <div class="reminderActionBtn flex items-center space-x-2">
                        <button class="deleteList flex items-center text-red-500" data-id="${list[i].id}">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                <path d="M10 10l4 4m0 -4l-4 4"/>
                            </svg>
                        </span>
                        <span>Suppr.</span>
                        </button>
                        <button class="updateList flex items-center text-green-500" data-id="${list[i].id}">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                                  <path d="M16 5l3 3"/>
                                </svg>
                            </span>
                            <span>Modif.</span>
                        </button>
                    </div>
                </div>
            `;
        }
        const deleteList = document.querySelectorAll('.deleteList');
        const updateList = document.querySelectorAll('.updateList');
        deleteList.forEach(btn => {
            btn.addEventListener('click', async () => {
                const idList = btn.getAttribute('data-id');
                const response = await fetch(`/super-reminder/reminder/${idList}/deleteList`);
                const data = await response.json();
                console.log(data);
                if(data.success){
                    manageReminder();
                }
            });
        });
        updateList.forEach(btn => {
            btn.addEventListener('click', () => {
                const idList = btn.getAttribute('data-id');
                containerModal.innerHTML = '';
                containerModal.innerHTML = `
                <dialog id="modalEditList" tabindex="-1" aria-labelledby="modalEditListLabel" aria-hidden="true" class="dialog_fixed">
                    <h2 id="modalEditListLabel">Modifier une liste</h2>
                    <button type="button" id="btnCloseEditList">X</button>
                    <form action="" method="post" id="formEditList">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name">
                        <button type="submit">Modifier</button>
                        <div id="errorDisplay"></div>
                    </form>
                </dialog>
                `;
                const modalEditList = document.getElementById('modalEditList');
                modalEditList.showModal();
                const btnCloseEditList = document.getElementById('btnCloseEditList');
                btnCloseEditList.addEventListener('click', () => {
                    modalEditList.close();
                });
                const errorDisplay = document.getElementById('errorDisplay');
                const formEditList = document.getElementById('formEditList');
                formEditList.addEventListener('submit', async (ev) => {
                    ev.preventDefault();
                    const response = await fetch(`/super-reminder/reminder/edit/${idList}`,{
                        method: 'POST',
                        body: new FormData(formEditList)
                    });
                    const data = await response.json();
                    if (data.success) {
                        modalEditList.close();
                        manageReminder();
                    }
                    if (data.error) {
                        errorDisplay.innerHTML = '';
                        errorDisplay.innerHTML = data.error;
                    }
                    console.log(data);
                });
            })
        })
    });
}
manageReminder();

getListOfUsers(id).then(data => {
    for (let i = 0; i < data.length; i++) {
        listeFormSelect.innerHTML += `
            <option value="${data[i].id}">${data[i].name}</option>
        `;
    }
});

async function dislpayReminder() {
    let response = await fetch(`/super-reminder/reminder/${id}/searchTask`, {
        method: 'POST',
        body: new FormData(listSortForm)
    });
    let data = await response.json();
    console.log(data);
    containerReminderList.innerHTML = '';
    if (data === false) {
        containerReminderList.innerHTML = `
            <p>Aucun résultat</p>
        `;
    } else {
        for (let i = 0; i < data.length; i++) {
            containerReminderList.innerHTML += `
                <div class="reminder p-2 m-3 w-1/3 rounded-[10px] bg-white my-2 border-2" id="rappel_${data[i].task_id}">
                    <h3 class="font-bold text-xl">${data[i].task_name}</h3>
                    <div id="descriptionReminder"></div>
                    <div id="created_at" class="flex items-center">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor"/>
                            </svg>
                        </span>
                        <p class="text-sm">${formatDate(data[i].task_created_at)}</p>
                    </div>
                    <div id="dateStart"></div>
                    <div id="dateEnd"></div>
                    <div id="priority"></div>
                    <div class="flex justify-around">
                        <div id="statusContainer">
                            <form action="" method="post" id="changeStatusOnFly_${data[i].task_id}">
                                <input type="hidden" name="id" value="${data[i].task_id}">
                                <select name="status" id="status">
                                </select>
                            </form>
                        </div>
                        <div id="list">
                            <p>${data[i].list_name}</p>
                        </div>
                    </div>
                    <div class="reminderActionBtn flex justify-around">
                        <button id="deleteReminder_${data[i].task_id}" data-id="${data[i].task_id}" class="text-red-500">
                            <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" stroke-width="0" fill="currentColor"/>
                            </svg>
                            </span>
                        </button>
                        <button id="updateReminder_${data[i].task_id}" data-id="${data[i].task_id}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                              <path d="M16 5l3 3"/>
                            </svg>
                        </button>
                        <button id="addUserToReminder_${data[i].task_id}" data-id="${data[i].task_id}" class="flex gap-1 items-center font-semibold text-[#0C79FE]">
                            <span>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 24.4922C13.6328 24.4922 15.168 24.1797 16.6055 23.5547C18.0508 22.9297 19.3242 22.0664 20.4258 20.9648C21.5273 19.8633 22.3906 18.5938 23.0156 17.1562C23.6406 15.7109 23.9531 14.1719 23.9531 12.5391C23.9531 10.9062 23.6406 9.37109 23.0156 7.93359C22.3906 6.48828 21.5273 5.21484 20.4258 4.11328C19.3242 3.01172 18.0508 2.14844 16.6055 1.52344C15.1602 0.898438 13.6211 0.585938 11.9883 0.585938C10.3555 0.585938 8.81641 0.898438 7.37109 1.52344C5.93359 2.14844 4.66406 3.01172 3.5625 4.11328C2.46875 5.21484 1.60937 6.48828 0.984375 7.93359C0.359375 9.37109 0.046875 10.9062 0.046875 12.5391C0.046875 14.1719 0.359375 15.7109 0.984375 17.1562C1.60937 18.5938 2.47266 19.8633 3.57422 20.9648C4.67578 22.0664 5.94531 22.9297 7.38281 23.5547C8.82812 24.1797 10.3672 24.4922 12 24.4922ZM6.28125 12.5508C6.28125 12.2461 6.37891 12 6.57422 11.8125C6.76953 11.6172 7.01953 11.5195 7.32422 11.5195H10.9922V7.85156C10.9922 7.54688 11.082 7.29688 11.2617 7.10156C11.4492 6.90625 11.6914 6.80859 11.9883 6.80859C12.293 6.80859 12.5391 6.90625 12.7266 7.10156C12.9219 7.29688 13.0195 7.54688 13.0195 7.85156V11.5195H16.6992C17.0039 11.5195 17.25 11.6172 17.4375 11.8125C17.6328 12 17.7305 12.2461 17.7305 12.5508C17.7305 12.8477 17.6328 13.0898 17.4375 13.2773C17.2422 13.457 16.9961 13.5469 16.6992 13.5469H13.0195V17.2266C13.0195 17.5312 12.9219 17.7812 12.7266 17.9766C12.5391 18.1641 12.293 18.2578 11.9883 18.2578C11.6914 18.2578 11.4492 18.1641 11.2617 17.9766C11.082 17.7812 10.9922 17.5312 10.9922 17.2266V13.5469H7.32422C7.01953 13.5469 6.76953 13.457 6.57422 13.2773C6.37891 13.0898 6.28125 12.8477 6.28125 12.5508Z" fill="#0C79FE"/>
                                </svg>
                            </span>
                            <span>Utilisateurs</span>
                        </button>
                    </div>
                </div>`;
            const descriptionReminder = document.querySelectorAll('#descriptionReminder')[i];
            const dateStart = document.querySelectorAll('#dateStart')[i];
            const dateEnd = document.querySelectorAll('#dateEnd')[i];
            const priority = document.querySelectorAll('#priority')[i];
            const status = document.querySelectorAll('#status')[i];
            const reminder = document.getElementById(`rappel_${data[i].task_id}`)

            if (data[i].description !== null) {
                descriptionReminder.innerHTML = `
                    <p class="text-sm">${data[i].description}</p>
                `;
            }
            if (data[i].start !== null) {
                let hoursSlice = data[i].start.slice(10, 19);
                if (hoursSlice !== '00:00:00') {
                    dateStart.innerHTML = `
                        <p>Début: ${formatDateWithoutH(data[i].start)}</p>
                    `;
                } else {
                    dateStart.innerHTML = `
                        <p>Début: ${formatDate(data[i].start)}</p>
                    `;
                }
            }
            if (data[i].end !== null) {
                let hoursSlice = data[i].end.slice(10, 19);
                if (hoursSlice !== '00:00:00') {
                    dateEnd.innerHTML = `<p>Fin: ${formatDateWithoutH(data[i].end)}</p>`;
                } else {
                    dateEnd.innerHTML = `<p>Fin: ${formatDate(data[i].end)}</p>`;
                }
            }
            if (data[i].priority !== null) {
                if (data[i].priority === 0) {
                    priority.innerHTML = `
                        <p>Priorité: Basse</p>
                    `;
                } else if (data[i].priority === 1) {
                    priority.innerHTML = `
                        <p>Priorité: Moyenne</p>
                    `;
                } else if (data[i].priority === 2) {
                    priority.innerHTML = `
                        <p>Priorité: Haute</p>
                    `;
                }
            }
            if (data[i].status === 'todo') {
                status.innerHTML = `
                    <option value="0" selected>Pas commencer</option>
                    <option value="1">En cours</option>
                    <option value="2">Terminé</option>
                `;
                reminder.classList.add('border', 'border-green-500');
            } else if (data[i].status === 'inprogress') {
                status.innerHTML = `
                    <option value="0">Pas commencer</option>
                    <option value="1" selected>En cours</option>
                    <option value="2">Terminé</option>`;
                reminder.classList.add('border', 'border-yellow-500');
            } else if (data[i].status === 'done') {
                status.innerHTML = `
                    <option value="0">Pas commencer</option>
                    <option value="1">En cours</option>
                    <option value="2" selected>Terminé</option>`;
                reminder.classList.add('border', 'border-red-400');
            }
        }
        for (let i = 0; i < data.length; i++) {
            const changeStatusOnFly = document.querySelectorAll(`#changeStatusOnFly_${data[i].task_id}`);
            changeStatusOnFly.forEach(form => {
                form.addEventListener('change', async () => {
                    const response = await fetch(`/super-reminder/reminder/${id}/changeStatus`, {
                        method: 'POST',
                        body: new FormData(form)
                    });
                    const data = await response.json();
                    console.log(data);
                    if (data.success) {
                        dislpayReminder();
                    }
                });
            });
        }
        for (let i = 0; i < data.length; i++) {
            const deleteReminder = document.querySelectorAll(`#deleteReminder_${data[i].task_id}`);
            deleteReminder.forEach(btn => {
                btn.addEventListener('click', async () => {
                    const idTask = btn.getAttribute('data-id');
                    const response = await fetch(`/super-reminder/reminder/${idTask}/deleteTask`);
                    const data = await response.json();
                    console.log(data);
                    if (data.success) {
                        dislpayReminder();
                    }
                });
            });
        }
        for (let i = 0; i < data.length; i++) {
            let updateReminder = document.getElementById(`updateReminder_${data[i].task_id}`)
            updateReminder.addEventListener('click', () => {
                const idTask = updateReminder.getAttribute('data-id');
                containerModal.innerHTML = '';
                containerModal.innerHTML = `
                    <dialog id="modalEditReminder" tabindex="-1" aria-labelledby="modalEditReminderLabel" aria-hidden="true" class="dialog_fixed">
                        <div style="display: flex; justify-content: space-between;">
                            <h2 id="modalEditReminderLabel">Modifier un rappel</h2>
                            <button type="button" id="btnCloseEditReminder">X</button>
                        </div>
                        <div>
                            <form action="" method="post" id="formEditReminder">
                                <div>
                                    <label for="name">Titre</label>
                                    <input type="text" name="name" id="name" value="${data[i].task_name}">
                                    <p id="errorName"></p>
                                </div>
                                <div>
                                    <label for="description">Description</label>
                                    <textarea name="description" id="description" cols="30" rows="10"></textarea>
                                    <p id="errorDescription"></p>
                                </div>
                                <div>
                                    <button type="button" id="btnAddDate">Ajouter une date</button>
                                    <button type="button" id="btnAddPriority">Ajouter une priorité</button>
                                    <div id="addDate"></div>
                                    <div id="addPriority"></div>
                                </div>
                                <div>
                                    <label for="status">Status</label>
                                    <select name="status" id="status">
                                        <option value="0">Pas commencer</option>
                                        <option value="1">En cours</option>
                                        <option value="2">Terminé</option>
                                    </select>
                                </div>
                                <div id="listsOfReminders"></div>
                                <p id="errorDisplay"></p>
                                <div>
                                    <button type="submit" id="btnAddReminder">Modifier votre rappel</button>
                                </div>
                            </form>
                        </div>
                    </dialog>`;
                // Modification
                const btnAddDate = document.getElementById('btnAddDate');
                const addDate = document.getElementById('addDate');
                btnAddDate.addEventListener('click', () => {
                    const hasHours = addDate.querySelector('#btnAddHours');

                    if (!hasHours) {
                        if (data[i].start !== null) {
                            addDate.innerHTML = `
                            <h3>Heures</h3>
                            <div id="hoursEdit">
                                <div>
                                    <p>Début: ${formatDate(data[i].start)}</p>
                                    <label for="start">Début</label>
                                    <input type="date" name="start" id="start">
                                </div>
                                <div>
                                    <p>Début: ${formatDate(data[i].end)}</p>
                                    <label for="end">Fin</label>                    
                                    <input type="date" name="end" id="end">
                                </div>
                            </div>
                            <p id="errorDate"></p>
                            <button type="button" id="btnAddHours">Ajouter des heures</button>`;
                        }
                    } else {
                        // Les champs de date et d'heure sont déjà affichés, supprimez-les
                        addDate.innerHTML = '';
                    }
                    const btnAddHours = document.getElementById('btnAddHours');
                    if (btnAddHours) {
                        btnAddHours.addEventListener('click', () => {
                            const inputStart = document.getElementById('start');
                            const inputEnd = document.getElementById('end');
                            if (btnAddHours.textContent === 'Ajouter des heures') {
                                inputStart.setAttribute('type', 'datetime-local');
                                inputEnd.setAttribute('type', 'datetime-local');
                                btnAddHours.textContent = 'Supprimer les heures';
                            } else {
                                inputStart.setAttribute('type', 'date');
                                inputEnd.setAttribute('type', 'date');
                                btnAddHours.textContent = 'Ajouter des heures';
                            }
                        });
                    }
                });
                const btnAddPriority = document.getElementById('btnAddPriority');
                const addPriority = document.getElementById('addPriority');
                btnAddPriority.addEventListener('click', () => {
                    const hasPriority = addPriority.querySelector('#priority');
                    if (!hasPriority) {
                        if (data[i].priority === 0) {
                            addPriority.innerHTML = `
                        <h3>Priorité</h3>
                        <select name="priority" id="priority">
                            <option value="0" selected>Basse</option>
                            <option value="1">Moyenne</option>
                            <option value="2">Haute</option>
                        </select>`;
                        }
                        if (data[i].priority === 1) {
                            addPriority.innerHTML = `
                            <h3>Priorité</h3>
                            <select name="priority" id="priority">
                                <option value="0">Basse</option>
                                <option value="1" selected>Moyenne</option>
                                <option value="2">Haute</option>
                            </select>`;
                        }
                        if (data[i].priority === 2) {
                            addPriority.innerHTML = `
                            <h3>Priorité</h3>
                            <select name="priority" id="priority">
                                <option value="0">Basse</option>
                                <option value="1">Moyenne</option>
                                <option value="2" selected>Haute</option>
                            </select>`;
                        }
                    } else {
                        addPriority.innerHTML = '';
                    }
                });
                const listsOfReminders = document.getElementById('listsOfReminders');
                getListOfUsers(id).then(listUser => {
                    for (let j = 0; j < listUser.length; j++) {
                        listsOfReminders.innerHTML += `
                            <div>
                                <input type="radio" value="${listUser[j].id}" name="list" data-id="${listUser[j].id}" id="list_${listUser[j].id}">
                                <label for="list_${listUser[j].id}">${listUser[j].name}</label>
                            </div>`;
                        const radio = document.getElementById('list_' + listUser[j].id);
                        const radioId = parseInt(radio.getAttribute('data-id'));
                        if (data[i].list_id !== null) {
                            const listId = data[i].list_id;
                            if (radioId == listId) {
                                radio.setAttribute('checked', 'checked');
                            }
                        }
                    }
                });


                // Preremplir les champs
                if (data[i].description !== null) {
                    const description = document.getElementById('description');
                    description.innerHTML = data[i].description;
                }
                const modalEditReminder = document.getElementById('modalEditReminder');
                modalEditReminder.showModal();
                const btnCloseEditReminder = document.getElementById('btnCloseEditReminder');
                btnCloseEditReminder.addEventListener('click', () => {
                    modalEditReminder.close();
                });
            });
        }
        for (let i = 0; i < data.length; i++) {
            const addUserToReminder = document.querySelectorAll(`#addUserToReminder_${data[i].task_id}`);
            addUserToReminder.forEach(btn => {
                containerModal.innerHTML = '';
                btn.addEventListener('click', async () => {
                    let response = await fetch(`/super-reminder/reminder/${id}/getUserTask/${data[i].task_id}`)
                    let dataResponse = await response.json();
                    console.log(dataResponse);
                    containerModal.innerHTML = `
                        <dialog id="modalAddUserToReminder" tabindex="-1" aria-labelledby="modalAddUserToReminderLabel" aria-hidden="true" class="dialog_fixed">
                            <h2 id="modalAddUserToReminderLabel">Ajouter un utilisateur</h2>
                            <button type="button" id="btnCloseAddUserToReminder">X</button>
                            <form action="" method="post" id="formAddUserToReminder">
                                <input type="hidden" name="task_id" value="${data[i].task_id}">
                                <div id="listUser"></div>
                                <div id="errorDisplay"></div>
                                <button type="submit">Ajouter</button>
                            </form>
                        </dialog>
                    `;
                    const listUser = document.getElementById('listUser');
                    let allUser = dataResponse.user;
                    let userTask = dataResponse.userTask;

                    for (let i = 0; i < allUser.length; i++) {
                        listUser.innerHTML += `
                            <div>
                                <input type="checkbox" name="users[]" id="user_${allUser[i].id}" value="${allUser[i].id}">
                                <label for="user_${allUser[i].id}">${allUser[i].login}</label>
                            </div>
                        `;
                        for (let j = 0; j < userTask.length; j++) {
                            if (userTask[j].id === allUser[i].id) {
                                const user = document.getElementById(`user_${allUser[i].id}`);
                                user.setAttribute('checked', 'checked');
                            }
                        }
                    }
                    const modalAddUserToReminder = document.getElementById('modalAddUserToReminder');
                    modalAddUserToReminder.showModal();

                    const formAddUserToReminder = document.getElementById('formAddUserToReminder');
                    formAddUserToReminder.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        try {
                            let responseAddUserToReminder = await fetch(`/super-reminder/reminder/addUserToTask/${id}`, {
                                method: 'POST',
                                body: new FormData(formAddUserToReminder)
                            });
                            let dataAddUserToReminder = await responseAddUserToReminder.json();
                            let errorDisplay = document.getElementById('errorDisplay');
                            if (dataAddUserToReminder.success) {
                                errorDisplay.innerHTML = '';
                                errorDisplay.innerHTML = dataAddUserToReminder.success;
                                setTimeout(() => {
                                    modalAddUserToReminder.close();
                                }, 1000);
                            }
                            if (dataAddUserToReminder.error) {
                            console.log(dataAddUserToReminder);
                                errorDisplay.innerHTML = '';
                                errorDisplay.innerHTML = dataAddUserToReminder.error;
                            }
                            if (dataAddUserToReminder.right) {
                                errorDisplay.innerHTML = '';
                                errorDisplay.innerHTML = dataAddUserToReminder.right;
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    });
                    const btnCloseAddUserToReminder = document.getElementById('btnCloseAddUserToReminder');
                    btnCloseAddUserToReminder.addEventListener('click', () => {
                        modalAddUserToReminder.close();
                    });
                });
            });
        }
    }
}
async function formReminder() {
    const inputSearch = document.getElementById('autocompletion')
    const inputSearchValue = inputSearch.value;
    const listeValue = listeFormSelect.value;
    const dateFormSelect = document.getElementById('dateFormSelect').value;
    const statusFormSelect = document.getElementById('statusFormSelect').value;
    const priorityFormSelect = document.getElementById('priorityFormSelect').value;

    const listSortForm = document.getElementById('listSortForm');
    const resetFormSort = document.getElementById('resetFormSort');

    const autocompletion = document.getElementById('autocompletion');
    autocompletion.addEventListener('keyup', async () => {
        dislpayReminder();
    });
    const selectList = document.getElementById('listeFormSelect');
    selectList.addEventListener('change', () => {
        dislpayReminder();
    });
    const selectDate = document.getElementById('dateFormSelect');
    selectDate.addEventListener('change', () => {
        dislpayReminder();
    });
    const selectStatus = document.getElementById('statusFormSelect');
    selectStatus.addEventListener('change', () => {
        dislpayReminder();
    });
    const selectPriority = document.getElementById('priorityFormSelect');
    selectPriority.addEventListener('change', () => {
        dislpayReminder();
    });

    if (inputSearchValue !== '' || listeValue !== 'all' || dateFormSelect !== 'all' || statusFormSelect !== 'all' || priorityFormSelect !== 'all') {
        listSortForm.innerHTML += `<button type="button" id="btnResetFormSort">Réinitialiser</button>`;
        const btnReset = document.getElementById('btnResetFormSort');
        btnReset.addEventListener('click', () => {
            listSortForm.reset();
            dislpayReminder();
        });
    }
    dislpayReminder();
}
formReminder();


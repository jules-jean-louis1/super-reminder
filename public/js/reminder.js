import {
    formatDate,
    formatDateWithoutH,
} from './function/function.js';
import {createToast, removeToast} from "./function/toast";

const btnAddReminder = document.getElementById('btnAddReminder');
const btnAddList = document.getElementById('btnAddList');
const ListeUserWarpper = document.getElementById('ListeUserWarpper');
const listeFormSelect = document.getElementById('listeFormSelect');
const containerReminderList = document.getElementById('containerReminderList');
const containerPushNotif = document.getElementById('containerPushNotif');
const btnShareListTask = document.getElementById('btnShareListTask');
const btnAddTags = document.getElementById('btnAddTags');

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
                }, 500);
                dislpayReminder();
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
                <div class="listUser bg-[#E2E8F0] rounded-[10px] p-1 my-2 text-[#525866]">
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
                        <button class="deleteList flex items-center" data-id="${list[i].id}">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                <path d="M10 10l4 4m0 -4l-4 4"/>
                            </svg>
                        </span>
                        <span class="hidden xl:flex">Suppr.</span>
                        </button>
                        <button class="updateList flex items-center" data-id="${list[i].id}">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                                  <path d="M16 5l3 3"/>
                                </svg>
                            </span>
                            <span class="hidden xl:flex">Modif.</span>
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
                <div class="reminder bg-[#f5f8fc] p-1 m-3 min-h-[20.5rem] min-w-[15.5rem] lg:w-[31%] h-1/3 rounded-[10px] bg-white my-2 border-2" id="rappel_${data[i].task_id}">
                    <div class="flex flex-col justify-between rounded-[10px] m-0.5 h-full">
                        <h3 class="font-bold text-xl">${data[i].task_name}</h3>
                        <div id="list" class="flex items-center">
                            <p>
                                <span>${data[i].list_name} - </span>
                                <div id="created_at" class="flex items-center">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <p class="text-sm">${formatDate(data[i].task_created_at)}</p>
                                </div>
                            </p>
                        </div>
                        <div id="descriptionReminder"></div>
                        <div id="dateStart"></div>
                        <div id="dateEnd"></div>
                        <div id="priority"></div>
                        <div class="flex flex-col gap-1">
                            <div class="flex justify-between">
                                <div id="statusContainer" class="border border-[#52586633] rounded-[10px] w-full">
                                    <form action="" method="post" id="changeStatusOnFly_${data[i].task_id}" class="flex justify-between items-center px-2 py-2">
                                        <input type="hidden" name="id" value="${data[i].task_id}">
                                        <button type="button" name="status" value="todo" id="todo_${data[i].task_id}" class="flex items-center px-2 gap-3 text-slate-700 hover:text-[#15ce5c] group">
                                            <span class="p-1 hover:bg-[#1ddc6f3d] rounded group-hover:bg-[#1ddc6f3d]">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play w-6 h-6" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M7 4v16l13 -8z"/>
                                                </svg>
                                            </span>
                                            <span class="hidden xl:flex font-semibold">A faire</span>
                                        </button>
                                        <button type="button" name="status" value="inprogress" id="inprogress_${data[i].task_id}" class="flex items-center px-2 gap-3 text-slate-700 hover:text-[#fa6620] group">
                                            <span class="p-1 hover:bg-[#ff7a2b3d] rounded group-hover:bg-[#ff7a2b3d]">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-progress-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969"/>
                                                    <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554"/>
                                                    <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592"/>
                                                    <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305"/>
                                                    <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356"/>
                                                    <path d="M9 12l2 2l4 -4"/>
                                                </svg>
                                            </span>
                                            <span class="hidden xl:flex font-semibold">En cours</span>
                                        </button>
                                        <button type="button" name="status" id="done_${data[i].task_id}" value="done" class="flex items-center px-2 gap-3 text-slate-700 hover:text-[#fa2020] group">
                                            <span class="p-1 hover:bg-[#ff2b2b3d] rounded group-hover:bg-[#ff2b2b3d]">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                                    <path d="M9 12l2 2l4 -4"/>
                                                </svg>
                                            </span>
                                            <span class="hidden xl:flex font-semibold">Terminé</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div class="reminderActionBtn flex justify-between bg-[#e0e4ec] rounded-[10px] w-full py-0.5  px-2">
                                <button id="deleteReminder_${data[i].task_id}" data-id="${data[i].task_id}" class="flex items-center px-2 gap-3 text-slate-700 hover:text-[#fa2020] group">
                                    <span class="p-1 hover:bg-[#ff2b2b3d] rounded group-hover:bg-[#ff2b2b3d]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" stroke-width="0" fill="currentColor"/>
                                        </svg>
                                    </span>
                                    <span class="hidden xl:flex ">Supprimer</span>
                                </button>
                                <button id="updateReminder_${data[i].task_id}" data-id="${data[i].task_id}" class="flex items-center px-2 gap-3 text-slate-700 hover:text-[#15ce5c] group">
                                    <span class="p-1 hover:bg-[#1ddc6f3d] rounded group-hover:bg-[#1ddc6f3d]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                                          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                                          <path d="M16 5l3 3"/>
                                        </svg>
                                    </span>
                                    <span class="hidden xl:flex ">Modifier</span>
                                </button>
                                <button id="addUserToReminder_${data[i].task_id}" data-id="${data[i].task_id}" class="flex items-center px-2 gap-3 text-slate-700 hover:text-[#ac1de4] group">
                                    <span class="p-1 hover:bg-[#c029f03d] rounded group-hover:bg-[#c029f03d]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                          <path d="M9 12l6 0"/>
                                          <path d="M12 9l0 6"/>
                                        </svg>
                                    </span>
                                    <span class="hidden xl:flex ">Utilisateurs</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            const descriptionReminder = document.querySelectorAll('#descriptionReminder')[i];
            const dateStart = document.querySelectorAll('#dateStart')[i];
            const dateEnd = document.querySelectorAll('#dateEnd')[i];
            const priority = document.querySelectorAll('#priority')[i];
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
                reminder.classList.add('border', 'border-[#15ce5c]');
            } else if (data[i].status === 'inprogress') {
                reminder.classList.add('border', 'border-[#fad820]');
            } else if (data[i].status === 'done') {
                reminder.classList.add('border', 'border-[#fa2020]');
            }
        }
        for (let i = 0; i < data.length; i++) {
            async function editStatus(selectorValue) {
                try {
                    const response = await fetch(`/super-reminder/reminder/${id}/changeStatus/${selectorValue}`);
                    const data = await response.json();
                    console.log(data);
                    if (data.success) {
                        dislpayReminder();
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            const todo = document.getElementById(`todo_${data[i].task_id}`);
            const todoValue = todo.getAttribute('value');
            todo.addEventListener('click', async (e) => {
                e.preventDefault();
                await editStatus(todoValue);
            });
            const inprogress = document.getElementById(`inprogress_${data[i].task_id}`);
            const inprogressValue = inprogress.getAttribute('value');
            inprogress.addEventListener('click', async (e) => {
                e.preventDefault();
                await editStatus(inprogressValue);
            });
            const done = document.getElementById(`done_${data[i].task_id}`);
            const doneValue = done.getAttribute('value');
            done.addEventListener('click', async (e) => {
                e.preventDefault();
                await editStatus(doneValue);
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
                        <div class="flex flex-col justify-between">
                        <div class="flex justify-between">
                                <h2 id="modalEditReminderLabel">Modifier un rappel</h2>
                                <button type="button" id="btnCloseEditReminder">X</button>
                            </div>
                            <div>
                                <form action="" method="post" id="formEditReminder_${data[i].task_id}">
                                    <div>
                                        <div class="flex flex-col bg-[#f1f2f3] border rounded-[10px] p-2 border-2 border-3-l border-[#fff]">
                                            <label for="name" class="relative">Titre du rappel</label>
                                            <input type="text" name="name" id="name" value="${data[i].task_name}" class="bg-transparent">
                                        </div>
                                        <p id="errorName"></p>
                                    </div>
                                    <div>
                                        <div class="flex flex-col bg-[#f1f2f3] border rounded-[10px] p-2 border-2 border-3-l border-[#fff]">
                                            <label for="description">Description</label>
                                            <textarea name="description" id="description" cols="30" rows="4" class="bg-transparent"></textarea>
                                        </div>
                                        <p id="errorDescription"></p>
                                    </div>
                                    <div>
                                        <div class="flex items-center justify-around w-full">
                                            <button type="button" id="btnAddDate" class="flex items-center bg-[#f1f2f3] rounded-[10px] px-2 py-2 w-full">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-cog" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M12 21h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"/>
                                                    <path d="M16 3v4"/>
                                                    <path d="M8 3v4"/>
                                                    <path d="M4 11h16"/>
                                                    <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                                                    <path d="M19.001 15.5v1.5"/>
                                                    <path d="M19.001 21v1.5"/>
                                                    <path d="M22.032 17.25l-1.299 .75"/>
                                                    <path d="M17.27 20l-1.3 .75"/>
                                                    <path d="M15.97 17.25l1.3 .75"/>
                                                    <path d="M20.733 20l1.3 .75"/>
                                                    </svg>
                                                </span>
                                                <span id="textBtnAddDate">Ajouter une date</span>
                                            </button>
                                            <button type="button" id="btnAddPriority" class="flex items-center bg-[#f1f2f3] rounded-[10px] px-2 py-2 w-full">
                                                Ajouter une priorité
                                            </button>
                                        </div>
                                        <div>
                                            <div id="addDate"></div>
                                            <div id="addPriority"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <label for="status">Status</label>
                                        <select name="status" id="status">
                                            <option value="0">Pas commencer</option>
                                            <option value="1">En cours</option>
                                            <option value="2">Terminé</option>
                                        </select>
                                    </div>
                                    <div id="listsOfReminders" class="flex flex-wrap"></div>
                                    <p id="errorDisplay"></p>
                                    <div>
                                        <button type="submit" id="btnEditReminder_${data[i].task_id}" class="w-full px-2 bg-green-500">Modifier votre rappel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </dialog>`;
                // Modification
                const btnAddDate = document.getElementById('btnAddDate');
                const textBtnAddDate = document.getElementById('textBtnAddDate');
                if (data[i].start !== null) {
                    textBtnAddDate.textContent = 'Modifier la date';
                }
                const addDate = document.getElementById('addDate');
                btnAddDate.addEventListener('click', () => {
                    const hasHours = addDate.querySelector('#btnAddHours');

                    if (!hasHours) {
                        addDate.innerHTML = `
                        <div id="hoursEdit" class="flex items-center bg-[#f1f2f3] rounded-[10px] px-2 py-2 w-full">
                            <div class="flex items-center">
                                <div>
                                    <label for="start">Début</label>
                                    <input type="date" name="start" id="start">
                                </div>
                                <div>
                                    <label for="end">Fin</label>                    
                                    <input type="date" name="end" id="end">
                                </div>
                            </div>
                            <p id="errorDate"></p>
                            <button type="button" id="btnAddHours" class="flex items-center">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-hour-3" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                      <path d="M12 12h3.5" />
                                      <path d="M12 7v5" />
                                    </svg>
                                </span>
                                <span>Heures</span>
                            </button>
                        </div>
                            `;
                        let sliceHoursStart = data[i].start.slice(11, 19);
                        let sliceHoursEnd = data[i].end.slice(11, 19);
                        let dateStart = data[i].start.slice(0, 10);
                        let dateEnd = data[i].end.slice(0, 10);
                        const inputStart = document.getElementById('start');
                        const inputEnd = document.getElementById('end');
                        if (data[i].start !== null && sliceHoursStart !== '00:00:00') {
                            inputStart.setAttribute('type', 'datetime-local');
                            const start = document.getElementById('start');
                            start.setAttribute('value', data[i].start);
                        }
                        if (data[i].end !== null && sliceHoursEnd !== '00:00:00') {
                            inputEnd.setAttribute('type', 'datetime-local');
                            const end = document.getElementById('end');
                            end.setAttribute('value', data[i].end);
                        }
                        if (data[i].start !== null && sliceHoursStart === '00:00:00') {
                            const start = document.getElementById('start');
                            start.setAttribute('value', dateStart);
                        }
                        if (data[i].end !== null && sliceHoursEnd === '00:00:00') {
                            const end = document.getElementById('end');
                            end.setAttribute('value', dateEnd);
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
                            <div class="w-1/6">
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

                const formEditReminder = document.getElementById(`formEditReminder_${data[i].task_id}`);
                formEditReminder.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    try {
                        const editResponse = await fetch(`/super-reminder/reminder/editTask/${data[i].task_id}`, {
                            method: 'POST',
                            body: new FormData(formEditReminder),
                        });
                        const editData = await editResponse.json();
                        console.log(editData);
                        if (editData.success) {
                            modalEditReminder.close();
                            dislpayReminder();
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });

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
async function getTags() {
    try {
        let tagsResponse = await fetch(`/super-reminder/reminder/${id}/getTags`);
        let tagsData = await tagsResponse.json();
        return tagsData;
    } catch (error) {
        console.log(error);
    }
}
async function addTags() {
    containerModal.innerHTML = '';
    containerModal.innerHTML = `
        <dialog id="modalAddTags" tabindex="-1" aria-labelledby="modalAddTagsLabel" aria-hidden="true" class="dialog_fixed">
            <div class="flex justify-between">
                <h2 id="modalAddTagsLabel">Ajouter un tag</h2>
                <button type="button" id="btnCloseAddTags">X</button>
            </div>
            <div id="tagsListDisplay"></div>
            <div class="flex flex-col justify-between">
                <form action="" method="post" id="formAddTags">
                    <div class="relative">
                        <input type="text" name="name" id="name" class="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500" placeholder="">
                        <label for="name" class="absolute left-3 top-2 text-gray-600 transition-transform transform-scale-75 origin-top-left">Nom du tag</label>
                    </div>
                        <p id="errorName"></p>
                    <button type="submit" id="btnAddTags" class="w-full px-2 bg-green-500">Ajouter votre tag</button>
                </form>
            </div>
        </dialog>`;
    const modalAddTags = document.getElementById('modalAddTags');
    modalAddTags.showModal();
    const btnCloseAddTags = document.getElementById('btnCloseAddTags');
    btnCloseAddTags.addEventListener('click', () => {
        modalAddTags.close();
    });
    const tagsListDisplay = document.getElementById('tagsListDisplay');
    const tags = await getTags();
    for (let i = 0; i < tags.length; i++) {
        tagsListDisplay.innerHTML += `
        <p>${tags[i].name}</p>`;
    }
    const formAddTags = document.getElementById('formAddTags');
    formAddTags.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            let responseAddTags = await fetch(`/super-reminder/reminder/${id}/addTags`, {
                method: 'POST',
                body: new FormData(formAddTags),
            });
            let dataAddTags = await responseAddTags.json();
            if (dataAddTags.success){
                modalAddTags.close();
                addTags();
                toast(containerPushNotif, 'success', 'Votre tag a bien été ajouté', 'top-left');
            }
        } catch (error) {
            console.log(error);
        }
    });
}
formReminder();

async function getShareTask(){
    try {
        const response = await fetch(`/super-reminder/reminder/shareTask/${id}`);
        const data = await response.json();
        console.log(data);
        containerReminderList.innerHTML = '';
        if (data === false) {
            containerReminderList.innerHTML = '<p>Vous n\'avez pas de tâche partagé</p>';
        }
    } catch (error) {
        console.log(error);
    }
}
btnShareListTask.addEventListener('click', () => {
    getShareTask();
});

btnAddTags.addEventListener('click', () => {
    addTags();
});

const btntesttoast = document.getElementById('btntesttoast');
btntesttoast.addEventListener('click', () => {
    createToast(containerPushNotif, 'success', 'Votre tag a bien été ajouté', 555000);
});



import {
    formatDate,
    formatDateWithoutH
} from './function/function.js';

const btnAddReminder = document.getElementById('btnAddReminder');
const btnAddList = document.getElementById('btnAddList');
const ListeUserWarpper = document.getElementById('ListeUserWarpper');
const listeFormSelect = document.getElementById('listeFormSelect');
const containerReminderList = document.getElementById('containerReminderList');

const url = window.location.href;
let segments = url.split('/');
let idIndex = segments.indexOf('reminder') + 1;
const id = segments[idIndex];

const containerModal = document.getElementById('containerModal');
async function addList() {
    containerModal.innerHTML = '';
    containerModal.innerHTML = `
        <dialog id="modalAddList" tabindex="-1" aria-labelledby="modalAddListLabel" aria-hidden="true" class="dialog_fixed">
            <h2 id="modalAddListLabel">Ajouter une liste</h2>
            <p>Vous ne pouvez crée que 5 listes</p>
            <button type="button" id="btnCloseAddList">X</button>
            <div id="listsOfReminders"></div>
            <div>
                <form action="" method="post" id="formAddList">
                    <label for="name">Nom de la liste</label>
                    <input type="text" name="name" id="name">
                    <p id="errorDisplay"></p>
                    <div>
                        <button type="submit" id="btnAddList">Ajouter une Liste</button>
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
                <div>
                    <h3>${data[i].name}</h3>
                </div>
            `;
        }
    });
}
async function addReminder() {
    containerModal.innerHTML = '';
    containerModal.innerHTML = `
        <dialog id="modalAddReminder" tabindex="-1" aria-labelledby="modalAddReminderLabel" aria-hidden="true" class="dialog_fixed">
            <h2 id="modalAddReminderLabel">Ajouter un rappel</h2>
            <button type="button" id="btnCloseAddReminder">X</button>
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
            // Les champs de date et d'heure ne sont pas affichés, affichez-les
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
                <div class="listUser">
                    <h3>${list[i].name}</h3>
                    <div class="reminderActionBtn">
                        <button class="deleteList" data-id="${list[i].id}">Suppr</button>
                        <button class="updateList" data-id="${list[i].id}">Modif</button>
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
                <div class="reminder">
                    <h3>${data[i].task_name}</h3>
                    <div id="descriptionReminder"></div>
                    <div id="created_at">
                        <p>${formatDate(data[i].task_created_at)}</p>
                    </div>
                    <div id="dateStart"></div>
                    <div id="dateEnd"></div>
                    <div id="priority"></div>
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
                    <div class="reminderActionBtn">
                        <button id="deleteReminder_${data[i].task_id}" data-id="${data[i].task_id}">Suppr</button>
                        <button id="updateReminder_${data[i].task_id}" data-id="${data[i].task_id}">Modif</button>
                        <button id="addUserToReminder_${data[i].task_id}" data-id="${data[i].task_id}">Ajouter un utilisateur</button>
                    </div>
                </div>`;
            const descriptionReminder = document.querySelectorAll('#descriptionReminder')[i];
            const dateStart = document.querySelectorAll('#dateStart')[i];
            const dateEnd = document.querySelectorAll('#dateEnd')[i];
            const priority = document.querySelectorAll('#priority')[i];
            const status = document.querySelectorAll('#status')[i];

            if (data[i].description !== null) {
                descriptionReminder.innerHTML = `
                    <p>Description: ${data[i].description}</p>
                `;
            }
            if (data[i].start !== null) {
                dateStart.innerHTML = `
                    <p>Début: ${formatDate(data[i].start)}</p>
                `;
            }
            if (data[i].end !== null) {
                dateEnd.innerHTML = `
                    <p>Fin: ${formatDate(data[i].end)}</p>
                `;
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
            } else if (data[i].status === 'inprogress') {
                status.innerHTML = `
                    <option value="0">Pas commencer</option>
                    <option value="1" selected>En cours</option>
                    <option value="2">Terminé</option>`;
            } else if (data[i].status === 'done') {
                status.innerHTML = `
                    <option value="0">Pas commencer</option>
                    <option value="1">En cours</option>
                    <option value="2" selected>Terminé</option>`;
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
            const deleteReminder = document.querySelectorAll(`.deleteReminder_${data[i].task_id}`);
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
                let listId = data[i].list_id;
                getListOfUsers(id).then(data => {
                    for (let j = 0; j < data.length; j++) {
                        listsOfReminders.innerHTML += `
                    <div>
                        <input type="radio" value="${data[j].id}" name="list" data-id="${data[j].id}" id="list_${data[j].id}">
                        <label for="${data[j].name}">${data[j].name}</label>
                    </div>`;
                        const radio = document.getElementById('list_' + data[j].id);
                        const radioId = radio.getAttribute('data-id');
                        if (radioId === listId.toString()) {
                            radio.setAttribute('checked', 'checked');
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
                            <div id="listUser"></div>
                        </dialog>
                    `;
                    const listUser = document.getElementById('listUser');
                    let allUser = dataResponse.user;
                    let userTask = dataResponse.userTask;

                    for (let i = 0; i < allUser.length; i++) {
                        listUser.innerHTML += `
                            <div>
                                <input type="checkbox" name="user" id="user_${allUser[i].id}" value="${allUser[i].id}">
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


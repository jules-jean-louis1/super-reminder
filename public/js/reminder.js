const btnAddReminder = document.getElementById('btnAddReminder');
const btnAddList = document.getElementById('btnAddList');
const ListeUserWarpper = document.getElementById('ListeUserWarpper');

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
                    <label for="title">Titre</label>
                    <input type="text" name="title" id="title">
                    <label for="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="10"></textarea>
                    <label for="start">Début</label>
                    <input type="datetime-local" name="start" id="start">
                    <label for="end">Fin</label>
                    <input type="datetime-local" name="end" id="end">
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

    const listsOfReminders = document.getElementById('listsOfReminders');
    getListOfUsers(id).then(data => {
        for (let i = 0; i < data.length; i++) {
            listsOfReminders.innerHTML += `
                <div>
                    <input type="checkbox" value="${data[i].id}">
                    <label for="${data[i].name}">${data[i].name}</label>
                </div>
            `;
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
    console.log(data);
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
                containerModal.innerHTML = '';
                containerModal.innerHTML = `
                <dialog>
                    <form action="" method="post" id="formEditList">
                        <label for="name">Name</label>
                        <input value="">
                        <button type="submit">Modifier</button>
                    </form>
                </dialog>
                `;
            })
        })
    });
}
manageReminder();
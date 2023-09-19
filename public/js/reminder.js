const btnAddReminder = document.getElementById('btnAddReminder');

const url = window.location.href;
let segments = url.split('/');
let idIndex = segments.indexOf('reminder') + 1;
const id = segments[idIndex];
async function addReminder() {
    const containerModal = document.getElementById('containerModal');
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
                    <input type="date" name="start" id="start">
                    <label for="end">Fin</label>
                    <input type="date" name="end" id="end">
                    <div id="listsOfReminders"></div>
                </form>
            </div>
        </dialog>
        `;
    const modalAddReminder = document.getElementById('modalAddReminder');
    modalAddReminder.showModal();

    const listsOfReminders = document.getElementById('listsOfReminders');

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
getListOfUsers(id);

btnAddReminder.addEventListener('click', addReminder);
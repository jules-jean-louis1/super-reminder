
const url = window.location.href;
let segments = url.split('/');
let idIndex = segments.indexOf('profil') + 1;
const id = segments[idIndex];

const displayTopInfosUsers = document.querySelector('#displayTopInfosUsers');
const displayLoginUsers = document.querySelector('#displayLoginUsers');

const inputLogin = document.querySelector('#login');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const inputPasswordConfirm = document.querySelector('#passwordConfirm');
const inputFirstName = document.querySelector('#firstname');
const inputLastName = document.querySelector('#lastname');

// Error message variables
const errorLogin = document.querySelector('#errorLogin');
const errorEmail = document.querySelector('#errorEmail');
const errorPassword = document.querySelector('#errorPassword');
const errorPasswordConfirm = document.querySelector('#errorPasswordConfirm');
const errorFirstName = document.querySelector('#errorFirstName');
const errorLastName = document.querySelector('#errorLastName');

const errorDisplay = document.querySelector('#errorDisplay');

async function getProfil(id) {
    const response = await fetch(`/super-reminder/profil/${id}/infos`);
    const data = await response.json();
    return data;
}

function displayProfilInfo() {
    getProfil(id).then(data => {
        inputLogin.value = data[0].login;
        inputEmail.value = data[0].email;
        inputFirstName.value = data[0].firstname;
        inputLastName.value = data[0].lastname;
        displayLoginUsers.innerHTML = data[0].login;
        displayTopInfosUsers.innerHTML = `${data[0].firstname} ${data[0].lastname}`;
    });
}
displayProfilInfo();
let svgWarning = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fa2020" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"/>
                            <path d="M12 9v4"/>
                            <path d="M12 17h.01"/>
                        </svg>`;
// Edit profil
const formEditProfil = document.querySelector('#formEditProfil');
formEditProfil.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        let response = await fetch(`/super-reminder/profil/edit`, {
            method: 'POST',
            body: new FormData(formEditProfil),
        });
        let data = await response.json();
        console.log(data);
        if (data.length === 0) {
            errorDisplay.innerHTML = 'Aucune modification n\'a été effectuée.';
            setTimeout(() => {
                errorDisplay.innerHTML = '';
            }, 2000);
        }
        function errorDisplayInput(input, small, message) {
            input.classList.remove('is_valid', 'is-valid');
            input.classList.add('is_invalid', 'is-invalid');
            small.innerHTML = `
            <p class="flex items-center space-x-2">
                <span class="text-red-500">${svgWarning}</span>
                <span class="text-red-500">${message}</span>
            </p>`;
        }
        if (data.login) {
            errorDisplayInput(inputLogin, errorLogin, data.login);
        }
        if (data.email) {
            errorDisplayInput(inputEmail, errorEmail, data.email);
        }
        if (data.firstname) {
            errorDisplayInput(inputFirstName, errorFirstName, data.firstname)
        }
        if (data.lastname) {
            errorDisplayInput(inputLastName, errorLastName, data.lastname)
        }
        if (data.success) {
            const success = data.success;
            for (const key in success) {
                if (success.hasOwnProperty(key)) {
                    const message = success[key];
                    errorDisplay.innerHTML += `
                <p class="text-center">${message}</p>`;
                }
            }
            setTimeout(() => {
                errorDisplay.innerHTML = '';
                displayProfilInfo();
            }, 4000);
        }

    } catch (error) {
        console.log(error);
    }
});

let regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
inputPassword.addEventListener('input', () => {
    if (regex.test(inputPassword.value)) {
        inputPassword.classList.remove('is_invalid', 'is-invalid');
        inputPassword.classList.add('is_valid', 'is-valid');
        errorPassword.innerHTML = '';
    } else {
        inputPassword.classList.remove('is_valid', 'is-valid');
        inputPassword.classList.add('is_invalid', 'is-invalid');
        errorPassword.innerHTML = '8 caractères minimum, une majuscule, une minuscule, un chiffre et un caractère spécial.';
    }
    if (inputPassword.value === '') {
        inputPassword.classList.remove('is_valid', 'is_invalid', 'is-valid', 'is-invalid');
        errorPassword.innerHTML = '';
    }
});

inputPasswordConfirm.addEventListener('input', () => {
    if (inputPassword.value === inputPasswordConfirm.value) {
        inputPasswordConfirm.classList.remove('is_invalid', 'is-invalid');
        inputPasswordConfirm.classList.add('is_valid', 'is-valid');
        errorPasswordConfirm.innerHTML = '';
    } else {
        inputPasswordConfirm.classList.remove('is_valid', 'is-valid');
        inputPasswordConfirm.classList.add('is_invalid', 'is-invalid');
        errorPasswordConfirm.innerHTML = 'Les mots de passe ne correspondent pas.';
    }
    if (inputPasswordConfirm.value === '') {
        inputPasswordConfirm.classList.remove('is_valid', 'is_invalid', 'is-valid', 'is-invalid');
        errorPasswordConfirm.innerHTML = '';
    }
});

// Delete profil
const removeProfil = document.querySelector('#removeProfil');
const modalProfil = document.querySelector('#modalProfil');
removeProfil.addEventListener('click', async () => {
    modalProfil.innerHTML ='';
    modalProfil.innerHTML = `
    <dialog id="dialog_deleteProfil" tabindex="-1" aria-labelledby="modalAddListLabel" aria-hidden="true" class="dialog_fixed flex flex-col justify-center">
        <div class="text-center px-2">
            <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
        </div>
        <div class="flex justify-center space-x-2">
            <button class="px-4 py-2 text-white font-semibold rounded-[10px] bg-red-700 hover:bg-red-500 ease-in duration-300 hover:drop-shadow-[0_20px_20px_rgba(199,32,23,0.30)]" id="confirmDeleteProfil">Supprimer</button>
            <button class="px-4 py-2 rounded-[10px] border border-black" id="cancelDeleteProfil">Annulé</button>
        </div>
    </dialog>`;
    const dialog = document.querySelector('#dialog_deleteProfil');
    dialog.showModal();
    const cancelDeleteProfil = document.querySelector('#cancelDeleteProfil');
    cancelDeleteProfil.addEventListener('click', () => {
        dialog.close();
        modalProfil.innerHTML = '';
    })
    const confirmDeleteProfil = document.querySelector('#confirmDeleteProfil');
    confirmDeleteProfil.addEventListener('click', async () => {
        try {
            let response = await fetch(`/super-reminder/profil/delete`, {
                method: 'POST',
            });
            let data = await response.json();
        } catch (error) {
            console.log(error);
        }
    });
});

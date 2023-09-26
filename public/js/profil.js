
const url = window.location.href;
let segments = url.split('/');
let idIndex = segments.indexOf('profil') + 1;
const id = segments[idIndex];

const inputLogin = document.querySelector('#login');
const inputEmail = document.querySelector('#email');
const inputPassword = document.querySelector('#password');
const inputPasswordConfirm = document.querySelector('#passwordConfirm');
const inputFirstName = document.querySelector('#firstname');
const inputLastName = document.querySelector('#lastname');
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
    });
}
displayProfilInfo();

const formEditProfil = document.querySelector('#formEditProfil');
import { loginRegisterForm} from "./function/loginRegister.js";

const btnLogin = document.getElementById('btnLogin');

if (btnLogin) {
    loginRegisterForm(btnLogin);
}

const btnMenu = document.querySelector('#btnMenu');
const responsiveMenu = document.querySelector('#responsiveMenu');

btnMenu.addEventListener('click', () => {
    responsiveMenu.classList.toggle('hidden');
});
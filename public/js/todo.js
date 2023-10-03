import { loginRegisterForm} from "./function/loginRegister.js";

const btnLogin = document.getElementById('btnLogin');
const btnloginTodo = document.getElementById('loginBtnTodo');
const container = document.getElementById('containerFormLoginRegister');

if (btnLogin) {
    loginRegisterForm(btnLogin);
}

loginRegisterForm(btnloginTodo);
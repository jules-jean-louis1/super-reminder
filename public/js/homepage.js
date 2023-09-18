import { loginRegisterForm} from "./function/loginRegister.js";

const btnLogin = document.getElementById('btnLogin');

if (btnLogin) {
    loginRegisterForm(btnLogin);
}

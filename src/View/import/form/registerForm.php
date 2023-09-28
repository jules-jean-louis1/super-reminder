<form action="" method="post" id="formRegister" class="bg-white h-full max-h-[calc(100vh-2.5rem)] mobileL:h-[40rem] mobileL:max-h-[calc(100vh-5rem)] w-[26.25rem] px-4 py-5 flex flex-col justify-between">
    <div>
        <div>
            <div class="form__div2">
                <input type="text" name="login" id="login" placeholder="" class="form__input">
                <label for="username" class="form__label">Login</label>
            </div>
            <small id="errorLogin" class="flex h-6"></small>
        </div>
        <div>
            <div class="form__div2">
                <input type="email" name="email" id="email" placeholder="" class="form__input">
                <label for="email" class="form__label">Email</label>
            </div>
            <small id="errorEmail" class="flex h-6"></small>
        </div>
    </div>
    <div class="flex space-x-2">
        <div class="flex-grow">
            <div class="form__div2">
                <input type="text" name="firstname" id="firstname" placeholder="" class="form__input">
                <label for="firstname" class="form__label">Prénom</label>
            </div>
            <small id="errorFirstname" class="flex h-6" ></small>
        </div>
        <div class="flex-grow">
            <div class="form__div2">
                <input type="text" name="lastname" id="lastname" placeholder="" class="form__input">
                <label for="lastname" class="form__label">Nom</label>
            </div>
            <small id="errorLastname"  class="flex h-6"></small>
        </div>
    </div>
    <div>
        <div>
            <div class="form__div2">
                <input type="password" name="password" id="password" placeholder="" class="form__input">
                <label for="password" class="form__label">Mot de passe</label>
            </div>
            <small id="errorPassword" class="flex h-6"></small>
        </div>
        <div>
            <div class="form__div2">
                <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="" class="form__input">
                <label for="passwordConfirm" class="form__label">Confirmer le mot de passe</label>
            </div>
            <small id="errorPasswordConfirm" class="flex h-6"></small>
        </div>
    </div>
    <div>
        <div id="errorDisplay" class="h-20"></div>
    </div>
    <button type="submit" class="p-2 bg-[#0e1217] border-[#0e1217]  hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.30)] rounded text-white font-bold">
        Créer un compte
    </button>
</form>
<form action="" method="post" id="login-form" class="bg-white h-full max-h-[80%] mobileL:h-[40rem] mobileL:max-h-[calc(100vh-5rem)] w-[26.25rem] px-4 py-5 flex flex-col justify-between">
    <div>
        <div>
            <div class="form__div">
                <input type="text" name="email" id="email" placeholder="" class="form__input">
                <label for="email" class="form__label">Email / Login</label>
            </div>
            <small id="errorEmail"></small>
        </div>
    </div>
    <div>
        <div>
            <div class="form__div">
                <input type="password" name="password" id="password" placeholder="" class="form__input">
                <label for="password" class="form__label">Mot de passe</label>
            </div>
            <small id="errorPassword"></small>
        </div>
    </div>
    <div id="containerMessageProfil" class="h-[55px] w-full">
        <div id="errorDisplay" class="w-full"></div>
    </div>
    <div id="containerSubmit" class="w-full">
        <button type="submit" name="submit" id="submit" class="p-2 rounded bg-[#ac1de4] border-[#ac1de4]  hover:drop-shadow-[0_20px_20px_rgba(172,29,228,0.30)] font-semibold text-white w-full">Connexion</button>
    </div>
</form>
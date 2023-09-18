<form action="" method="post" id="formRegister" class="bg-white h-full max-h-[calc(100vh-2.5rem)] mobileL:h-[40rem] mobileL:max-h-[calc(100vh-5rem)] w-[26.25rem] px-4 py-5 flex flex-col justify-between">
    <div>
        <div>
            <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                <label for="username" class="sr-only">Nom d'utilisateur</label>
                <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" class="bg-transparent text-black focus:outline-none w-full">
            </div>
            <small id="errorUsername"></small>
        </div>
        <div>
            <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                <label for="email" class="sr-only">Email</label>
                <input type="email" name="email" id="email" placeholder="Email" class="bg-transparent text-black focus:outline-none w-full">
            </div>
            <small id="errorEmail"></small>
        </div>
    </div>
    <div class="flex space-x-2">
        <div class="flex-grow">
            <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                <label for="firstname" class="sr-only">Prénom</label>
                <input type="text" name="firstname" id="firstname" placeholder="Prénom" class="bg-transparent text-black focus:outline-none w-full">
            </div>
            <small id="errorFirstname"></small>
        </div>
        <div class="flex-grow">
            <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                <label for="lastname" class="sr-only">Nom</label>
                <input type="text" name="lastname" id="lastname" placeholder="Nom" class="bg-transparent text-black focus:outline-none w-full">
            </div>
            <small id="errorLastname"></small>
        </div>
    </div>
    <div>
        <div>
            <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                <label for="password" class="sr-only">Mot de passe</label>
                <input type="password" name="password" id="password" placeholder="Mot de passe" class="bg-transparent text-black focus:outline-none w-full">
            </div>
            <small id="errorPassword"></small>
        </div>
        <div>
            <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                <label for="passwordConfirm" class="sr-only">Confirmer le mot de passe</label>
                <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmer le mot de passe" class="bg-transparent text-black focus:outline-none w-full">
            </div>
            <small id="errorPasswordConfirm"></small>
        </div>
    </div>
    <div>
        <div id="errorDisplay" class="h-20"></div>
    </div>
    <button type="submit" class="p-2 bg-[#0e1217] border-[#0e1217]  hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.30)] rounded text-white font-bold">
        Créer un compte
    </button>
</form>
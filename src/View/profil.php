<?php if (isset($_SESSION['user'])): ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./../public/css/style.css">
    <script defer type="module" src="./../public/js/profil.js"></script>
    <title>Profil</title>
</head>
<body>
    <header>
        <?php require_once 'src/View/import/header.php'; ?>
    </header>
    <main>
        <div class="w-full">
            <form action="" method="post" id="editProfil">
                <div>
                    <div>
                        <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                            <input type="text" name="login" id="login" placeholder="Nom d'utilisateur" class="bg-transparent text-black focus:outline-none">
                            <label for="login" class="absolute top-0 left-2 px-1 py-px text-xs text-gray-500">Nom d'utilisateur / Login</label>
                        </div>
                        <small id="errorUsername"></small>
                    </div>
                </div>
                <div>
                    <div>
                        <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                            <input name="email" id="email" class="bg-transparent text-black focus:outline-none">
                            <label for="email" class="absolute top-0 left-2 px-1 py-px text-xs text-gray-500">Email</label>
                        </div>
                        <small id="errorEmail"></small>
                    </div>
                </div>
                <div class="flex space-x-2 justify-between">
                    <div class="w-1/2">
                        <div class="relative">
                            <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                                <input name="firstname" id="firstname" class="bg-transparent text-black focus:outline-none">
                                <label for="firstname" class="absolute top-0 left-2 px-1 py-px text-xs text-gray-500">Prénom</label>
                            </div>
                            <small id="errorFirstname"></small>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div>
                            <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                                <input name="lastname" id="lastname" class="bg-transparent text-black focus:outline-none">
                                <label for="lastname" class="absolute top-0 left-2 px-1 py-px text-xs text-gray-500">Nom</label>
                            </div>
                            <small id="errorLastname"></small>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2 justify-between">
                    <div class="w-1/2">
                        <div>
                            <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                                <input name="password" id="password" class="bg-transparent text-black focus:outline-none">
                                <label for="password" class="absolute top-0 left-2 px-1 py-px text-xs text-gray-500">Mot de passe</label>
                            </div>
                            <small id="errorPassword"></small>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div>
                            <div class="form_control flex relative rounded-14 flex-row items-center bg-[#a8b3cf14] h-12 px-4 overflow-hidden border-2 border-[#000] rounded cursor-text">
                                <input name="passwordConfirm" id="passwordConfirm" class="bg-transparent text-black focus:outline-none">
                                <label for="passwordConfirm" class="absolute top-0 left-2 px-1 py-px text-xs text-gray-500">Confirmer le mot de passe</label>
                            </div>
                            <small id="errorPasswordConfirm"></small>
                        </div>
                    </div>
                </div>
                <div class="h-16" id="errorDisplay"></div>
                <button type="submit" class="px-1.5 py-2 rounded bg-[#ac1de4] hover:bg-[#9e15d9] hover:drop-shadow-[0_20px_20px_rgba(172,29,228,0.30)] font-bold text-white">
                    Sauvegarder vos modifications
                </button>
            </form>
        </div>
    </main>
    <footer>
        <?php require_once 'src/View/import/footer.php'; ?>
    </footer>
</body>
</html>
<?php else: ?>
    <?php header('Location: /super-reminder/'); ?>
<?php endif; ?>

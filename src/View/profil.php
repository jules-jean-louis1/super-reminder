<?php if (isset($_SESSION['user'])): ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./../public/css/style.css">
    <link rel="icon" href="./../public/images/logo/RemindMe!.png">
    <script defer type="module" src="./../public/js/profil.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Profil</title>
</head>
<body>
    <header>
        <?php require_once 'src/View/import/header.php'; ?>
    </header>
    <main>
        <article class="flex justify-center">
            <section class="w-[95%] lg:w-[60%] pt-10">
                <div id="infosUserRecap" class="flex items-start justify-center space-x-4">
                    <img src="/super-reminder/public/images/avatars/<?= $_SESSION['user']['avatar']?>" class="rounded-full w-10 h-10">
                    <div class="flex flex-col justify-center">
                        <h2 class="font-bold typo-headline" id="displayTopInfosUsers"><?= $_SESSION['user']['firstname'] . ' ' . $_SESSION['user']['lastname'] ?></h2>
                        <p class="typo-subheading" id="displayLoginUsers"><?= $_SESSION['user']['login'] ?></p>
                    </div>
                </div>
            </section>
        </article>
        <aside class="flex hidden w-[60%] fixed top-[45px] bg-white h-full z-[15] lg:hidden" id="responsiveMenu">
            <div class="flex flex-col space-y-6 pl-4 pt-4 w-full text-2xl">
                <div class="flex flex-col space-y-6 pl-4 pt-4 w-full text-2xl">
                    <a href="/super-reminder/">Accueil</a>
                    <?php if (isset($_SESSION['user'])): ?>
                        <a href="/super-reminder/reminder/<?= $_SESSION['user']['id']?>">Reminder</a>
                        <a href="/super-reminder/profil/<?= $_SESSION['user']['id']?>">Profil</a>
                    <?php else: ?>
                        <a href="/super-reminder/todolist">Reminder</a>
                    <?php endif; ?>
                </div>
            </div>
        </aside>
        <article class="flex justify-center">
            <section class="w-[95%] lg:w-[60%] pt-8">
                <div id="containerFormEditProfil">
                    <div class="w-full">
                        <form action="" method="post" id="formEditProfil">
                            <div>
                                <div>
                                    <div class="form__div">
                                        <input type="text" name="login" id="login" placeholder="Nom d'utilisateur" class="form__input">
                                        <label for="login" class="form__label">Nom d'utilisateur / Login</label>
                                    </div>
                                    <small id="errorLogin" class="flex h-6"></small>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div class="form__div">
                                        <input name="email" id="email" class="form__input">
                                        <label for="email" class="form__label">Email</label>
                                    </div>
                                    <small id="errorEmail" class="flex h-6"></small>
                                </div>
                            </div>
                            <div class="flex space-x-2 justify-between">
                                <div class="w-1/2">
                                    <div>
                                        <div class="form__div">
                                            <input name="firstname" id="firstname" class="form__input">
                                            <label for="firstname" class="form__label">Prénom</label>
                                        </div>
                                        <small id="errorFirstname" class="flex h-6"></small>
                                    </div>
                                </div>
                                <div class="w-1/2">
                                    <div>
                                        <div class="form__div">
                                            <input name="lastname" id="lastname" class="form__input">
                                            <label for="lastname" class="form__label">Nom</label>
                                        </div>
                                        <small id="errorLastname"  class="flex h-6"></small>
                                    </div>
                                </div>
                            </div>
                            <div class="flex space-x-2 justify-between">
                                <div class="w-1/2">
                                    <div>
                                        <div class="form__div">
                                            <input name="password" id="password" class="form__input">
                                            <label for="password" class="form__label">Mot de passe</label>
                                        </div>
                                        <small id="errorPassword" class="flex h-6"></small>
                                    </div>
                                </div>
                                <div class="w-1/2">
                                    <div>
                                        <div class="form__div">
                                            <input name="passwordConfirm" id="passwordConfirm" class="form__input">
                                            <label for="passwordConfirm" class="form__label">Confirmer le mot de passe</label>
                                        </div>
                                        <small id="errorPasswordConfirm" class="flex h-6"></small>
                                    </div>
                                </div>
                            </div>
                            <div class="h-16" id="errorDisplay"></div>
                            <button type="submit" class="px-1.5 py-2 rounded-[10px] bg-[#ac1de4] hover:bg-[#9e15d9] hover:drop-shadow-[0_20px_20px_rgba(172,29,228,0.30)] font-bold text-white">
                                Sauvegarder vos modifications
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </article>
        <article class="flex justify-center">
            <section class="w-[95%] lg:w-[60%]">
                <div id="containerDeleteProfil">
                    <h2 class="mt-4 font-bold typo-headline">🚨 Danger Zone</h2>
                    <div id="divRemoveProfil" class="border border-red-500 rounded-[10px] bg-red-100 mt-2 mb-6">
                        <div class="p-4">
                            <p>Supprimer votre compte entrainera:</p>
                            <ul>
                                <li>La suppression de vos listes</li>
                                <li>La suppression de vos tâches</li>
                                <li>La suppression de vos tags</li>
                                <li>La suppression de vos informations personnelles</li>
                            </ul>
                            <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                            <button id="removeProfil" class="px-1.5 py-2 rounded-[10px] bg-red-700 hover:bg-red-500 ease-in duration-300 hover:drop-shadow-[0_20px_20px_rgba(172,29,228,0.30)] font-bold text-white">
                                Supprimer mon compte
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    </main>
    <footer>
        <?php require_once 'src/View/import/footer.php'; ?>
    </footer>
</body>
</html>
<?php else: ?>
    <?php header('Location: /super-reminder/'); ?>
<?php endif; ?>

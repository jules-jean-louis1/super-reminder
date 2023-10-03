<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/super-reminder/public/css/style.css">
    <script defer type="module" src="/super-reminder/public/js/todo.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Reminder</title>
</head>
<body>
    <header>
        <?php require_once 'src/View/import/header.php'; ?>
    </header>
    <main class="h-screen">
            <div id="containerFormLoginRegister"></div>
            <div id="dialogModal_Overlay"></div>
        <article class="flex flex-col items-start space-y-4 -mx-3 font-sans px-4 mx-auto w-full lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md pb-20 pt-20">
                <section id="connexion" class="flex justify-center w-full text-center p-2 border border-[#52586633] rounded-[10px]">
                <h2 class="flex space-x-2" >
                    <button id="loginBtnTodo" type="button" class="hover:underline">Connectez-vous</button>
                    <span>pour accéder à votre liste de tâches</span>
                </h2>
            </section>
            <section id="about">
                <h1 class="text-2xl font-bold text-[#ac1de4]">À Propos de Remind Me!</h1>
            </section>
            <section id="description">
                <h2>Qui sommes-nous?</h2>
                <p><strong>Remind Me!</strong> est un projet de gestionnaire de tâches avancé conçu pour vous aider à gérer vos projets de manière efficace. Que vous soyez un développeur chevronné ou que vous cherchiez simplement à organiser votre travail, <strong>Remind Me!</strong> est l'outil idéal pour vous.</p>
            </section>
            <section id="features" class="my-8">
                <h2 class="text-xl font-semibold text-[#fa6620]">Fonctionnalités de la version 1.7</h2>
                <ul class="list-disc ml-6">
                    <li class="mb-2">Inscription et connexion sécurisées</li>
                    <li class="mb-2">Gestion complète du profil de l'utilisateur</li>
                    <li class="mb-2">Possibilité de créer jusqu'à 8 listes de tâches</li>
                    <li class="mb-2">Ajout de tâches dans une liste ou sans attribution à une liste</li>
                    <li class="mb-2">Personnalisation des tâches avec des détails tels que la description, la date de début et de fin, la priorité, et des tags</li>
                    <li class="mb-2">Partage de tâches entre utilisateurs pour une collaboration optimale</li>
                    <li class="mb-2">Fonction d'autocomplétion avec des filtres avancés, y compris la date, la liste et la priorité</li>
                </ul>
            </section>
            <section id="tech-stack" class="my-8">
                <h2 class="text-xl font-semibold text-[#fa6620]">Stack technique</h2>
                <p class="mt-2">SuperReminder a été développé en utilisant les technologies suivantes :</p>
                <ul class="list-disc ml-6">
                    <li class="mb-2">PHP 8.2</li>
                    <li class="mb-2">JavaScript Vanilla</li>
                    <li class="mb-2">Modèle MVC avec Altorouter</li>
                </ul>
            </section>
        </article>
    </main>
    <footer>
        <?php require_once 'src/View/import/footer.php'; ?>
    </footer>
</body>
</html>
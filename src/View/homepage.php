<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./public/css/style.css">
    <link rel="icon" href="./public/images/logo/RemindMe!.png">
    <script defer type="module" src="./public/js/homepage.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Remind Me! - Accueil</title>
</head>
<body>
    <header>
        <?php require_once 'src/View/import/header.php'; ?>
    </header>
        <main class="h-screen">
            <div id="containerFormLoginRegister"></div>
            <div id="dialogModal_Overlay"></div>
            <section class="flex items-center -mx-3 font-sans px-4 mx-auto w-full lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md pb-20 pt-20">
                <!-- Column-1 -->
                <div class="px-3 w-full lg:w-[70%]">
                    <div
                            class="mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left">
                        <h2 class="mb-4 text-3xl font-bold text-left lg:text-5xl">
                            Organiser votre vie avec
                            <span class="text-5xl text-[#ac1de4] leading-relaxeds">Remind me!</span>
                        </h2>
                        <p class="visible mx-0 mt-3 mb-0 text-sm leading-relaxed text-left text-slate-400">
                            Votre meilleur allié pour vous organiser au quotidien.
                        </p>
                    </div>
                    <div class="text-center lg:text-left">
                        <?php if (isset($_SESSION['user'])): ?>
                            <a href="/super-reminder/reminder/<?= $_SESSION['user']['id']?>" class="block visible py-4 px-8 mb-4 text-xl font-semibold tracking-wide leading-none text-white bg-[#ac1de4] hover:bg-[#9e15d9] rounded-[10px] cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block">Reminder</a>
                        <?php else: ?>
                        <a href="/super-reminder/todolist" class="block visible py-4 px-8 mb-4 text-xl font-semibold tracking-wide leading-none text-white bg-[#ac1de4] hover:bg-[#9e15d9] rounded-[10px] cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block">Reminder</a>
                        <?php endif; ?>
                        <a href="/super-reminder/todolist" class="block visible py-4 px-8 text-xl font-semibold leading-none bg-white rounded-[10px] border border-solid cursor-pointer sm:inline-block border-[#52586633] text-slate-500">En savoir +</a>
                    </div>
                </div>
                <!-- Column-2 -->
                <div class="px-3 mb-12 w-full lg:mb-0 lg:w-full">
                    <!-- Illustrations Container -->
                    <div class="flex justify-center items-center">
                        <aside id="homepageForm" tabindex="-1" aria-labelledby="modalAddReminderLabel" aria-hidden="true" class="w-[95%] p-3 border rounded-[10px] ">
                            <div class="flex justify-between">
                                <h2 id="modalAddReminderLabel" class="text-2xl">Ajouter un rappel</h2>
                                <button type="button" id="btnCloseAddReminder" class="w-10 rounded-[10px] hover:bg-[#5258661f] flex items-center justify-center">
                                    <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                </button>
                            </div>
                            <div class="h-full">
                                <div id="formAddReminder" class="flex flex-col justify-between">
                                    <div>
                                        <div class="form__div">
                                            <input type="text" name="name" id="name" placeholder="" class="form__input">
                                            <label for="name" class="form__label">Titre</label>
                                        </div>
                                        <p id="errorName"></p>
                                    </div>
                                    <div>
                                        <div class="form__div h-[150px]">
                                            <textarea name="description" id="description" cols="30" rows="10" class="form__input h-full" placeholder=""></textarea>
                                            <label for="description" class="form__label">Description</label>
                                        </div>
                                        <p id="errorDescription"></p>
                                    </div>
                                    <div class="h-40">
                                        <div class="flex space-x-2">
                                            <div class="w-1/2">
                                                <button type="button" id="btnAddDate" class="flex justify-around items-center px-3 rounded-[10px] border border-[#52586633] py-1 w-full text-slate-700 hover:text-[#15ce5c] group">
                                    <span class="p-1 hover:bg-[#1ddc6f3d] rounded group-hover:bg-[#1ddc6f3d]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"/>
                                          <path d="M16 3v4"/>
                                          <path d="M8 3v4"/>
                                          <path d="M4 11h16"/>
                                          <path d="M11 15h1"/>
                                          <path d="M12 15v3"/>
                                        </svg>
                                    </span>
                                                    <span>Ajouter une date</span>
                                                </button>
                                            </div>
                                            <div class="w-1/2">
                                                <button type="button" id="btnAddPriority" class="flex justify-around items-center px-3 rounded-[10px] border border-[#52586633] py-1 w-full text-slate-700 hover:text-[#ac1de4] group">
                                    <span class="p-1 hover:bg-[#c029f03d] rounded group-hover:bg-[#c029f03d]">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list-numbers" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <path d="M11 6h9"/>
                                          <path d="M11 12h9"/>
                                          <path d="M12 18h8"/>
                                          <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4"/>
                                          <path d="M6 10v-6l-2 2"/>
                                        </svg>
                                    </span>
                                                    <span>Ajouter une priorité</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="flex">
                                            <div class="w-1/2">
                                                <div id="addDate"></div>
                                            </div>
                                            <div class="w-1/2">
                                                <div id="addPriority"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="statusContainer" class="border border-[#52586633] rounded-[10px] w-full">
                                        <div id="changeStatusOnFly_${data[i].task_id}" class="flex justify-between items-center px-2 py-2">
                                            <input type="hidden" name="id" value="${data[i].task_id}">
                                            <button type="button" name="status" value="todo" id="todo_${data[i].task_id}" class="flex items-center px-2 gap-3 text-slate-700 hover:text-[#15ce5c] group">
                                            <span class="p-1 hover:bg-[#1ddc6f3d] rounded group-hover:bg-[#1ddc6f3d]">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play w-6 h-6" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M7 4v16l13 -8z"/>
                                                </svg>
                                            </span>
                                                <span class="hidden xl:flex font-semibold">A faire</span>
                                            </button>
                                            <button type="button" name="status" value="inprogress" id="inprogress_${data[i].task_id}" class="flex items-center px-2 gap-3 text-slate-700 hover:text-[#fa6620] group">
                                            <span class="p-1 hover:bg-[#ff7a2b3d] rounded group-hover:bg-[#ff7a2b3d]">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-progress-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969"/>
                                                    <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554"/>
                                                    <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592"/>
                                                    <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305"/>
                                                    <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356"/>
                                                    <path d="M9 12l2 2l4 -4"/>
                                                </svg>
                                            </span>
                                                <span class="hidden xl:flex font-semibold">En cours</span>
                                            </button>
                                            <button type="button" name="status" id="done_${data[i].task_id}" value="done" class="flex items-center px-2 gap-3 text-slate-700 hover:text-[#fa2020] group">
                                            <span class="p-1 hover:bg-[#ff2b2b3d] rounded group-hover:bg-[#ff2b2b3d]">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                                    <path d="M9 12l2 2l4 -4"/>
                                                </svg>
                                            </span>
                                                <span class="hidden xl:flex font-semibold">Terminé</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <div id="selected-items" class="flex flex-wrap gap-1"></div>
                                        <div>
                                            <div class="form__div">
                                                <input type="text" name="tags" id="tags" class="form__input" placeholder="">
                                                <label for="tags" class="form__label">Tags</label>
                                            </div>
                                            <div id="autocompleteTagsList" class="absolute w-[9%] bg-white p-1"></div>
                                        </div>
                                    </div>
                                    <p id="errorDisplay"></p>
                                    <div class="pt-10">
                                        <button type="submit" id="btnAddReminder" class="w-full px-1.5 py-2 rounded-[10px] bg-[#ac1de4] hover:bg-[#9e15d9] hover:drop-shadow-[0_20px_20px_rgba(172,29,228,0.30)] font-bold text-white">Ajouter un rappel</button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
        <!-- Footer -->
        <?php require_once 'src/View/import/footer.php'; ?>
        <!-- End Footer -->
</body>
</html>
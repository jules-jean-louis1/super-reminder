<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./../public/css/style.css">
    <script defer type="module" src="./../public/js/reminder.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Reminder</title>
</head>
<body>
    <header>
        <?php require_once 'src/View/import/header.php'; ?>
    </header>
    <main class="bg-slate-100 h-[100%]">
        <div id="containerFormLoginRegister"></div>
        <div id="dialogModal_Overlay"></div>
        <div id="containerModal"></div>
        <div class="flex h-[96vh]">
            <div id="containerAutocompletion" class="bg-slate-300 px-4 w-1/6 flex flex-col space-y-2 h-[100%]">
                <div id="containerAutocompletionList"></div>
                <div>
                    <h3 class="flex items-center space-x-2">
                        <span class="bg-orange-500 rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 6l11 0"/>
                            <path d="M9 12l11 0"/>
                            <path d="M9 18l11 0"/>
                            <path d="M5 6l0 .01"/>
                            <path d="M5 12l0 .01"/>
                            <path d="M5 18l0 .01"/>
                            </svg>
                        </span>
                        <span class="text-2xl font-semibold">Mes Listes</span>
                    </h3>
                </div>
                <div>
                    <button id="btnAddList" class="flex items-center text-slate-500 py-2 px-4 border border-slate-500 rounded w-full">
                        <span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442ZM12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z" fill="#848484"/>
                            </svg>
                        </span>
                        <span class="text-2xl font-semibold">Liste</span>
                    </button>
                </div>
                <div id="ListeUserWarpper"></div>
            </div>
            <div id="containerReminder" class="flex flex-col items-center w-screen">
                <div id="containerReminderForm" class="flex items-center space-x-4 pt-2">
                    <div>
                        <button id="btnAddReminder" class="flex items-center space-x-2 text-[#ac1de4] text-2xl font-bold border border-[#ac1de4] rounded-[10px] p-3">
                            <span>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 24.4922C13.6328 24.4922 15.168 24.1797 16.6055 23.5547C18.0508 22.9297 19.3242 22.0664 20.4258 20.9648C21.5273 19.8633 22.3906 18.5938 23.0156 17.1562C23.6406 15.7109 23.9531 14.1719 23.9531 12.5391C23.9531 10.9062 23.6406 9.37109 23.0156 7.93359C22.3906 6.48828 21.5273 5.21484 20.4258 4.11328C19.3242 3.01172 18.0508 2.14844 16.6055 1.52344C15.1602 0.898438 13.6211 0.585938 11.9883 0.585938C10.3555 0.585938 8.81641 0.898438 7.37109 1.52344C5.93359 2.14844 4.66406 3.01172 3.5625 4.11328C2.46875 5.21484 1.60937 6.48828 0.984375 7.93359C0.359375 9.37109 0.046875 10.9062 0.046875 12.5391C0.046875 14.1719 0.359375 15.7109 0.984375 17.1562C1.60937 18.5938 2.47266 19.8633 3.57422 20.9648C4.67578 22.0664 5.94531 22.9297 7.38281 23.5547C8.82812 24.1797 10.3672 24.4922 12 24.4922ZM6.28125 12.5508C6.28125 12.2461 6.37891 12 6.57422 11.8125C6.76953 11.6172 7.01953 11.5195 7.32422 11.5195H10.9922V7.85156C10.9922 7.54688 11.082 7.29688 11.2617 7.10156C11.4492 6.90625 11.6914 6.80859 11.9883 6.80859C12.293 6.80859 12.5391 6.90625 12.7266 7.10156C12.9219 7.29688 13.0195 7.54688 13.0195 7.85156V11.5195H16.6992C17.0039 11.5195 17.25 11.6172 17.4375 11.8125C17.6328 12 17.7305 12.2461 17.7305 12.5508C17.7305 12.8477 17.6328 13.0898 17.4375 13.2773C17.2422 13.457 16.9961 13.5469 16.6992 13.5469H13.0195V17.2266C13.0195 17.5312 12.9219 17.7812 12.7266 17.9766C12.5391 18.1641 12.293 18.2578 11.9883 18.2578C11.6914 18.2578 11.4492 18.1641 11.2617 17.9766C11.082 17.7812 10.9922 17.5312 10.9922 17.2266V13.5469H7.32422C7.01953 13.5469 6.76953 13.457 6.57422 13.2773C6.37891 13.0898 6.28125 12.8477 6.28125 12.5508Z" fill="#ac1de4"/>
                                </svg>
                            </span>
                            <span>Nouveau rappel</span>
                        </button>
                    </div>
                    <form action="" method="get" id="listSortForm" class="flex items-center bg-slate-200 rounded p-2">
                        <div class="flex items-center bg-slate-200 rounded p-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
                                  <path d="M21 21l-6 -6"/>
                                </svg>
                            </span>
                            <input type="text" name="autocompletion" id="autocompletion" placeholder="Rechercher un tâche" class="bg-transparent">
                            <button id="btnDeleteSearch" class="hidden"></button>
                        </div>
                        <div class="flex space-x-2">
                            <div class="flex flex-col">
                                <label for="list" class="text-sm">Liste</label>
                                <select name="list" id="listeFormSelect">
                                    <option value="all">Toutes</option>
                                    <option value="share">Partager</option>
                                </select>
                            </div>
                            <div class="flex flex-col">
                                <label for="date" class="text-sm">Date</label>
                                <select name="date" id="dateFormSelect">
                                    <option value="all">Toutes</option>
                                    <option value="today">Aujourd'hui</option>
                                    <option value="tomorrow">Demain</option>
                                    <option value="week">Cette semaine</option>
                                    <option value="month">Ce mois</option>
                                    <option value="year">Cette année</option>
                                </select>
                            </div>
                            <div class="flex flex-col">
                                <label for="status" class="text-sm">Status</label>
                                <select name="status" id="statusFormSelect">
                                    <option value="all">Toutes</option>
                                    <option value="todo">Pas commencer</option>
                                    <option value="inprogress">En cours</option>
                                    <option value="done">Terminé</option>
                                </select>
                            </div>
                            <div class="flex flex-col">
                                <label for="priority" class="text-sm">Priorité</label>
                                <select name="priority" id="priorityFormSelect">
                                    <option value="all">Toutes</option>
                                    <option value="0">Basse</option>
                                    <option value="1">Moyenne</option>
                                    <option value="2">Haute</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div id="resetFormSort"></div>
                </div>
                <div id="containerReminderList" class="w-full flex flex-warp px-6"></div>
            </div>
        </div>
    </main>
    <footer>
        <?php require_once 'src/View/import/footer.php'; ?>
    </footer>
</body>
</html>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./../public/css/style.css">
    <script defer type="module" src="./../public/js/reminder.js"></script>
    <title>Reminder</title>
</head>
<body>
    <header>
        <?php require_once 'src/View/import/header.php'; ?>
    </header>
    <main>
        <div id="containerFormLoginRegister"></div>
        <div id="dialogModal_Overlay"></div>
        <div id="containerModal"></div>
        <div>
            <div id="containerAutocompletion">
                <div id="containerAutocompletionList"></div>
                <div id="ListeUserWarpper"></div>
            </div>
            <div id="containerReminder">
                <div id="containerReminderForm">
                    <form action="" method="get" id="listSortForm">
                        <label for="autocompletion">Autocompletion</label>
                        <input type="text" name="autocompletion" id="autocompletion">
                        <label for="Liste">Liste</label>
                        <select name="list" id="listeFormSelect">
                            <option value="all">Toutes</option>
                        </select>
                        <label for="date">Date</label>
                        <select name="date" id="dateFormSelect">
                            <option value="all">Toutes</option>
                            <option value="today">Aujourd'hui</option>
                            <option value="tomorrow">Demain</option>
                            <option value="week">Cette semaine</option>
                            <option value="month">Ce mois</option>
                            <option value="year">Cette année</option>
                        </select>
                        <label for="status">Status</label>
                        <select name="status" id="statusFormSelect">
                            <option value="all">Toutes</option>
                            <option value="todo">A faire</option>
                            <option value="inprogress">En cours</option>
                            <option value="done">Terminé</option>
                        </select>
                        <label for="priority">Priorité</label>
                        <select name="priority" id="priorityFormSelect">
                            <option value="all">Toutes</option>
                            <option value="0">Basse</option>
                            <option value="1">Moyenne</option>
                            <option value="2">Haute</option>
                        </select>
                    </form>
                </div>
                <div>
                    <button id="btnAddList" class="btn btn-primary">Ajouter une liste</button>
                </div>
                <div>
                    <button id="btnAddReminder" class="btn btn-primary">Ajouter un rappel</button>
                </div>
                <div id="containerReminderList"></div>
            </div>
        </div>
    </main>
    <footer>
        <?php require_once 'src/View/import/footer.php'; ?>
    </footer>
</body>
</html>
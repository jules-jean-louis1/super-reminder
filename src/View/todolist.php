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
            <div id="containerAutocompletion"></div>
            <div id="containerReminder">
                <div id="containerReminderForm">
                    <form action="" method="post" id="listeSort">
                        <label for="Liste">Liste</label>
                        <select name="Liste" id="Liste"></select>
                        <label for="date">Date</label>
                        <select name="date" id="date"></select>
                    </form>
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
<nav>
    <ul>
        <li><a href="/super-reminder/">Home</a></li>
        <?php if (isset($_SESSION['user'])): ?>
            <li><a href="/super-reminder/reminder/<?= $_SESSION['user']['id']?>">Reminder</a></li>
            <li><a href="/super-reminder/profil/<?= $_SESSION['user']['id']?>">Profil</a></li>
        <?php else: ?>
            <li><a href="/super-reminder/todolist">TodoList</a></li>
        <?php endif; ?>
    </ul>
    <div>
        <?php if (isset($_SESSION['user'])): ?>
            <a href="/super-reminder/logout">Logout</a>
        <?php else: ?>
        <button id="btnLogin" class="btn btn-primary">Login</button>
        <?php endif; ?>
    </div>
</nav>
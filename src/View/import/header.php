<nav>
    <ul>
        <li><a href="index.php">Home</a></li>
        <li><a href="index.php?page=about">TodoList</a></li>
        <li><a href="index.php?page=contact">Profil</a></li>
    </ul>
    <div>
        <?php if (isset($_SESSION['user'])): ?>
            <a href="/super-reminder/logout">Logout</a>
        <?php else: ?>
        <button id="btnLogin" class="btn btn-primary">Login</button>
        <?php endif; ?>
    </div>
</nav>
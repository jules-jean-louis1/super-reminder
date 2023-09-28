<nav>
    <div class="flex justify-between px-4 py-2 bg-white border-b border-[#52586633]">
        <ul class="flex space-x-2">
            <li><a href="/super-reminder/">TimeToRecall</a></li>
            <?php if (isset($_SESSION['user'])): ?>
                <li><a href="/super-reminder/reminder/<?= $_SESSION['user']['id']?>">Reminder</a></li>
                <li><a href="/super-reminder/profil/<?= $_SESSION['user']['id']?>">Profil</a></li>
            <?php else: ?>
                <li><a href="/super-reminder/todolist">TodoList</a></li>
            <?php endif; ?>
        </ul>
        <div>
            <?php if (isset($_SESSION['user'])): ?>
                <div class="flex items-center space-x-2">
                    <!--<a href="/super-reminder/profil/<?php /*= $_SESSION['user']['id']*/?>" class="flex items-center">
                        <img src="/super-reminder/public/images/avatars/<?php /*= $_SESSION['user']['avatar']*/?>" alt="" class="w-6 h-6 rounded">
                        <?php /*= $_SESSION['user']['login'] */?>
                    </a>-->
                    <a href="/super-reminder/logout">Logout</a>
                </div>
            <?php else: ?>
                <button id="btnLogin" class="btn btn-primary">Login</button>
            <?php endif; ?>
        </div>
    </div>

</nav>
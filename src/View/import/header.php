<nav>
    <div class="flex justify-between px-4 py-2 bg-white border-b border-[#52586633]">
        <div class="hidden lg:flex">
            <ul class="flex space-x-2">
                <li><a href="/super-reminder/">TimeToRecall</a></li>
                <?php if (isset($_SESSION['user'])): ?>
                    <li><a href="/super-reminder/reminder/<?= $_SESSION['user']['id']?>">Reminder</a></li>
                    <li><a href="/super-reminder/profil/<?= $_SESSION['user']['id']?>">Profil</a></li>
                <?php else: ?>
                    <li><a href="/super-reminder/todolist">TodoList</a></li>
                <?php endif; ?>
            </ul>
        </div>
        <div class="flex lg:hidden">
            <button id="btnMenu" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 6l16 0"/>
                    <path d="M4 12l16 0"/>
                    <path d="M4 18l16 0"/>
                </svg>
            </button>
        </div>
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
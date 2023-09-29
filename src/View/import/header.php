<nav>
    <div class="flex items-center justify-between px-4 py-2 bg-white border-b border-[#52586633]">
        <div class="hidden lg:flex">
            <ul class="flex space-x-4 items-center">
                <li>
                    <a href="/super-reminder/" class="flex items-center space-x-2">
                        <span>
                            <svg width="64" height="31" viewBox="0 0 64 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.582 2.82933H31.7073L0.652832 26.3709V30.2109H1.02291L35.8816 2.82933H39.7018L18.1896 30.2109H63.2752V0.210938H0.652832V15.965L26.582 2.82534V2.82933ZM60.7603 15.2129C60.7603 22.0534 55.2171 27.5965 48.3767 27.5965C41.5362 27.5965 35.9931 22.0534 35.9931 15.2129C35.9931 8.3725 41.5362 2.82933 48.3767 2.82933C55.2171 2.82933 60.7603 8.3725 60.7603 15.2129Z" fill="black"/>
                            </svg>
                        </span>
                        <span class="text-xl font-bold text-black">Remind me!</span>
                    </a>
                </li>
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
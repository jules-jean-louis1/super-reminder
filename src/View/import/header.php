<nav>
    <div class="flex items-center justify-between px-4 py-2 bg-white border-b border-[#52586633]">
        <div class="hidden lg:flex">
            <ul class="flex space-x-4 items-center">
                <li>
                    <a href="/super-reminder/" class="flex items-center space-x-2">
                        <span>
                            <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5561 5.93411C18.0469 5.31027 18.3397 4.5233 18.3397 3.66794C18.3397 1.64219 16.6975 0 14.6718 0C12.646 0 11.0038 1.64219 11.0038 3.66794C11.0038 4.5233 11.2966 5.31027 11.7874 5.93411C7.57117 7.64731 5.9266 9.80721 5.07954 11.951C4.35739 13.7786 4.25954 15.7829 4.25954 17.7481V21.1795C1.62665 22.1205 0 23.4165 0 24.8473C0 26.4856 2.1326 27.9472 5.46648 28.9015C5.25116 28.1084 5.26597 27.5979 5.53238 26.7358C4.28235 26.2001 3.54962 25.5492 3.54962 24.8473C3.54962 23.789 5.21567 22.8465 7.80916 22.24V25.0366C7.0805 25.3055 6.4816 25.8423 6.13201 26.5276C5.74207 27.5027 5.77799 28.192 6.03435 29.1069L6.03348 29.1069C6.49709 30.2186 7.59431 31 8.87405 31C9.70408 31 10.4573 30.6713 11.0107 30.1369C11.6907 29.3579 11.8896 28.8655 11.9504 27.9238V27.9237C11.9504 26.599 11.1131 25.4699 9.93893 25.0366V21.8484C11.375 21.647 12.9792 21.5344 14.6718 21.5344C20.8143 21.5344 25.7939 23.0176 25.7939 24.8473C25.7939 26.677 20.8143 28.1603 14.6718 28.1603C13.8983 28.1603 13.1432 28.1368 12.4142 28.092C12.3631 28.8571 12.2106 29.3235 11.7769 29.9521C12.7127 30.0186 13.6808 30.0534 14.6718 30.0534C22.7747 30.0534 29.3435 27.7226 29.3435 24.8473C29.3435 23.4165 27.7169 22.1205 25.084 21.1795V17.7481C25.084 15.7829 24.9861 13.7786 24.264 11.951C23.4169 9.80721 21.7723 7.64731 17.5561 5.93411ZM16.6832 7.57252C21.2977 8.99237 23.1908 12.7786 23.1908 14.9084V20.4695C23.1908 20.4695 22.53 20.2548 22.0076 20.1145C21.5087 19.9805 20.5878 19.7595 20.5878 19.7595V13.6069C20.5878 11.2405 18.813 9.22901 16.6832 7.57252Z" fill="black"/>
                            </svg>
                        </span>
                        <span class="text-xl font-bold text-black">Remind me!</span>
                    </a>
                </li>
                <?php if (isset($_SESSION['user'])): ?>
                    <li><a href="/super-reminder/reminder/<?= $_SESSION['user']['id']?>" class="hover:text-[#ac1de4]">Reminder</a></li>
                    <li><a href="/super-reminder/profil/<?= $_SESSION['user']['id']?>"class="hover:text-[#ac1de4]">Profil</a></li>
                <?php else: ?>
                    <li><a href="/super-reminder/todolist" class="hover:text-[#ac1de4]">TodoList</a></li>
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
                    <a href="/super-reminder/logout">Logout</a>
                </div>
            <?php else: ?>
                <button id="btnLogin" class="btn btn-primary">Login</button>
            <?php endif; ?>
        </div>
    </div>
</nav>
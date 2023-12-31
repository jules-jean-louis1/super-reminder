<?php
session_start();
require 'vendor/autoload.php';

use App\Controller\{
    AuthController,
    ProfilController
};

$router = new AltoRouter();
$authController = new AuthController();
$profilController = new ProfilController();
$listController = new \App\Controller\ListController();
$taskController = new \App\Controller\TaskController();
$router->setBasePath('/super-reminder');


// login
$router->map('GET', '/login', function () {
    require_once 'src/View/import/form/loginForm.php';
});
$router->map('POST', '/login/submit', function () use ($authController) {
    $authController->login();
});
// register
$router->map('GET', '/register', function () {
    require_once 'src/View/import/form/registerForm.php';
});
$router->map('POST', '/register/submit', function () use ($authController) {
    $authController->register();
});
// logout
$router->map('GET', '/logout', function () use ($authController) {
    $authController->logout();
});
// HomePage
$router->map('GET', '/', function () {
    require_once 'src/View/homepage.php';
});
// Profil
$router->map( 'GET', '/profil/[i:id]', function($id) {
    require_once 'src/View/profil.php';
});
$router->map('GET', '/profil/[i:id]/infos', function ($id) use ($profilController) {
    $profilController->getUserInfo($id);
});
$router->map('POST', '/profil/edit', function () use ($profilController) {
    $profilController->editUserInfo($_SESSION['user']['id']);
});

// TodoList
$router->map('GET', '/todolist', function () {
    require_once 'src/View/todolist.php';
});

// Reminder
$router->map('GET', '/reminder/[:id]', function ($id) {
    require_once 'src/View/reminder.php';
});
$router->map('GET', '/reminder/[i:id]/getUserList', function ($id) use ($listController) {
    $listController->getUserList($id);
}, 'getUserList');
$router->map('POST', '/reminder/[:id]/addList', function ($id) use ($listController) {
    $listController->addList($id);
});
$router->map('GET', '/reminder/[:id]/deleteList', function ($id) use ($listController) {
    $listController->deleteList($id);
});
$router->map('POST', '/reminder/editList/[i:id]', function ($id) use ($listController) {
    $listController->editList($id);
});
// Task
$router->map('GET', '/reminder/[:id]/getTask', function ($id) use ($taskController) {
    $taskController->getTask($id);
});
$router->map('POST', '/reminder/[:id]/addTask', function ($id) use ($taskController) {
    $taskController->addTask($id);
});
$router->map('POST', '/reminder/[:id]/editTask', function ($id) use ($taskController) {
    $taskController->editTask($id);
});
$router->map('GET', '/reminder/[i:id]/changeStatus/[*:status]/[i:users_id]', function ($id, $status, $users_id) use ($taskController) {
    $taskController->changeStatus($id, $status, $users_id);
});
$router->map('GET', '/reminder/[:id]/deleteTask', function ($id) use ($taskController) {
    $taskController->deleteTask($id);
});
$router->map('POST', '/reminder/[i:id]/searchTask', function ($id) use ($taskController) {
    $taskController->searchTask($id);
});
$router->map('GET', '/reminder/[i:id]/getUserTask/[i:id_task]', function ($id ,$id_task) use ($taskController) {
    $taskController->getUserTask($id ,$id_task);
});
$router->map('POST', '/reminder/addUserToTask/[i:id]', function ($id) use ($taskController) {
    $taskController->addUserToTask($id);
});
$router->map('POST', '/reminder/editTask/[i:id]', function ($id) use ($taskController) {
    $taskController->editTask($id);
});

// ShareTask
$router->map('GET', '/reminder/shareTask/[i:id]', function ($id) use ($taskController) {
    $taskController->shareTask($id);
});
$router->map('GET', '/reminder/shareTask/changeStatus/[i:id]/[*:status]', function ($id, $status) use ($taskController) {
    $taskController->changeStatusShareTask($id, $status);
});

// #Tags
$tagsController = new \App\Controller\TagsController();
$router->map('GET', '/reminder/[i:id]/getTags', function ($id) use ($tagsController) {
    $tagsController->getTags($id);
});
$router->map('POST', '/reminder/[i:id]/addTags', function ($id) use ($tagsController) {
    $tagsController->addTags($id);
});
$router->map('GET', '/reminder/[i:id]/deleteTags', function ($id) use ($tagsController) {
    $tagsController->deleteTags($id);
});
$router->map('GET', '/reminder/searchTags/[*:search]', function ($search) use ($tagsController) {
    $tagsController->searchTags($search);
});


$match = $router->match();

if ($match) {
    call_user_func_array($match['target'], $match['params']);
} else {
    require_once 'src/View/404.php';
}
<?php
session_start();
require 'vendor/autoload.php';

use App\Controller\{
    AuthController
};

$router = new AltoRouter();
$authController = new AuthController();
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


$match = $router->match();

if ($match) {
    call_user_func_array($match['target'], $match['params']);
} else {
    echo '404';
}
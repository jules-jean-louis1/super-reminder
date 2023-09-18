<?php
require_once __DIR__ . '/vendor/autoload.php';

$router = new AltoRouter();
$router->setBasePath('/super-reminder');

$router->map('GET', '/', function () {
    echo 'Hello World';
});

$match = $router->match();

if ($match) {
    call_user_func_array($match['target'], $match['params']);
} else {
    echo '404';
}
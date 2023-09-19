<?php

namespace App\Model;
use PDO;

abstract class AbstractDatabase
{
    private $bdd;

    public function __construct()
    {
        // Connexion a la base de données LOCAL
        try {
            $this->bdd = new PDO('mysql:host=localhost;dbname=superreminder;charset=utf8', 'root', '');
            $this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Connexion échouée : ' . $e->getMessage();
            exit;
        }
        // Connexion a la base de données ONLINE
    }
    public function getBdd(): PDO
    {
        return $this->bdd;
    }
}
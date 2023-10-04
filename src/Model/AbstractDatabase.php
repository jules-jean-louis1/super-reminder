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
        /*try {
            $this->bdd = new PDO('mysql:host=localhost;dbname=jules-jean-louis_superreminder;charset=utf8', 'superreminder', '3xOga07!2');
            $this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo 'Connexion échouée : ' . $e->getMessage();
            exit;
        }*/
    }
    public function getBdd(): PDO
    {
        return $this->bdd;
    }
}
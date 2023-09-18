<?php

namespace App\Model;

use App\Model\AbstractDatabase\PDOException;
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
            $this->bdd = new PDO('mysql:host=localhost;dbname=jules-jean_louis_moduleconnexionb2;charset=utf8', 'modulecob2', 'tMq&0s333');
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
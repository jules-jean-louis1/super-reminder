<?php

namespace App\Model;
use PDO;
class TaskModel extends AbstractDatabase
{

    public function createTask(string $title, string $description, string $date, string $end, ?int $list, mixed $id): void
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('INSERT INTO task (title, description, start, end, list_id, users_id) VALUES (:title, :description, :start, :end, :list_id, :users_id)');
        $req->bindParam(':title', $title, \PDO::PARAM_STR);
        $req->bindParam(':description', $description, \PDO::PARAM_STR);
        $req->bindParam(':start', $date, \PDO::PARAM_STR);
        $req->bindParam(':end', $end, \PDO::PARAM_STR);
        $req->bindParam(':list_id', $list, \PDO::PARAM_INT);
        $req->bindParam(':users_id', $id, \PDO::PARAM_INT);
        $req->execute();
    }
}
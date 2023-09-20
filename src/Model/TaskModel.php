<?php

namespace App\Model;
use PDO;
class TaskModel extends AbstractDatabase
{

    public function createTask(string $name, string $description, ?string $start, ?string $end, string $status, ?int $list, int $id, ?int $priority): void
    {
        $bdd = $this->getBdd();
        $sql = 'INSERT INTO task (name, description, status, start, end, priority, created_at, users_id, list_id) 
                VALUES (:name, :description, :status, :start, :end, :priority, NOW(), :users_id, :list_id)';
        $req = $bdd->prepare($sql);
        $req->bindParam(':name', $name, PDO::PARAM_STR);
        $req->bindParam(':description', $description, PDO::PARAM_STR);
        $req->bindParam(':status', $status, PDO::PARAM_STR);
        $req->bindParam(':start', $start, PDO::PARAM_STR);
        $req->bindParam(':end', $end, PDO::PARAM_STR);
        $req->bindParam(':priority', $priority, PDO::PARAM_INT);
        $req->bindParam(':users_id', $id, PDO::PARAM_INT);
        $req->bindParam(':list_id', $list, PDO::PARAM_INT);
        $req->execute();
    }
}
<?php

namespace App\Model;
use PDO;
class ListModel extends AbstractDatabase
{
    public function checkNumberList(int $userId): bool
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT COUNT(*) FROM list WHERE users_id = :id');
        $req->bindParam(':id', $userId, \PDO::PARAM_INT);
        $req->execute();
        $numberList = $req->fetch();
        if (count($numberList)<= 5) {
            return true;
        } else {
            return false;
        }
    }
    public function createList(string $name, int $userId): void
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('INSERT INTO list (name, users_id) VALUES (:name, :users_id)');
        $req->bindParam(':name', $name, \PDO::PARAM_STR);
        $req->bindParam(':users_id', $userId, \PDO::PARAM_INT);
        $req->execute();
    }
    public function deleteList(int $id): bool
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('DELETE FROM list WHERE id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $result = $req->execute();

        if ($result) {
            return true;
        } else {
            return false;
        }
    }
    public function editList(string $name, int $id): void
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('UPDATE list SET name = :name WHERE id = :id');
        $req->bindParam(':name', $name, \PDO::PARAM_STR);
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
    }
    public function getUserList(int $id): array
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT * FROM list WHERE users_id = :id');
        $req->bindValue(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        $list = $req->fetchAll(PDO::FETCH_ASSOC);
        return $list;
    }
}
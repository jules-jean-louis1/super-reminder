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
        if ($numberList[0] >= 8) {
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
        $sql1 = 'DELETE FROM tags_list WHERE id = :list_id';
        $sql2 = 'UPDATE task SET list_id = NULL WHERE list_id = :list_id';
        $sql3 = 'DELETE FROM list WHERE id = :list_id';

        $req = $bdd->prepare($sql1);
        $req->bindParam(':list_id', $id, \PDO::PARAM_INT);
        $req->execute();
        $req = $bdd->prepare($sql2);
        $req->bindParam(':list_id', $id, \PDO::PARAM_INT);
        $req->execute();
        $req = $bdd->prepare($sql3);
        $req->bindParam(':list_id', $id, \PDO::PARAM_INT);
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
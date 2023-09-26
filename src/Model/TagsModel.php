<?php

namespace App\Model;
use PDO;
class TagsModel extends AbstractDatabase
{

    public function verifyTags(int $id,string $tags): bool
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT * FROM tags WHERE name = :name AND users_id = :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':name', $tags, PDO::PARAM_STR);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
        $result = $req->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            return true;
        } else {
            return false;
        }
    }
    public function countTags(int $id): bool
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT COUNT(*) FROM tags WHERE users_id = :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
        $result = $req->fetch(PDO::FETCH_ASSOC);
        if ($result['COUNT(*)'] >= 10) {
            return true;
        } else {
            return false;
        }
    }
    public function createTags(string $name): void
    {
        $bdd = $this->getBdd();
        $sql = 'INSERT INTO tags (name, users_id, created_at) VALUES (:name, :users_id, NOW())';
        $req = $bdd->prepare($sql);
        $req->bindParam(':name', $name, PDO::PARAM_STR);
        $req->bindParam(':users_id', $_SESSION['user']['id'], PDO::PARAM_INT);
        $req->execute();
    }

    public function getTags(int $id): array
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT * FROM tags WHERE users_id = :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
        $tags = $req->fetchAll(PDO::FETCH_ASSOC);
        return $tags;
    }
}
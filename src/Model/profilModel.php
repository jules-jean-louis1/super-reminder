<?php

namespace App\Model;
use PDO;
class profilModel extends AbstractDatabase
{
    public function getUserInfo(int $id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT login, email, firstname, lastname, droits, created_at, updated_at FROM users WHERE id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        $user = $req->fetchAll(\PDO::FETCH_ASSOC);
        return $user;
    }
    public function VerifyIfExist(string $field, string $nameOfField): bool
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT id FROM users WHERE ' . $nameOfField . ' = :field_value';
        $req = $bdd->prepare($sql);
        $req->bindParam(':field_value', $field, PDO::PARAM_STR);
        $req->execute();
        $user = $req->fetch();
        if ($user) {
            return true;
        } else {
            return false;
        }
    }
    public function editInfoUser(string $field, string $value, int $id)
    {
        $bdd = $this->getBdd();
        $sql = 'UPDATE users SET ' . $field . ' = :value, updated_at = NOW() WHERE id = :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':value', $value, \PDO::PARAM_STR);
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
    }
    public function VerifyPassword(string $password, int $id): bool
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT password FROM users WHERE id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        $user = $req->fetch();
        if (password_verify($password, $user['password'])) {
            return true;
        } else {
            return false;
        }
    }
}
<?php

namespace App\Model;
use PDO;

class AuthModel extends AbstractDatabase
{
    public function loginVerify(string $login): bool
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT login FROM users WHERE login = :login');
        $req->execute(['username' => $login]);
        $user = $req->fetch();
        if ($user) {
            return true;
        } else {
            return false;
        }
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
    public function register(string $login, string $email, string $firstname, string $lastname, string $password, $avatar): void
    {
        $bdd = $this->getBdd();
        $sql = 'INSERT INTO users (login, email, firstname, lastname, droits, password, avatar, created_at) VALUES (:login, :email, :firstname, :lastname, :droits, :password, :avatar, NOW())';
        $req = $bdd->prepare($sql);
        $droits = 'user';
        $password = password_hash($password, PASSWORD_DEFAULT);
        $req->bindParam(':login', $login, PDO::PARAM_STR);
        $req->bindParam(':email', $email, PDO::PARAM_STR);
        $req->bindParam(':firstname', $firstname, PDO::PARAM_STR);
        $req->bindParam(':lastname', $lastname, PDO::PARAM_STR);
        $req->bindParam(':droits', $droits, PDO::PARAM_STR);
        $req->bindParam(':password', $password, PDO::PARAM_STR);
        $req->bindParam(':avatar', $avatar, PDO::PARAM_STR);
        $req->execute();
    }
    public function login(string $login, string $password): bool
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare("SELECT id, login, firstname, lastname, email, password, avatar, role, bio FROM users WHERE email = :email OR login = :email");
        $req->bindParam(':email', $email, PDO::PARAM_STR);
        $req->execute();
        $user = $req->fetch();
        if ($user) {
            if (password_verify($password, $user['password'])) {
                $_SESSION['user'] =
                    [
                        'id' => $user['id'],
                        'login' => $user['login'],
                        'firstname' => $user['firstname'],
                        'lastname' => $user['lastname'],
                        'email' => $user['email'],
                        'avatar' => $user['avatar'],
                        'droits' => $user['droits'],
                    ];
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
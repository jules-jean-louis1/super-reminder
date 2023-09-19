<?php

namespace App\Model;

class User {
    private ?int $id;
    private ?string $login;
    private ?string $firstname;
    private ?string $lastname;
    private ?string $email;
    private ?string $avatar;
    private ?string $droits;

    // Ajoutez un constructeur si nécessaire
    public function __construct(int $id = null, string $login = null, string $firstname = null, string $lastname = null, string $email = null, string $avatar = null, string $droits = null) {
        $this->id = $id;
        $this->login = $login;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->email = $email;
        $this->avatar = $avatar;
        $this->droits = $droits;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    public function getLogin()
    {
        return $this->login;
    }

    public function setLogin($login)
    {
        $this->login = $login;
        return $this;
    }

    public function getFirstname()
    {
        return $this->firstname;
    }

    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;
        return $this;
    }

    public function getLastname()
    {
        return $this->lastname;
    }

    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
        return $this;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
        return $this;
    }

    public function getAvatar()
    {
        return $this->avatar;
    }

    public function setAvatar($avatar)
    {
        $this->avatar = $avatar;
        return $this;
    }

    public function getDroits()
    {
        return $this->droits;
    }

    public function setDroits($droits)
    {
        $this->droits = $droits;
        return $this;
    }

    public function hydrate(array $user)
    {
        $this->setId($user['id']);
        $this->setLogin($user['login']);
        $this->setFirstname($user['firstname']);
        $this->setLastname($user['lastname']);
        $this->setEmail($user['email']);
        $this->setAvatar($user['avatar']);
        $this->setDroits($user['droits']);
        return $this;
    }

}

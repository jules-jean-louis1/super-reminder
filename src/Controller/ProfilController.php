<?php

namespace App\Controller;
use App\Model\profilModel;
class ProfilController extends AbstractClasses\AbstractContoller
{
    
    public function showProfil(int $id): void
    {
        $user = $this->profilModel->getUserInfo($id);
        $this->render('profil', ['user' => $user]);
    }
    private function editUser($crtl, $field, $id)
    {
        $profilModel = new profilModel();
        if ($crtl !== null) {
            $profilModel->editInfoUser($field, $crtl, $id);
            $_SESSION['user'][$field] = $crtl;
        }
    }
    public function getUserInfo(int $id): void
    {
        $profilModel = new profilModel();
        $user = $profilModel->getUserInfo($id);
        echo json_encode($user);
    }
    public function editUserInfo(int $id): void
    {
        $profilModel = new profilModel();
        $errors = [];
        $success = [];
        $login = $this->verifyField('login');
        $email = $this->verifyField('email');
        $firstname = $this->verifyField('firstname');
        $lastname = $this->verifyField('lastname');
        $password = $this->verifyField('password');
        $passwordConfirm = $this->verifyField('passwordConfirm');

        $crtl_login = null;
        $crtl_email = null;
        $crtl_firstname = null;
        $crtl_lastname = null;
        $crtl_bio = null;

        if (!empty($_POST['login'])) {
            if ($_POST['login'] !== $_SESSION['user']['login']) {
                if (!$login) {
                    $errors['login'] = 'Veuillez renseigner un nom d\'utilisateur.';
                } elseif (strlen($login) <= 2 || strlen($login) >= 20) {
                    $errors['login'] = 'Votre nom d\'utilisateur doit contenir entre 3 et 20 caractères.';
                } elseif ($profilModel->VerifyIfExist($login, 'login')) {
                    $errors['login'] = 'Ce nom d\'utilisateur est déjà utilisé.';
                } else {
                    $crtl_login = $_POST['login'];
                }
            }
        }
        if (!empty($_POST['email'])) {
            if ($_POST['email'] !== $_SESSION['user']['email']) {
                if (!$email) {
                    $errors['email'] = 'Veuillez renseigner une adresse e-mail.';
                } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $errors['email'] = 'Veuillez renseigner une adresse e-mail valide.';
                } elseif ($profilModel->VerifyIfExist($email, 'email')) {
                    $errors['email'] = 'Cette adresse e-mail est déjà utilisée.';
                } else {
                    $crtl_email = $_POST['email'];
                }
            }
        }
        if (!empty($_POST['firstname'])) {
            if ($_POST['firstname'] !== $_SESSION['user']['firstname']) {
                if (!$firstname) {
                    $errors['firstname'] = 'Veuillez renseigner votre prénom.';
                } elseif (strlen($firstname) <= 2 || strlen($firstname) >= 20) {
                    $errors['firstname'] = 'Votre prénom doit contenir entre 3 et 20 caractères.';
                } else {
                    $crtl_firstname = $_POST['firstname'];
                }
            }
        }
        if (!empty($_POST['lastname'])) {
            if ($_POST['lastname'] !== $_SESSION['user']['lastname']) {
                if (!$lastname) {
                    $errors['lastname'] = 'Veuillez renseigner votre nom.';
                } elseif (strlen($lastname) <= 2 || strlen($lastname) >= 20) {
                    $errors['lastname'] = 'Votre nom doit contenir entre 3 et 20 caractères.';
                } else {
                    $crtl_lastname = $_POST['lastname'];
                }
            }
        }
        if (!empty($password) || !empty($passwordConfirm)) {
            if (!$password) {
                $errors['password'] = 'Veuillez renseigner votre mot de passe.';
            } elseif (strlen($password) <= 8 || strlen($password) >= 35) {
                $errors['password'] = 'Votre mot de passe doit contenir entre 8 et 35 caractères.';
            } elseif (!$profilModel->VerifyPassword($password, $id)) {
                $errors['password'] = 'Votre mot de passe doit contenir au moins 3 lettres minuscules, 2 lettres majuscules, 2 chiffres et 1 caractère spécial.';
            }
            if (!$passwordConfirm) {
                $errors['passwordConfirm'] = 'Veuillez confirmer votre mot de passe.';
            } elseif ($password !== $passwordConfirm) {
                $errors['passwordConfirm'] = 'Les deux mots de passe ne sont pas identiques.';
            }
        }

        if (!empty($errors)) {
            echo json_encode($errors);
        }

        if (empty($errors)) {
            if ($crtl_login !== null) {
                $profilModel->editInfoUser('login', $crtl_login, $id);
                $_SESSION['user']['login'] = $crtl_login;
                $success['success']['login'] = 'Votre nom d\'utilisateur a bien été modifié.';
            }
            if ($crtl_email !== null) {
                $profilModel->editInfoUser('email', $crtl_email, $id);
                $_SESSION['user']['email'] = $crtl_email;
                $success['success']['email'] = 'Votre adresse e-mail a bien été modifiée.';
            }
            if ($crtl_firstname !== null) {
                $profilModel->editInfoUser('firstname', $crtl_firstname, $id);
                $_SESSION['user']['firstname'] = $crtl_firstname;
                $success['success']['firstname'] = 'Votre prénom a bien été modifié.';
            }
            if ($crtl_lastname !== null) {
                $profilModel->editInfoUser('lastname', $crtl_lastname, $id);
                $_SESSION['user']['lastname'] = $crtl_lastname;
                $success['success']['lastname'] = 'Votre nom a bien été modifié.';
            }
            if ($crtl_bio !== null) {
                $profilModel->editInfoUser('bio', $crtl_bio, $id);
                $_SESSION['user']['bio'] = $crtl_bio;
                $success['success']['bio'] = 'Votre biographie a bien été modifiée.';
            }
            if (!empty($password) && !empty($passwordConfirm)) {
                if ($profilModel->VerifyPassword($password, $id)) {
                    $password = password_hash($password, PASSWORD_DEFAULT);
                    $profilModel->editInfoUser('password', $password, $id);
                    $success['success']['password'] = 'Votre mot de passe a bien été modifié.';
                } else {
                    $success['error_password'] = 'Votre mot de passe n\'a pas été modifié.';
                }
            }
            echo json_encode($success);
        }
    }
}

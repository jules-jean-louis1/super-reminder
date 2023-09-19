<?php

namespace App\Controller;

use App\Model\{AuthModel,
                User,
};


class AuthController extends AbstractClasses\AbstractContoller
{
    private AuthModel $authModel;
    public function __construct()
    {
        $this->authModel = new AuthModel();
    }
    public function ValidUsername(string $username): bool
    {
        if (strlen($username) < 3 || strlen($username) > 20) {
            return false;
        } else {
            return true;
        }
    }
    private function generateAvatarImage($text, $backgroundColor, string $username)
    {
        $canvasWidth = 200;
        $canvasHeight = 200;

        $canvas = imagecreatetruecolor($canvasWidth, $canvasHeight);

        // Convertir la couleur d'arrière-plan en composantes RGB
        $backgroundR = hexdec(substr($backgroundColor, 1, 2));
        $backgroundG = hexdec(substr($backgroundColor, 3, 2));
        $backgroundB = hexdec(substr($backgroundColor, 5, 2));

        // Remplir le canvas avec la couleur d'arrière-plan
        $backgroundColor = imagecolorallocate($canvas, $backgroundR, $backgroundG, $backgroundB);
        imagefill($canvas, 0, 0, $backgroundColor);

        // Définir la couleur du texte
        $foregroundColor = imagecolorallocate($canvas, 255, 255, 255); // Blanc

        // Centrer le texte dans le canvas
        $fontSize = floor(100.00);
        $fontPath = 'public/font/Rajdhani-SemiBold.ttf'; // Chemin vers le dossier des polices de caractères
        $textBoundingBox = imageftbbox($fontSize, 0, $fontPath, $text);
        $textWidth = $textBoundingBox[2] - $textBoundingBox[0];
        $textHeight = $textBoundingBox[1] - $textBoundingBox[7];
        $textX = ($canvasWidth - $textWidth) / 2;
        $textY = ($canvasHeight - $textHeight) / 2 + $textHeight;

        // Dessiner le texte sur le canvas avec la police de caractères par défaut
        imagefttext($canvas, $fontSize, 0, $textX, $textY, $foregroundColor, $fontPath, $text);

        // Enregistrer l'image dans un fichier PNG
        $randomString = bin2hex(random_bytes(3)); // Génère une chaîne hexadécimale de 6 caractères
        $avatarName = $randomString . '-' . $username.'.png';
        $filename = 'public/images/avatars/' . $avatarName; // Chemin vers le dossier et nom du fichier d'avatar
        imagepng($canvas, $filename);
        imagedestroy($canvas);

        return $avatarName;
    }
    public function register(): void
    {
        $login = $this->verifyField('login');
        $email = $this->verifyField('email');
        $firstname = $this->verifyField('firstname');
        $lastname = $this->verifyField('lastname');
        $password = $this->verifyField('password');
        $password_confirm = $this->verifyField('passwordConfirm');

        $errors = [];

        if (!$login){
            $errors['login'] = 'Veuillez indiquer votre Nom d\'utilisateur.';
        } elseif (!$this->ValidUsername($login)) {
            $errors['login'] = 'Le champ username doit contenir entre 3 et 20 caractères et ne doit pas contenir de caractères spéciaux';
        } elseif ($this->authModel->VerifyIfExist($login, 'login')) {
            $errors['login'] = 'Ce nom d\'utlisateur est déjà utilisé';
            $errors['useLogin'] = 'Ce nom d\'utlisateur est déjà utilisé';
        }
        if (!$email) {
            $errors['email'] = 'Veuillez indiquer votre adresse e-mail.';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Veuillez indiquer votre adresse e-mail valide.';
        } elseif ($this->authModel->VerifyIfExist($email, 'email')) {
            $errors['email'] = 'Cette email est déjà utilisé.';
            $errors['useEmail'] = 'Cette email est déjà utilisé.';
        }
        if (!$firstname) {
            $errors['firstname'] = 'Entrez votre prénom.';
        } elseif (strlen($firstname) <= 2 || strlen($firstname) >= 20) {
            $errors['firstname'] = 'Votre prénom doit contenir entre 3 et 20 caractères.';
        }
        if (!$lastname) {
            $errors['lastname'] = 'Entrez votre nom';
        } elseif (strlen($lastname) <= 2 || strlen($lastname) >= 20) {
            $errors['lastname'] = 'Votre nom doit contenir entre 3 et 20 caractères';
        }
        if (!$password) {
            $errors['password'] = 'Veuillez indiquer votre mot de passe.';
        } elseif (strlen($password) <= 8 || strlen($password) >= 35) {
            $errors['password'] = 'Votre mot de passe doit contenir entre 8 et 35 caractères';
        } elseif (!$this->VerifyPassword($password)) {
            $errors['password'] = 'Votre mot de passe doit contenir au moins 3 lettres minuscules, 2 lettres majuscules, 2 chiffres et 1 caractère spécial';
        }
        if (!$password_confirm) {
            $errors['passwordConfirm'] = 'Veuillez confirmer votre mot de passe.';
        } elseif ($password !== $password_confirm) {
            $errors['passwordConfirm'] = 'Le deux mot de passe ne sont pas identiques';
        }
        if (empty($errors)) {
            if ($this->authModel->VerifyIfExist($login, 'login')) {
                $errors['useLogin'] = 'Ce nom d\'utlisateur est déjà utilisé';
            } elseif ($this->authModel->VerifyIfExist($email, 'email')) {
                $errors['useEmail'] = 'Cette email est déjà utilisé';
            } else {
                // Nettoyer les données
                $login = $this->ValidFieldForm($login);
                $email = $this->ValidFieldForm($email);
                $firstname = $this->ValidFieldForm($firstname);
                $lastname = $this->ValidFieldForm($lastname);
                $password = $this->ValidFieldForm($password);
                $firstLetter = strtoupper(substr($firstname, 0, 1));
                $backgroundColor = sprintf('#%06X', mt_rand(0, 0xFFFFFF));
                $avatar = $this->generateAvatarImage($firstLetter, $backgroundColor, $login);
                // Ajouter l'utilisateur dans la base de données

                $this->authModel->register($login, $email, $firstname, $lastname, $password, $avatar);
                $errors['success'] = 'Votre compte a bien été créé';
            }
            echo json_encode($errors);

        } else {
            $json = json_encode($errors);
            echo $json;
        }
    }

    public function login()
    {
        $email = $this->verifyField('email');
        $password = $this->verifyField('password');
        $errors = [];

        if (!$email) {
            $errors['email'] = 'Le champ email est requis';
        }
        if (!$password) {
            $errors['password'] = 'Le champ password est requis';
        }
        if (empty($errors)) {
            $email = $this->ValidFieldForm($email);
            $password = $this->ValidFieldForm($password);
            $user = $this->authModel->login($email, $password);
            if (!empty($user)) {
                $errors['success'] = 'Vous êtes connecté';
                $_SESSION['user'] = [
                    'id' => $user['id'],
                    'login' => $user['login'],
                    'firstname' => $user['firstname'],
                    'lastname' => $user['lastname'],
                    'email' => $user['email'],
                    'avatar' => $user['avatar'],
                    'droits' => $user['droits']
                ];
            } else {
                $errors['error'] = 'Email ou mot de passe incorrect';
            }
            echo json_encode($errors);
        } else {
            $json = json_encode($errors);
            echo $json;
        }
    }
    public function logout()
    {
        session_destroy();
        header('Location: http://' . $_SERVER['HTTP_HOST'] . '/super-reminder/');
    }
}

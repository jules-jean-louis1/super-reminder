<?php

namespace App\Controller;

use App\Model\TagsModel;

class TagsController
{

    public function __construct()
    {

    }
    public function ValidFieldForm2($field): string
    {
        if (isset($_POST[$field]) && $_POST[$field] !== '') {
            return $_POST[$field];
        } else {
            return false;
        }
    }
    public function addTags(int $id): void
    {
        $tagsModel = new TagsModel();
        $tags = $tagsModel->verifyTags($id, $_POST['name']);

        $name = $this->ValidFieldForm2('name');
        $errors = [];

        if (!$name) {
            $errors['name'] = 'Veuillez entrer un nom';
        } else if (strlen($name) <= 2 || strlen($name) >= 60) {
            $errors['name'] = 'Le nom doit contenir entre 2 et 60 caractères';
        }
        if ($tags) {
            $errors['tags'] = 'Ce tag existe déjà';
        }
        if (empty($errors)) {
            if ($tagsModel->countTags($id)) {
                $errors['tags'] = 'Vous avez atteint le nombre maximum de tags';
            } else {
                $tagsModel->createTags($name);
                $errors['success'] = 'Le tag a bien été ajouté';
            }
        } else {
            $errors['error'] = 'Une erreur est survenue';
        }
        echo json_encode($errors);
    }

    public function getTags(int $id): void
    {
        $tagsModel = new TagsModel();
        $tags = $tagsModel->getTags($id);
        echo json_encode($tags);
    }

}
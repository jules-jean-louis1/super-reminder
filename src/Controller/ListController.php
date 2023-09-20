<?php

namespace App\Controller;
use \App\Model\ListModel;
class ListController extends AbstractClasses\AbstractContoller
{
    public function ValidFieldForm2($field): string
    {
        if (isset($_POST[$field]) && $_POST[$field] !== '') {
            return $_POST[$field];
        } else {
            return false;
        }
    }
    public function addList(int $userId)
    {
        $listModel = new ListModel();
        $name = $this->ValidFieldForm2('name');
        $errors = [];

        if (!$name) {
            $errors['error'] = 'Veuillez entrer un nom';
        } else if (strlen($name) <= 2 || strlen($name) >= 20) {
            $errors['error'] = 'Le nom doit contenir entre 2 et 20 caractères';
        }

        if (empty($errors)) {
            if ($_SESSION['user']['id'] !== $userId) {
                $errors['error'] = 'Vous n\'avez pas le droit de faire ça';
            }
            $checkNumberList = $listModel->checkNumberList($userId);
            if (!$checkNumberList) {
                $listModel->createList($name, $userId);
                $errors['success'] = 'Votre liste a bien été créée';
            } else {
                $errors['error'] = 'Vous avez atteint le nombre maximum de liste';
            }
        }
        echo json_encode($errors);
    }
    public function deleteList(int $id): void
    {
        $listModel = new ListModel();
        $list = $listModel->deleteList($id);
        $errors = [];

        if ($list) {
            $errors['success'] = 'Liste supprimé.';
        } else {
            $errors['error'] = 'Une erreur est survenu.';
        }
        echo json_encode($errors);
    }
    public function editList(int $id)
    {
        $listModel = new ListModel();
        $name = $this->ValidFieldForm('name');
        $errors = [];

        if (!empty($name)) {
            if (strlen($name) < 2 || strlen($name) > 20) {
                $errors['name'] = 'Le nom doit contenir entre 3 et 20 caractères';
            }
        } else {
            $errors['name'] = 'Veuillez entrer un nom';
        }
        if (empty($errors)){
            $listModel->editList($name, $id);
            $errors['success'] = 'Votre liste a bien été modifiée';
        }
        echo json_encode($errors);
    }
    public function getUserList($id)
    {
        $listModel = new ListModel();
        $list = $listModel->getUserList($id);
        echo json_encode($list);
    }
}
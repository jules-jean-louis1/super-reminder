<?php

namespace App\Controller;

use App\Model\TaskModel;

class TaskController
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

    public function addTask(int $id): void
    {
        $taskModel = new TaskModel();
        $title = $this->ValidFieldForm2('name');
        $description = $this->ValidFieldForm2('description');
        $date = $this->ValidFieldForm2('start');
        $end = $this->ValidFieldForm2('end');
        $list = $this->ValidFieldForm2('list');
        $errors = [];

        if (!$title) {
            $errors['error'] = 'Veuillez entrer un titre';
        } else if (strlen($title) <= 2 || strlen($title) >= 60) {
            $errors['error'] = 'Le titre doit contenir entre 2 et 60 caractères';
        }
        if (!$description) {
            $errors['error'] = 'Veuillez entrer une description';
        } else if (strlen($description) <= 2 || strlen($description) >= 300) {
            $errors['error'] = 'La description doit contenir entre 2 et 330 caractères';
        }
        if (!$date) {
            $errors['error'] = 'Veuillez entrer une date';
        }
        if (!$end) {
            $errors['error'] = 'Veuillez entrer une date de fin';
        }

        if(empty($erros)) {
            if ($_SESSION['user']['id'] !== $id) {
                $errors['error'] = 'Vous n\'avez pas le droit de faire ça';
            } else {
                if (!$list) {
                    $list = null;
                } else {
                    $list = intval($list);
                }
                $taskModel->createTask($title, $description, $date, $end, $list, $id);
                $errors['success'] = 'Votre tâche a bien été créée';
            }
        }
        echo json_encode($errors);
    }

}
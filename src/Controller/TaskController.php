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
        $name = $this->ValidFieldForm2('name');
        $description = $this->ValidFieldForm2('description');
        $list = $this->ValidFieldForm2('list');
        $status = $_POST['status'];
        $errors = [];

        if (!$name) {
            $errors['name'] = 'Veuillez entrer un titre';
        } else if (strlen($name) <= 2 || strlen($name) >= 60) {
            $errors['name'] = 'Le titre doit contenir entre 2 et 60 caractères';
        }
        if (!$description) {
            $errors['description'] = 'Veuillez entrer une description';
        } else if (strlen($description) <= 2 || strlen($description) >= 300) {
            $errors['description'] = 'La description doit contenir entre 2 et 330 caractères';
        }

        if(empty($erros)) {
            if ($_SESSION['user']['id'] !== $id) {
                $errors['right'] = 'Vous n\'avez pas le droit de faire ça';
            } else {
                if (!$list) {
                    $list = null;
                } else {
                    $list = intval($list);
                }
                if ($status === '0') {
                    $status = 'todo';
                } else if ($status === '1') {
                    $status = 'inprogress';
                } else if ($status === '2') {
                    $status = 'done';
                }
                if (isset($_POST['start'])) {
                    $start = date('Y-m-d', strtotime($_POST['start']));
                    if ($start === '1970-01-01') {
                        $errors['start'] = 'Veuillez entrer une date valide';
                    }
                } else {
                    $start = null;
                }
                if (isset($_POST['end'])) {
                    $end = date('Y-m-d', strtotime($_POST['end']));
                    if ($end === '1970-01-01') {
                        $errors['end'] = 'Veuillez entrer une date valide';
                    }
                } else {
                    $end = null;
                }
                if (isset($_POST['start']) && isset($_POST['end'])) {
                    if ($start > $end) {
                        $errors['date'] = 'La date de début ne peut pas être supérieur à la date de fin';
                    }
                }
                if (isset($_POST['priority'])) {
                    $priority = $_POST['priority'];
                } else {
                    $priority = null;
                }
                if (empty($errors)) {
                    //var_dump($status);
                    $taskModel->createTask($name, $description, $start, $end, $status, $list, $id, $priority);
                    $errors['success'] = 'Votre tâche a bien été créée';
                }
            }
        }
        echo json_encode($errors);
    }

}
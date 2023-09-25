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

        if ($_SESSION['user']['id'] !== $id) {
            $errors['right'] = 'Vous n\'avez pas le droit de faire ça';
        }
        if (!$name) {
            $errors['name'] = 'Veuillez entrer un titre';
        } else if (strlen($name) <= 2 || strlen($name) >= 60) {
            $errors['name'] = 'Le titre doit contenir entre 2 et 60 caractères';
        }

        if(empty($erros)) {
            if ($_SESSION['user']['id'] !== $id) {
                $errors['right'] = 'Vous n\'avez pas le droit de faire ça';
            } else {
                if (!$description) {
                    $description = null;
                } else {
                    $description = htmlspecialchars($description);
                }
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

    public function searchTask(int $id)
    {
        $search = $_POST['autocompletion'];
        $list = $_POST['list'];
        $date = $_POST['date'];
        $status = $_POST['status'];
        $priority = $_POST['priority'];


        $taskModel = new TaskModel();
        $searchResult = $taskModel->searchTask($search, $list, $date, $status, $priority, $id);
        if (!empty($searchResult)) {
            echo json_encode($searchResult);
        } else {
            echo json_encode(false);
        }
    }

    /**
     * Récupère la tâche qui doit être édité est comparé les données envoyé pour la maj si nécessaire
     * @param int $id
     * @return void
     */
    public function editTask(int $id)
    {
    }

    public function changeStatus(int $id, string $status): void
    {
        $taskModel = new TaskModel();
        $task = $taskModel->getTaskById($id);
        $errors = [];
        if ($id !== $_SESSION['user']['id']) {
            $errors['error'] = 'Vous n\'avez pas le droit de faire ça';
        } else {
            if ($status === 'todo') {
                $taskModel->changeStatus($id, 'todo');
                $errors['success'] = 'La tâche a bien été mise en attente.';
            } else if ($status === 'inprogress') {
                $taskModel->changeStatus($id, 'inprogress');
                $errors['success'] = 'La tâche a bien été mise en cours.';
            } else if ($status === 'done') {
                $taskModel->changeStatus($id, 'done');
                $errors['success'] = 'La tâche a bien été terminé.';
            }
        }
        echo json_encode($errors);
    }

    public function getUserTask(int $id, int $id_task): void
    {
        $taskModel = new TaskModel();
        $user = $taskModel->getAllUser($id);

        $userTask = $taskModel->getUserTask($id_task);

        if (empty($userTask)) {
            $data = [
                'user' => $user,
                'userTask' => false
            ];
        } else {
            $data = [
                'user' => $user,
                'userTask' => $userTask
            ];
        }
        echo json_encode($data);
    }

    public function addUserToTask(int $id): void
    {
        $task_id = $_POST['task_id'];
        $taskModel = new TaskModel();

        $taskUsers = $taskModel->getUserTaskReturn($task_id);
        $errors = [];

        $usersToAdd = array_diff($_POST['users'], $taskUsers);
        $usersToRemove = array_diff($taskUsers, $_POST['users']);

        if ($_SESSION['user']['id'] !== $id) {
            $errors['right'] = 'Vous n\'avez pas le droit de faire ça.';
        } else {
            foreach ($usersToAdd as $user) {
                $taskModel->addUserToTask($task_id, $user);
            }
            foreach ($usersToRemove as $user) {
                $taskModel->removeUserToTask($task_id, $user);
            }
            $errors['success'] = 'Modification effectuée.';
        }
        $errors = json_encode($errors);

        echo $errors;

    }
    public function deleteTask(int $id)
    {
        $taskModel = new TaskModel();
        $task = $taskModel->getTaskById($id);
        $errors = [];

        if ($task['users_id'] !== $_SESSION['user']['id']) {
            $errors['error'] = 'Vous n\'avez pas le droit de faire ça';
        } else {
            $taskModel->deleteTask($id);
            $errors['success'] = 'La tâche a bien été supprimé';
        }
        echo json_encode($errors);
    }
}
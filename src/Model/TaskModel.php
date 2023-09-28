<?php

namespace App\Model;
use PDO;
class TaskModel extends AbstractDatabase
{

    public function createTask(string $name, ?string $description, ?string $start, ?string $end, string $status, ?int $list, int $id, ?int $priority): void
    {
        $bdd = $this->getBdd();
        $sql = 'INSERT INTO task (name, description, status, start, end, priority, created_at, users_id, list_id) 
                VALUES (:name, :description, :status, :start, :end, :priority, NOW(), :users_id, :list_id)';
        $req = $bdd->prepare($sql);
        $req->bindParam(':name', $name, PDO::PARAM_STR);
        $req->bindParam(':description', $description, PDO::PARAM_STR);
        $req->bindParam(':status', $status, PDO::PARAM_STR);
        $req->bindParam(':start', $start, PDO::PARAM_STR);
        $req->bindParam(':end', $end, PDO::PARAM_STR);
        $req->bindParam(':priority', $priority, PDO::PARAM_INT);
        $req->bindParam(':users_id', $id, PDO::PARAM_INT);
        $req->bindParam(':list_id', $list, PDO::PARAM_INT);
        $req->execute();
    }

    public function searchTask(string $search, mixed $list, mixed $date, mixed $status, mixed $priority, int $id)
    {
        $bdd = $this->getBdd();
        $sql = "SELECT task.id AS task_id, task.name AS task_name, task.description, task.status, task.start, task.end, task.priority, task.created_at AS task_created_at, task.updated_at AS task_updated_at, task.users_id AS task_users_id, task.list_id, 
                IFNULL(list.name, 'Aucune liste') AS list_name FROM task LEFT JOIN list ON task.list_id = list.id WHERE task.users_id = :id";

        if ($search !== '') {
            $sql .= ' AND task.name LIKE :search';
        }
        if ($list !== 'all') {
            $sql .= ' AND list.id = :list';
        }
        if ($date !== 'all') {
            if ($date === 'today') {
                $sql .= ' AND DATE(start) = CURDATE()';
            } else if ($date === 'tomorrow') {
                $sql .= ' AND DATE(start) = CURDATE() + INTERVAL 1 DAY';
            } else if ($date === 'week') {
                $sql .= ' AND WEEK(start) = WEEK(CURDATE())';
            } else if ($date === 'month') {
                $sql .= ' AND MONTH(start) = MONTH(CURDATE())';
            } else if ($date === 'year') {
                $sql .= ' AND YEAR(start) = YEAR(CURDATE())';
            }
        }
        if ($status !== 'all') {
            $sql .= ' AND task.status = :status';
        }
        if ($priority !== 'all') {
            $sql .= ' AND task.priority = :priority';
        }
        $req = $bdd->prepare($sql);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        if ($search !== '') {
            $req->bindValue(':search', '%' . $search . '%', PDO::PARAM_STR);
        }
        if ($list !== 'all') {
            $req->bindParam(':list', $list, PDO::PARAM_INT);
        }
        if ($status !== 'all') {
            $req->bindParam(':status', $status, PDO::PARAM_STR);
        }
        if ($priority !== 'all') {
            $req->bindParam(':priority', $priority, PDO::PARAM_INT);
        }
        $req->execute();
        $task = $req->fetchAll(PDO::FETCH_ASSOC);
        return $task;
    }

    public function changeStatus(int $id, string $string): void
    {
        $bdd = $this->getBdd();
        $sql = 'UPDATE task SET status = :status WHERE id = :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':status', $string, PDO::PARAM_STR);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
    }

    public function getAllUser(int $id): false|array
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT id, login, firstname, lastname, email, avatar FROM users WHERE id != :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
        $user = $req->fetchAll(PDO::FETCH_ASSOC);
        return $user;
    }

    public function getUserTask(int $task_id): array
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT u.id, u.login, u.avatar, u.email FROM users AS u JOIN task_users AS tu ON u.id = tu.users_id WHERE tu.task_id = :task';
        $req = $bdd->prepare($sql);
        $req->bindParam(':task', $task_id, PDO::PARAM_INT);
        $req->execute();
        $task = $req->fetchAll(PDO::FETCH_ASSOC);
        return $task;
    }
    public function getUserTaskReturn(int $task_id): array
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT u.id FROM users AS u JOIN task_users AS tu ON u.id = tu.users_id WHERE tu.task_id = :task';
        $req = $bdd->prepare($sql);
        $req->bindParam(':task', $task_id, PDO::PARAM_INT);
        $req->execute();
        $task = $req->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($task); $i++) {
            $task[$i] = $task[$i]['id'];
        }
        return $task;
    }
    public function getTaskById(int $id)
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT * FROM task WHERE id = :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
        $task = $req->fetch(PDO::FETCH_ASSOC);
        return $task;
    }

    public function addUserToTask(int $task_id, int $user): void
    {
        $bdd = $this->getBdd();
        $sql = 'INSERT INTO task_users (task_id, users_id, created_at) VALUES (:task_id, :user, NOW())';
        $req = $bdd->prepare($sql);
        $req->bindParam(':task_id', $task_id, PDO::PARAM_INT);
        $req->bindParam(':user', $user, PDO::PARAM_INT);
        $req->execute();
    }

    public function removeUserToTask(int $task_id, int $user): void
    {
        $bdd = $this->getBdd();
        $sql = 'DELETE FROM task_users WHERE task_id = :task_id AND users_id = :user';
        $req = $bdd->prepare($sql);
        $req->bindParam(':task_id', $task_id, PDO::PARAM_INT);
        $req->bindParam(':user', $user, PDO::PARAM_INT);
        $req->execute();
    }

    public function deleteTask(int $id): void
    {
        $bdd = $this->getBdd();
        $sql = 'DELETE FROM task WHERE id = :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();

        $sql2 = 'DELETE FROM task_users WHERE task_id = :id';
        $req2 = $bdd->prepare($sql2);
        $req2->bindParam(':id', $id, PDO::PARAM_INT);
        $req2->execute();

        $sql3 = 'DELETE FROM tags_list WHERE task_id = :id';
        $req3 = $bdd->prepare($sql3);
        $req3->bindParam(':id', $id, PDO::PARAM_INT);
        $req3->execute();
    }

    public function editTask(int $id, string $string, string $name): void
    {
        $bdd = $this->getBdd();
        $sql = 'UPDATE task SET ' . $string . ' = :name WHERE id = :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':name', $name, PDO::PARAM_STR);
        $req->bindParam(':id', $id, PDO::PARAM_INT);
        $req->execute();
    }
    public function getShareTask(int $id): array
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT
                task.id AS task_id,
                task.name AS task_name,
                task.description AS task_description,
                task.status AS task_status,
                task.start AS task_start,
                task.end AS task_end,
                task.priority AS task_priority,
                task.created_at AS task_created_at,
                task.updated_at AS task_updated_at,
                users.login AS user_login,
                users.avatar AS user_avatar
                FROM task JOIN users ON task.users_id = users.id
                WHERE
                task.id IN (SELECT task_id FROM task_users WHERE users_id = :user_id)';
        $req = $bdd->prepare($sql);
        $req->bindParam(':user_id', $id, PDO::PARAM_INT);
        $req->execute();
        $task = $req->fetchAll(PDO::FETCH_ASSOC);
        return $task;
    }
    public function addTagToTask(int $task_id, int $tag_id): void
    {
        $bdd = $this->getBdd();
        $sql = 'INSERT INTO tags_list (task_id, tags_id) VALUES (:task_id, :tag_id)';
        $req = $bdd->prepare($sql);
        $req->bindParam(':task_id', $task_id, PDO::PARAM_INT);
        $req->bindParam(':tag_id', $tag_id, PDO::PARAM_INT);
        $req->execute();
    }

    public function getTaskId(string $name, int $id): mixed
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT id FROM task WHERE name = :name AND users_id = :users_id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':name', $name, PDO::PARAM_STR);
        $req->bindParam(':users_id', $id, PDO::PARAM_INT);
        $req->execute();
        return $req->fetch(PDO::FETCH_ASSOC);
    }
    public function getTagsById(string $name, int $id_users)
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT id FROM tags WHERE name = :name AND users_id = :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':name', $name, PDO::PARAM_STR);
        $req->bindParam(':id', $id_users, PDO::PARAM_INT);
        $req->execute();
        return $req->fetch(PDO::FETCH_ASSOC);
    }
}
<?php

namespace App\Model;
use PDO;
class TaskModel extends AbstractDatabase
{

    public function createTask(string $name, string $description, ?string $start, ?string $end, string $status, ?int $list, int $id, ?int $priority): void
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
        $sql = 'SELECT * FROM task WHERE users_id = :id';

        if ($search !== '') {
            $sql .= ' AND name LIKE :search';
        }
        if ($list !== 'all') {
            $sql .= ' AND list_id = :list';
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
            $sql .= ' AND status = :status';
        }
        if ($priority !== 'all') {
            $sql .= ' AND priority = :priority';
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
}
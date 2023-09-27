<?php

namespace App\Model;
use PDO;
class profilModel extends AbstractDatabase
{
    public function getUserInfo(int $id)
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT login, email, firstname, lastname, droits, created_at, updated_at FROM users WHERE id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        $user = $req->fetchAll(\PDO::FETCH_ASSOC);
        return $user;
    }
    public function VerifyIfExist(string $field, string $nameOfField): bool
    {
        $bdd = $this->getBdd();
        $sql = 'SELECT id FROM users WHERE ' . $nameOfField . ' = :field_value';
        $req = $bdd->prepare($sql);
        $req->bindParam(':field_value', $field, PDO::PARAM_STR);
        $req->execute();
        $user = $req->fetch();
        if ($user) {
            return true;
        } else {
            return false;
        }
    }
    public function editInfoUser(string $field, string $value, int $id)
    {
        $bdd = $this->getBdd();
        $sql = 'UPDATE users SET ' . $field . ' = :value, updated_at = NOW() WHERE id = :id';
        $req = $bdd->prepare($sql);
        $req->bindParam(':value', $value, \PDO::PARAM_STR);
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
    }
    public function VerifyPassword(string $password, int $id): bool
    {
        $bdd = $this->getBdd();
        $req = $bdd->prepare('SELECT password FROM users WHERE id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
        $user = $req->fetch();
        if (password_verify($password, $user['password'])) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteUser(int $id): void
    {
        $bdd = $this->getBdd();
        $sql1 = 'ALTER TABLE list
        ADD CONSTRAINT fk_users_id
        FOREIGN KEY (users_id)
        REFERENCES user(id)
        ON DELETE CASCADE;';
        $sql2 = 'ALTER TABLE task
        ADD CONSTRAINT fk_users_id
        FOREIGN KEY (users_id)
        REFERENCES user(id)
        ON DELETE CASCADE;';
        $sql3 = 'ALTER TABLE task
        ADD CONSTRAINT fk_list_id
        FOREIGN KEY (list_id)
        REFERENCES list(id)
        ON DELETE CASCADE;';
        $sql4 = 'ALTER TABLE tags_list
        ADD CONSTRAINT fk_task_id
        FOREIGN KEY (task_id)
        REFERENCES task(id)
        ON DELETE CASCADE;';
        $sql5 = 'ALTER TABLE tags_list
        ADD CONSTRAINT fk_tags_id
        FOREIGN KEY (tags_id)
        REFERENCES tags(id)
        ON DELETE CASCADE;';

        $req1 = $bdd->prepare($sql1);
        $req2 = $bdd->prepare($sql2);
        $req3 = $bdd->prepare($sql3);
        $req4 = $bdd->prepare($sql4);
        $req5 = $bdd->prepare($sql5);
        $req1->execute();
        $req2->execute();
        $req3->execute();
        $req4->execute();
        $req5->execute();
        $req = $bdd->prepare('DELETE FROM users WHERE id = :id');
        $req->bindParam(':id', $id, \PDO::PARAM_INT);
        $req->execute();
    }
}
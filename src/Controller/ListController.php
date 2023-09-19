<?php

namespace App\Controller;
use \App\Model\ListModel;
class ListController
{
    public function getUserList($id)
    {
        $listModel = new ListModel();
        $list = $listModel->getUserList($id);
        echo json_encode($list);
    }
}
<?php

namespace App\Managers;

class UserManager {
    
    private $db;
    
    public function __construct($db){
        $this->db = $db;
    }
    
    public function findById($id) {
        return $this->db->query("SELECT * FROM users WHERE id = ?", [$id])->fetch();
    }

    
}
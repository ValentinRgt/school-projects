<?php

namespace App\Managers;

class ProductManager {
    
    private $db;
    
    public function __construct($db){
        $this->db = $db;
    }
    
    public function findById($id) {
        return $this->db->query("SELECT * FROM products WHERE id = ?", [$id])->fetch();
    }
    
    public function findAll() {
        return $this->db->query("SELECT * FROM products")->fetchAll();
    }
    
    
}
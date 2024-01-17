<?php

namespace App\Managers;
use App\Models\Basket;

class PurchaseManager {
    
    private $db;
    
    public function __construct($db){
        $this->db = $db;
    }
    
    public function findById($id, $product_id) {
        return $this->db->query("SELECT * FROM purchases WHERE user_id = ?", [$id, $product_id])->fetch();
    }
    
    public function findAll($user_id) {
        return $this->db->query("SELECT * FROM purchases WHERE user_id = ?", [$user_id])->fetchAll();
    }
    
    public function insert($user_id, $product_id, $quantity, $price) {
        $this->db->query("INSERT INTO purchases SET user_id = ?, product_id = ?, quantity = ?, price = ?, purchase_at = NOW()", [$user_id, $product_id, $quantity, $price]);
    }
    
    public function delete($user_id, $id) {
        $this->db->query(" DELETE FROM purchases WHERE user_id = ? AND id = ?", [$user_id, $id]);
    }
    
    
}
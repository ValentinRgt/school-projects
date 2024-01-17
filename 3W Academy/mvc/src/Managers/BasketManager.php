<?php

namespace App\Managers;
use App\Models\Basket;

class BasketManager {
    
    private $db;
    
    public function __construct($db){
        $this->db = $db;
    }
    
    public function findById($id, $product_id) {
        $basketData = $this->db->query("SELECT * FROM basket WHERE user_id = ? AND product_id = ?", [$id, $product_id])->fetch();
        if($basketData == true){
            $basket = new Basket();
            $basket->setId($basketData->id);
            $basket->setUserId($basketData->user_id);
            $basket->setProduct($basketData->product_id);
            $basket->setQuantity($basketData->quantity);
            return $basket;
        }
        return false;
    }
    
    public function findAll($user_id) {
        return $this->db->query("SELECT * FROM basket WHERE user_id = ?", [$user_id])->fetchAll();
    }
    
    public function update($id, $product_id, $quantity) {
        $this->db->query("UPDATE basket SET quantity = ? WHERE id = ? AND product_id = ?", [$quantity, $id, $product_id]);
    }
    
    public function updateQuantity($user_id, $product_id, $quantity) {
        $this->db->query("UPDATE basket SET quantity = ? WHERE user_id = ? AND id = ?", [$quantity, $user_id, $product_id]);
    }
    
    public function insert($user_id, $product_id) {
        $this->db->query("INSERT INTO basket SET user_id = ?, product_id = ?, quantity = 1", [$user_id, $product_id]);
    }
    
    public function delete($user_id, $id) {
        $this->db->query("DELETE FROM basket WHERE id = ? AND user_id = ?", [$id, $user_id]);
    }
    
    
}
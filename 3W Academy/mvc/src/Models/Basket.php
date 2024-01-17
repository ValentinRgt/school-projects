<?php

namespace App\Models;

class Basket {
    protected $id;
    protected $user_id;
    protected $product_id;
    protected $quantity;

    public function setId($id) { $this->id = $id; }
    public function setUserId($user_id) { $this->user_id = $user_id; }
    public function setProduct($product_id) { $this->product_id = $product_id; }
    public function setQuantity($quantity) { $this->quantity = $quantity; }
    
    public function getId() { return $this->id; }
    public function getUserId() { return $this->user_id; }
    public function getProduct() { return $this->product_id; }
    public function getQuantity() { return $this->quantity; }
    
}
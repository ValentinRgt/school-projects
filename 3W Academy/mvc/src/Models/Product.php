<?php

namespace App\Models;

class Product {
    private $id;
    private $name;
    private $price;
    private $description;
    private $image;
    private $stock;
    
    public function setId($id):int { $this->id = $id; }
    public function setName($name):string { $this->name = $name; }
    public function setPrice($price):int { $this->price = $price; }
    public function setDescription($description):string { $this->description = $description; }
    public function setImage($image):string { $this->image = $image; }
    public function setStock($stock):int { $this->stock = $stock; }
    
    public function getId():int { return $this->id; }
    public function getName():string { return $this->name; }
    public function getPrice():int { return $this->price; }
    public function getDescription():string { return $this->description; }
    public function getImage():string { return $this->image; }
    public function getStock():int { return $this->stock; }
    
}
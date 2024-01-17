<?php

namespace App\Controllers;

use App\Abstracts\AbstractController;
use App\Managers\ProductManager;
use App\Managers\DBManager;

class HomeController {
    
    private $_db;
    
    public function __construct(){
        $this->_db = new DBManager();
    }

    public function index() {
        $productManager = new ProductManager($this->_db);
        return AbstractController::renderer("home", ["products" => $productManager->findAll(3)]);
    }
    
    public function error404() {
        return AbstractController::renderer("error404");
    }
    
}
<?php

namespace App\Controllers;

use App\Abstracts\AbstractController;
use App\Managers\ProductManager;
use App\Managers\BasketManager;
use App\Managers\DBManager;

class ProductController {
    private $_db;
    
    public function __construct(){
        $this->_db = new DBManager();
    }
    
	public function index(){
		$productManager = new ProductManager($this->_db);
        return AbstractController::renderer("products/index", ["products" => $productManager->findAll(5)]);
	}
	
	public function show($id){
		$productManager = new ProductManager($this->_db);

	    if(!empty($_POST)){
	    	$basketManager = new BasketManager($this->_db);
	        $basket = $basketManager->findById(AbstractController::getModule("auth")->get_session(), $_POST["product_id"]);
	        if($basket == true){
	        	$newQuantity = $basket->getQuantity() + 1;
	            $basketManager->update($basket->getId(), $basket->getProduct(), $newQuantity);
	        } else {
	        	$basketManager->insert(AbstractController::getModule("auth")->get_session(), $_POST["product_id"]);
	        }
		}
		
        return AbstractController::renderer("products/show", ["product" => $productManager->findById($id)]);
	}
	
}
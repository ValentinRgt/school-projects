<?php

namespace App\Controllers;

use App\Abstracts\AbstractController;
use App\Managers\UserManager;
use App\Managers\ProductManager;
use App\Managers\PurchaseManager;
use App\Managers\DBManager;

class UserController {
    private $_db;
    
    public function __construct(){
        $this->_db = new DBManager();
    }
    
	public function settings(){
		if(!AbstractController::getModule("auth")->get_session()){
			return AbstractController::redirect("login");
		}else{
			$userManager = new UserManager($this->_db);
		    return AbstractController::renderer("customer/settings", ["user" => $userManager->findById(AbstractController::getModule("auth")->get_session())]);
		}
	}
	
	public function purchases(){
		if(!AbstractController::getModule("auth")->get_session()){
			return AbstractController::redirect("login");
		}else{
			$purchaseManager = new PurchaseManager($this->_db);
			$products = [];
			
			foreach($purchaseManager->findAll(AbstractController::getModule("auth")->get_session()) as $row){
				$productManager = new ProductManager($this->_db);
			    $product = $productManager->findById($row->product_id);
			    array_push($products, array("id" => $product->id, "name" => $product->name, "image" => $product->image, "price" => $row->price, "quantity" => $row->quantity, "purchase_at" => $row->purchase_at));
			}
			
			
		    return AbstractController::renderer("customer/purchases", ["purchases" => $products]);
		}
	}
	
}
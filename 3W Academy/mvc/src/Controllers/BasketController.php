<?php

namespace App\Controllers;

use App\Abstracts\AbstractController;
use App\Managers\BasketManager;
use App\Managers\ProductManager;
use App\Managers\PurchaseManager;
use App\Managers\DBManager;

class BasketController {
    private $_db;
    
    public function __construct(){
        $this->_db = new DBManager();
    }
    
	public function index(){
		$basketManager = new BasketManager($this->_db);
		
		if(isset($_POST["more"])){
			$quantity = $_POST["quantity"] + 1;
			$basketManager->updateQuantity(AbstractController::getModule("auth")->get_session(), $_POST["product_id"], $quantity);
		}
		if(isset($_POST["less"])){
			$quantity = $_POST["quantity"] - 1;
			if($quantity == 0) {
				$basketManager->delete(AbstractController::getModule("auth")->get_session(), $_POST["product_id"]);
			}else{
				$basketManager->updateQuantity(AbstractController::getModule("auth")->get_session(), $_POST["product_id"], $quantity);
			}
		}
		
		if(isset($_POST["pay"])){
			foreach($basketManager->findAll(AbstractController::getModule("auth")->get_session()) as $row){
				$productManager = new ProductManager($this->_db);
		    	$product = $productManager->findById($row->id);
		    	
				$purchaseManager = new PurchaseManager($this->_db);
				$purchaseManager->insert(AbstractController::getModule("auth")->get_session(), $row->product_id, $row->quantity, $product->price);
				
				$basketManager->delete(AbstractController::getModule("auth")->get_session(), $row->id);
			}
		}
		
		$products = [];
		$totalPrice = 0;
		
		foreach($basketManager->findAll(AbstractController::getModule("auth")->get_session()) as $row){
		    $productManager = new ProductManager($this->_db);
		    $product = $productManager->findById($row->id);
		    array_push($products, array("id" => $product->id, "name" => $product->name, "image" => $product->image, "price" => $product->price, "quantity" => $row->quantity));
		    $totalPrice += $product->price * $row->quantity;
		}
		
		$totalPriceVAT = $totalPrice * (1+20/100);
		$totalVAT = $totalPriceVAT-$totalPrice;
		
        return AbstractController::renderer("basket", ["baskets" => $products, "totalPrice" => $totalPrice, "totalVAT" => $totalVAT, "totalPriceVAT" => $totalPriceVAT]);
	}
	
}
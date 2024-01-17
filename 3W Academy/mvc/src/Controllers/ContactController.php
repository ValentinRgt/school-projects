<?php

namespace App\Controllers;

use App\Abstracts\AbstractController;

class ContactController {

    public function index() {
        if(!empty($_POST)){
            
            if(!empty($_POST["firstname"]) && !empty($_POST["lastname"]) && !empty($_POST["email"]) && !empty($_POST["message"])){
                AbstractController::setFlashMessage("success", "Your message has been sent");
            }else{
		        AbstractController::setFlashMessage("danger", "Please complete the fields correctly");
            }
		    
		    return AbstractController::redirect("contact");
		}
		
        return AbstractController::renderer("contact");
    }
    
}
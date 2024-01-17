<?php

namespace App\Controllers;

use App\Abstracts\AbstractController;
use App\Managers\DBManager;

class AuthController {
    private $_db;
    
    public function __construct(){
        $this->_db = new DBManager();
    }
    
    static function setCookie($name, $data, $time, $directory, $domain, $secure, $httponly){
        return setcookie($name, $data, $time, $directory, $domain, $secure, $httponly);
    }
    
    static function encrypt_password($password){
        return password_hash($password, PASSWORD_BCRYPT);
    }

    
    public function get_session(){
		if(isset($_COOKIE['user_id']) && !empty($_COOKIE['user_id'])){
		    return $_COOKIE['user_id'];
		}else{
		    return false;
		}
	}
	
	public function login(){
		if(!AbstractController::getModule("auth")->get_session()){
			if(!empty($_POST)){
				$user = $this->_db->query("SELECT * FROM users WHERE email = ?", [$_POST["email"]])->fetch();
		        if($user == true){
		            if (password_verify($_POST["password"], $user->password)) {
		                self::setCookie("user_id", $user->id, time() + 3600*24, "/", $_SERVER["HTTP_HOST"], true, true);
		                return AbstractController::redirect("home");
		            }else{
		                AbstractController::setFlashMessage("danger", "Username or password is not correct");
		            }
		        }
		        return null;
				
			}
			
			return AbstractController::renderer("login");
		}else{
			return AbstractController::redirect("home");
		}
	}
	
	public function register(){
		if(!AbstractController::getModule("auth")->get_session()){
			if(!empty($_POST)){
				$this->_db->query("INSERT INTO users SET firstname = ?, lastname = ?, email = ?, password = ?, address = ?, postalCode = ?, phone = ?, isAdmin = 0", [$_POST["firstname"], $_POST["lastname"], $_POST["email"], self::encrypt_password($_POST["password"]), $_POST["address"], $_POST["postalCode"], $_POST["phone"]])->fetch();
				$user = $this->_db->query("SELECT * FROM users WHERE email = ?", [$_POST["email"]])->fetch();
		        if($user == true){
		            if (password_verify($_POST["password"], $user->password)) {
		                self::setCookie("user_id", $user->id, time() + 3600*24, "/", $_SERVER["HTTP_HOST"], true, true);
		                return AbstractController::redirect("home");
		            }else{
		                AbstractController::setFlashMessage("danger", "Invalid champ");
		            }
		        }
		        return null;
				
			}
			
			return AbstractController::renderer("register");
		}else{
			return AbstractController::redirect("home");
		}
	}
	
	public function logout() {
	    if(AbstractController::getModule("auth")->get_session()){
    	    unset($_COOKIE['user_id']);
    	    self::setCookie("user_id", "", -1, "/", $_SERVER["HTTP_HOST"], true, true);
	        return AbstractController::redirect("home");
	    } else {
	        AbstractController::setFlashMessage("info", "You are not log in");
	        return AbstractController::redirect("home");
	    }
	}

}
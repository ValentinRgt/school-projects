<?php

namespace App\Abstracts;

use App\Controllers\AuthController;

class AbstractController {
    
    private static $dataa;
    
    public function addModule($name, $data = null) {
        self::$dataa[$name] = $data;
    }
    
    public static function getModule($param) {
        return self::$dataa[$param];
    }
    
    public static function setFlashMessage($type, $message){
        AuthController::setCookie("flashMessage", json_encode(array("type" => $type, "message" => $message)), time() + 3600*24, "/", $_SERVER["HTTP_HOST"], true, true);
    }
    
    public static function getFlashMessage(){
        if(isset($_COOKIE["flashMessage"])){
            $json_data = json_decode($_COOKIE["flashMessage"]);
            return array("type" => $json_data->type, "message" => $json_data->message);
        }
        return null;
    }
    
    public static function resetFlashMessage(){
        AuthController::setCookie("flashMessage", "", -1, "/", $_SERVER["HTTP_HOST"], true, true);
    }
    
    public static function renderer($page, $data = null) {
        $data['date'] = date("d/m/Y");
        $data["modules"] = self::$dataa;
        if(isset($_COOKIE["flashMessage"])) { $data["flashMessage"] = self::getFlashMessage(); }
        extract($data);
        
        self::resetFlashMessage();
        
        $template = $page.".phtml";
        require "../src/views/layout.phtml";
    }
    
    public static function redirect($uri) {
        return header("Location: https://valentinragot.sites.3wa.io/php_avance/mvc/".$uri);
        self::resetFlashMessage();
    }
    
}
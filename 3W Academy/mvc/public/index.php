<?php

require "../vendor/autoload.php";

$abstractController = new \App\Abstracts\AbstractController();
$_auth = new \App\Controllers\AuthController();
$abstractController->addModule("auth", $_auth);

$_session = $_auth->get_session();
if(!empty($_session)){
  	$_me = new \App\Controllers\UserController($_session);
  	$abstractController->addModule("user", $_me);
}

$router = new \Bramus\Router\Router();

$router->setBasePath("/php_avance/mvc");
$router->setNamespace('\App\Controllers');

$router->get("/", "HomeController@index");

$router->get("/home", "HomeController@index");

$router->get("/products", "ProductController@index");
$router->get("/product/([0-9]+)", "ProductController@show");
$router->post("/product/([0-9]+)", "ProductController@show");

$router->get("/contact", "ContactController@index");
$router->post("/contact", "ContactController@index");

$router->get("/basket", "BasketController@index");
$router->post("/basket", "BasketController@index");

$router->get("/login", "AuthController@login");
$router->post("/login", "AuthController@login");

$router->get("/register", "AuthController@register");

$router->get("/logout", "AuthController@logout");

$router->get("/settings", "UserController@settings");

$router->get("/purchases", "UserController@purchases");

$router->set404("HomeController@error404");
$router->run();

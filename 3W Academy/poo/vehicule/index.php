<?php

require "init.php";

$Cars = new Cars("Pierre", "DUPONT", "Berline", "Audi", "A4", "Gris", "Diesel", "140", "auto", "6");

print_r("Vehicule Owner : ".$Cars->getFirstname()." ".$Cars->getLastname()."<br>");

print_r($Cars->started()."<br>");

print_r($Cars->setReverse()."<br>");
print_r($Cars->setNeutral()."<br>");

print_r($Cars->driveUp()."<br>");
print_r($Cars->driveUp()."<br>");
print_r($Cars->driveUp()."<br>");
print_r($Cars->driveUp()."<br>");
print_r($Cars->driveUp()."<br>");
print_r($Cars->driveUp()."<br>");


print_r($Cars->driveDown()."<br>");

print_r($Cars->stopped()."<br>");

$Cars->setFirstname("Jean-Michel");
$Cars->setLastname("DUPUIS");

print_r("New Owner of Vehicule : ".$Cars->getFirstname()." ".$Cars->getLastname()."<br>");
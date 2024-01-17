<?php

class Cars extends Owner{
    
    private $type;
    private $brand;
    private $model;
    private $color;
    private $motorisation;
    private $power;
    private $gear;
    private $speed;
    private $is_started = 0;
    private $Speed = 0;
    
    public function __construct($firstname, $lastname, $type, $brand, $model, $color, $motorisation, $power, $gear, $speed) {
        parent::__construct($firstname, $lastname);
        $this->type = $type;
        $this->brand = $brand;
        $this->model = $model;
        $this->color = $color;
        $this->motorisation = $motorisation;
        $this->power = $power;
        $this->gear = $gear;
        $this->speed = $speed;
    }
    
    public function started(){
        if($this->is_started == 0){
            $this->is_started = 1;
            return "Starting ".$this->brand." ".$this->model;
        }else{
            return "The engine is already running";
        }
    }
    
    public function stopped() {
        if($this->is_started == 1){
            $this->is_started = 0;
            $this->Speed = 0;
            return "Stopping ".$this->brand." ".$this->model;
        }else{
            return "The engine is already stopped";
        }
    }
    
    public function driveUp() {
        if($this->is_started == 1){
            if($this->Speed <= $this->speed){
                $this->Speed = $this->Speed + 1;
                return "Speed ".$this->Speed." has been passed";
            } else{
                return "The car has only ".$this->speed." gears";
            }
        } else {
            return "The engine must be on to shift into gear";
        }
    }
    
    public function driveDown() {
        if($this->is_started == 1){
            if($this->Speed > 0){
                $this->Speed = $this->Speed - 1;
                return "Speed has been downgraded (".$this->Speed.")";
            } else{
                return "The car has only ".$this->speed." gears";
            }
        } else {
            return "The engine must be on to shift into gear";
        }
    }
    
    public function setReverse() {
        if($this->is_started == 1){
            if($this->Speed == 0){
                $this->Speed = $this->Speed - 1;
                return "The reverse gear has been put.";
            } else{
                return "You will break your clutch";
            }
        } else {
            return "The engine must be on to shift into gear";
        }
    }
    
    public function setNeutral(){
        if($this->Speed > 0){
            $this->Speed = 0;
            return "Neutral has been set";
        } else{
            return "You are already at a standstill";
        }
    }
    
}
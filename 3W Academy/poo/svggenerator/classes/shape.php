<?php

abstract class Shape {

	protected $x, $y, $fill, $opacity;
    
     public function __construct($x, $y, $fill, $opacity)
	{
    	$this->x = $x;
		$this->y = $y;
        $this->fill = $fill;
		$this->opacity = $opacity;
    }
	
	public function getPositionX(){ return $this->x; }
	public function getPositionY(){ return $this->y; }
	public function getFill(){ return $this->fill; }
	public function getOpacity(){ return $this->opacity; }

}

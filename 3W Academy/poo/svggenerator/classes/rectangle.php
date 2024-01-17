<?php
class Rectangle extends Shape {

	private $width, $height;
	
    public function __construct($x, $y, $width, $height, $fill, $opacity)
	{
    	parent::__construct($x, $y, $fill, $opacity);
   	    $this->width = $width;
		$this->height = $height ;
  
	}

	public function getHeight() { return $this->height; }
	public function getWidth() { return $this->width; }

}
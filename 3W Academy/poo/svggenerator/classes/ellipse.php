<?php
class Ellipse extends Shape {

	private $rx, $ry;

    public function __construct($x, $y, $rx, $ry, $fill, $opacity)
	{
    	parent::__construct($x, $y, $fill, $opacity);
   	    $this->rx = $rx;
     	$this->ry = $ry;

	}
	
	public function getRayonX() { return  $this->rx; }
	public function getRayonY() { return  $this->ry; }

}
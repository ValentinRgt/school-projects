<?php
class Polygone extends Shape {

	private $x2, $y2, $x3, $y3;

    public function __construct($x, $y, $x2, $y2, $x3, $y3, $fill, $opacity)
	{
    	parent::__construct($x, $y, $fill, $opacity);
   	    $this->x2 = $x2;
     	$this->y2 = $y2;
   	    $this->x3 = $x3;
     	$this->y3 = $y3;
	}
	
	public function getPolygoneX2() { return $this->x2; }
	public function getPolygoneY2() { return $this->y2; }
	public function getPolygoneX3() { return $this->x3; }
	public function getPolygoneY3() { return $this->y3; }


}
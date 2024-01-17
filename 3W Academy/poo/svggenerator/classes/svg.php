<?php

class SVG {
	private $width, $height, $rectangle, $carre, $cercle, $ellipse, $polygone, $shape = [];

    public function __construct($width, $height, Rectangle $rectangle, Carre $carre, Cercle $cercle, Ellipse $ellipse, Polygone $polygone) {
		$this->width = $width;
		$this->height = $height;
		$this->rectangle = $rectangle;
		$this->carre = $carre;
		$this->cercle = $cercle;
		$this->ellipse = $ellipse;
		$this->polygone = $polygone;
    }
    
    public function drawRectangle() {
    	return '<rect x="'.$this->rectangle->getPositionX().'" y="'.$this->rectangle->getPositionY().'" width="'.$this->rectangle->getWidth().'" height="'.$this->rectangle->getHeight().'" fill="'.$this->rectangle->getFill().'" opacity="'.$this->rectangle->getOpacity().'"></rect>';
	}
	
	public function drawCarre() {
    	return '<rect x="'.$this->carre->getPositionX().'" y="'.$this->carre->getPositionY().'" width="'.$this->carre->getWidth().'" height="'.$this->carre->getWidth().'" fill="'.$this->carre->getFill().'" opacity="'.$this->carre->getOpacity().'"></rect>';
	}
	
	public function drawCercle() {
		return '<circle cx="'.$this->cercle->getPositionX().'" cy="'.$this->cercle->getPositionY().'" r="'.$this->cercle->getRayon().'" fill="'.$this->cercle->getFill().'" opacity="'.$this->cercle->getOpacity().'"></circle>';
	}
	
	public function drawEllipse(){
		return '<ellipse cx="'.$this->ellipse->getPositionX().'" cy="'.$this->ellipse->getPositionY().'" rx="'.$this->ellipse->getRayonX().'" ry="'.$this->ellipse->getRayonY().'" fill="'.$this->ellipse->getFill().'" opacity="'.$this->ellipse->getOpacity().'"></ellipse>';
	}
	
 	public function drawPolygone(){
		return '<polygon points="'.$this->polygone->getPositionX().' '.$this->polygone->getPositionY().', '.$this->polygone->getPolygoneX2().' '.$this->polygone->getPolygoneY2().', '.$this->polygone->getPolygoneX3().' '.$this->polygone->getPolygoneY3().'" fill="'.$this->polygone->getFill().'" opacity="'.$this->polygone->getOpacity().'"></polygon>';
	}
	
	public function renderer(){
	    return '<svg width="'.$this->width.'" height="'.$this->height.'">'.self::drawRectangle().self::drawCarre().self::drawCercle().self::drawEllipse().self::drawPolygone().'</svg>';
	}
   

}

?>
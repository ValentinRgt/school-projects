<?php

require "classes/svg.php";
require "classes/shape.php";
require "classes/rectangle.php";
require "classes/carre.php";
require "classes/cercle.php";
require "classes/ellipse.php";
require "classes/polygone.php";

if(!empty($_POST)) {
    $rectangle = new Rectangle($_POST["rec_x"], $_POST["rec_y"], $_POST["rec_width"], $_POST["rec_height"], $_POST["rec_color"], $_POST["rec_opacity"]);
    $carre = new Carre($_POST["car_x"], $_POST["car_y"], $_POST["car_width"], $_POST["car_color"], $_POST["car_opacity"]);
    $cercle = new Cercle($_POST["cer_x"], $_POST["cer_y"], $_POST["cer_width"], $_POST["cer_color"], $_POST["cer_opacity"]);
    $ellipse = new Ellipse($_POST["ell_x"], $_POST["ell_y"], $_POST["ell_width"], $_POST["ell_height"], $_POST["ell_color"], $_POST["ell_opacity"]);
    $polygone = new Polygone($_POST["pol_x"], $_POST["pol_y"], $_POST["pol_x2"], $_POST["pol_y2"], $_POST["pol_x3"], $_POST["pol_y3"], $_POST["pol_color"], $_POST["pol_opacity"]);
    
    $svg = new SVG("500px", "500px", $rectangle, $carre, $cercle, $ellipse, $polygone);
    
    echo $svg->renderer();

} else {
    echo "<p style='color: red;text-align:center;padding-top:25px;padding-bottom:25px'>Please, complete the form to generate an image</p>";
}

?>

<!DOCTYPE html>
<html>
    
    <head>
        <title>SVG Generator</title>
    </head>
    <body>
        
        <form method="post">
            <div>
                <label for="rectangle">Rectangle</label>
                <input type="number" name="rec_x" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="rec_y" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="rec_width" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="rec_height" value="<?php echo rand(1,800); ?>"/>
                <input type="color" name="rec_color"/>
                <input type="number" name="rec_opacity" value="1"/>
            </div>
            
            <div>
                <label for="carre">Carré</label>
                <input type="number" name="car_x" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="car_y" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="car_width" value="<?php echo rand(1,800); ?>"/>
                <input type="color" name="car_color"/>
                <input type="number" name="car_opacity" value="0.5"/>
            </div>
            
            <div>
                <label for="cercle">Cercle</label>
                <input type="number" name="cer_x" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="cer_y" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="cer_width" value="<?php echo rand(1,800); ?>"/>
                <input type="color" name="cer_color"/>
                <input type="number" name="cer_opacity" value="0.3"/>
            </div>
            
            <div>
                <label for="ellipse">Ellipse</label>
                <input type="number" name="ell_x" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="ell_y" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="ell_width" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="ell_height" value="<?php echo rand(1,800); ?>"/>
                <input type="color" name="ell_color"/>
                <input type="number" name="ell_opacity" value="1"/>
            </div>
            
            <div>
                <label for="">Polygone</label>
                <input type="number" name="pol_x" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="pol_y" value="<?php echo rand(1,800); ?>"/>
                <input type="number" name="pol_x2" value="<?php echo rand(1,200); ?>"/>
                <input type="number" name="pol_y2" value="<?php echo rand(1,250); ?>"/>
                <input type="number" name="pol_x3" value="<?php echo rand(1,200); ?>"/>
                <input type="number" name="pol_y3" value="<?php echo rand(1,250); ?>"/>
                <input type="color" name="pol_color"/>
                <input type="number" name="pol_opacity" value="0.7"/>
            </div>
            
            <button type="submit">Soumettre</button>
        </form>
        
    </body>
    
</html>
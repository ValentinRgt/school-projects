<?php

// https://gitlab.com/valentinr_dev/nknetwork-website/-/blob/main/_inc/_class/class.database.php

namespace App\Managers;

use PDO;

class DBManager{

    private $pdo;

    public function __construct(){
        $this->pdo = new PDO("mysql:dbname=valentinragot_mvc;host=db.3wa.io;charset=UTF8", "valentinragot", "a8594768736c190ef49965ba6c93ec52");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    }
    
    public function query($query, $params = false){
        if($params){
            $req = $this->pdo->prepare($query);
            $req->execute($params);
        }else{
            $req = $this->pdo->query($query);
        }
        return $req;
    }

    public function lastInsertId(){
        return $this->pdo->lastInsertId();
    }

}

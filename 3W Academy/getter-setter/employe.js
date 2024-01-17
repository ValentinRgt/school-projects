import Personne from './personne.js';

class Employe extends Personne{
    constructor(p,a,v,s){
        super(p,a,v);
        this.salaire=s;
    }
    // getteur:
    get salaire_(){
        return this.salaire;
    }
    //setteur 
    set newSalaire(value){
        if(value>0){
            this.salaire=value;
        }else{
            console.log("Erreur :salaire<0");
        }
    }
    
    
    afficher(){
        return super.afficher()+" <br> salaire : "+this.salaire;
    }
}

export default Employe;

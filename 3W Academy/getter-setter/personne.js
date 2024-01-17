class Personne{
  constructor(p,a,v){
      this.prenom=p;
      this.annee=a;
      this.ville=v;
  } 
  age(){
      let date=new Date();
      return date.getFullYear()-this.annee;
  }
  
  afficher(){
      return "<br> Prenon :"+this.prenom+" <br>Age: "+this.age()+"<br> Ville: "+this.ville;
  }
}

export default Personne;
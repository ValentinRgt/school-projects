import Employe from './employe.js';
import Personne from './personne.js';

let E = new Employe("Clara", 1990, "Paris", 3000);

console.log("Salaire actuelle : " + E.salaire)

console.log("Mise à jour du salaire")

E.newSalaire = 3100

console.log("Nouveau salaire : " + E.salaire)
import Creature from "./creature.js";
import Orc from "./orque.js";
import Urukhai from "./urukhai.js";
import ChiefOrc from "./chiefOrc.js";

let Creature1 = new Creature("Zombies", 105, 0);
let Orc1 = new Orc("Bébé Orque", 56, 0);
let Urukhai1 = new Urukhai("Uruck", 0);
let ChiefOrc1 = new ChiefOrc("BigBoss", 30, 0);


Creature1.identity();
Creature1.saySomething("Hello everyone, I'm going to eat your brains!!!");

console.log("")

Orc1.scream("I AM A FISH !!! ");
Orc1.bite(Creature1);

console.log("")

Urukhai1.scream("I'M GOING TO KILL YOU !!!!!");
Urukhai1.kill(Creature1);

console.log("")

ChiefOrc1.isChief;
ChiefOrc1.giveOrder(Urukhai1, "I AM YOUR FATHER BOUAHAH !!!");
ChiefOrc1.identity();

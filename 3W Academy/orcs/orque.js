import Creature from "./creature.js";

class Orc extends Creature {
  constructor(name, age, strength) {
    super(name, age, strength);
  }

  scream(words) {
    console.info(this.name + ' = ' + words);
  }
  
  bite(someone) {
    if (!(someone instanceof Creature)) {
      throw new Error(`${someone} n'est pas un monstre`);
    }
  
    console.info(this.name + ' a mordu ' + someone.name);
  }
}

export default Orc
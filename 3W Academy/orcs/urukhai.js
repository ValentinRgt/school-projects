import Orc from "./orque.js";
import Creature from "./creature.js";

class Urukhai extends Orc {
  constructor(name, strength) {
    super(name, null, strength + 10);
  }

  kill(someone) {
    if (!(someone instanceof Creature)) {
      throw new Error(`${someone} n'est pas un monstre`);
    }
  
    console.error(this.name + ' a tuer ' + someone.name + '');
  }
}

export default Urukhai
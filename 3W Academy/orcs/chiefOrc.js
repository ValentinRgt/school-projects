import Orc from "./orque.js";
import Creature from "./creature.js";

class ChiefOrc extends Orc {
  constructor(name, age, strength) {
    super(name, age, strength + 2);
    this.isChief = true;
  }
  
  giveOrder(someone, message) {
    if (!(someone instanceof Creature)) {
      throw new Error("`someone` is not a Creature");
    }
  
    this.scream("HELLO, " + someone.name + "! " + message);
  }
  
  identity() {
    super.identity();
  }
}

export default ChiefOrc
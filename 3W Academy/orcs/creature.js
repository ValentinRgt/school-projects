class Creature {
  constructor(name, age, strength) {
    this.name = name;
    this.age = age;
    this.strength = strength;
  }
  
  saySomething(words) {
    console.info(this.name + " = " + words);
  }
  
  identity() {
    console.info(`NOM : ${this.name}`);
    console.info(`AGE : ${this.age}`);
    console.info(`STRENGTH : ${this.strength}`);
  }
}

export default Creature
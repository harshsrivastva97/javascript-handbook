import { Concept } from "../../types/concept";

export const classes: Concept = {
  id: 123,
  title: "Classes",
  content: {
    explanation: `<p>JavaScript classes provide a cleaner syntax for object-oriented programming, introduced in ES6. They are primarily syntactic sugar over the prototype-based inheritance.</p>

<h3>Class Features:</h3>
<ul>
  <li>Constructor Method</li>
  <li>Instance & Static Methods</li>
  <li>Private Fields & Methods</li>
  <li>Inheritance & Super Calls</li>
</ul>`,
    codeExample: `// Class Declaration
class Animal {
  // Private field
  #age;

  constructor(name) {
    this.name = name;
    this.#age = 0;
  }

  // Instance method
  speak() {
    return \`\${this.name} makes a sound\`;
  }

  // Getter
  get age() {
    return this.#age;
  }

  // Static method
  static isAnimal(obj) {
    return obj instanceof Animal;
  }
}

// Inheritance
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return \`\${this.name} barks\`;
  }
}

// Usage
const dog = new Dog('Rex', 'German Shepherd');
console.log(dog.speak()); // "Rex barks"
console.log(Dog.isAnimal(dog)); // true

// Private methods (newer syntax)
class Example {
  #privateMethod() {
    return 'private';
  }

  publicMethod() {
    return this.#privateMethod();
  }
}`,
    keyPoints: [
      "Classes are templates for creating objects",
      "Support inheritance via extends keyword",
      "Private fields start with # symbol",
      "Constructor initializes new instances",
      "Static methods belong to class itself",
      "Getters/setters control property access"
    ],
  },
}; 
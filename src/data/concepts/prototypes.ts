import { ConceptContent } from "../../constants/types/concept";

export const prototypes: ConceptContent = {
  explanation: `<p>JavaScript uses prototypal inheritance, which allows objects to inherit properties and methods from other objects through a prototype chain.</p>

<h3>Key Concepts:</h3>
<ul>
<li><strong>Prototype Chain:</strong> Objects can inherit from other objects, forming a chain of inheritance</li>
<li><strong>__proto__:</strong> Reference to the object's prototype (deprecated but helps understand the concept)</li>
<li><strong>Object.create():</strong> Creates new object with specified prototype</li>
</ul>

<h3>Ways to Implement Inheritance:</h3>
<ol>
<li><strong>Constructor Functions:</strong> Traditional way using new keyword</li>
<li><strong>Class Syntax:</strong> Modern way using ES6 classes (syntactic sugar)</li>
<li><strong>Object.create():</strong> Direct prototypal inheritance</li>
</ol>

<h3>Benefits:</h3>
<ul>
<li>Memory efficient - shared methods through prototype</li>
<li>Dynamic - properties/methods can be added to all instances</li>
<li>Flexible - multiple inheritance patterns possible</li>
</ul>`,
  codeExample: `// Constructor Function
function Animal(name) {
this.name = name;
}

Animal.prototype.speak = function() {
return \`\${this.name} makes a sound\`;
};

// Class Syntax
class Dog extends Animal {
constructor(name) {
  super(name);
}

speak() {
  return \`\${this.name} barks\`;
}
}

// Object.create()
const cat = Object.create(Animal.prototype);
cat.name = 'Whiskers';`,
  keyPoints: [
    "JavaScript uses prototypal inheritance instead of classical inheritance",
    "Every object has a prototype except the base Object.prototype",
    "ES6 classes are syntactic sugar over prototypal inheritance",
    "Prototype chain affects performance - keep it shallow",
  ]
};

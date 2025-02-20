import { ConceptContent } from "../../utils/types/concept";

export const objects: ConceptContent = {
  explanation: `<p>Objects are collections of key-value pairs and form the foundation of JavaScript. They allow you to store related data and functionality together.</p>

<h3>Key Concepts:</h3>
<ul>
  <li>Object Properties and Methods</li>
  <li>Object Creation Patterns</li>
  <li>Property Descriptors</li>
  <li>Object Destructuring</li>
</ul>`,
  codeExample: `// Object Creation
const person = {
  name: 'John',
  age: 30,
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
};

// Object Destructuring
const { name, age } = person;

// Spread Operator
const enhanced = { ...person, country: 'USA' };

// Object Methods
Object.keys(person);
Object.values(person);
Object.entries(person);

// Property Descriptors
Object.defineProperty(person, 'id', {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false
});`,
  keyPoints: [
    "Objects store properties and methods",
    "Properties can be accessed using dot or bracket notation",
    "Objects are reference types",
    "Support destructuring and spread operator",
    "Properties can be configured using descriptors"
  ]
}; 
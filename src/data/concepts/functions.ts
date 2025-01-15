import { ConceptContent } from "../../types/concept";

export const functions: ConceptContent = {
    explanation: `<p>Functions are one of the fundamental building blocks in JavaScript. A function is a reusable block of code that performs a specific task.</p>

<h3>Types of Functions:</h3>
<ul>
  <li>Function Declarations</li>
  <li>Function Expressions</li>
  <li>Arrow Functions</li>
  <li>IIFE (Immediately Invoked Function Expression)</li>
</ul>`,
    codeExample: `// Function Declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function Expression
const sayHello = function(name) {
  return \`Hello, \${name}!\`;
};

// Arrow Function
const greetPerson = (name) => \`Hello, \${name}!\`;

// IIFE
(function() {
  console.log('I run immediately!');
})();

// Function with default parameters
const greetWithDefault = (name = 'Guest') => \`Hello, \${name}!\`;

// Rest parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);`,
    keyPoints: [
        "Functions are first-class citizens in JavaScript",
        "Can be assigned to variables and passed as arguments",
        "Support default parameters and rest parameters",
        "Arrow functions have lexical this binding",
        "Functions create their own scope"
    ]
}; 
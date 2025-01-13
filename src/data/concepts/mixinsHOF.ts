import { Concept } from "../../types/concept";

export const mixinsHOF: Concept = {
  id: 112,
  title: "Mixins & Higher-Order Functions",
  content: {
    explanation: `<p>Mixins and Higher-Order Functions are advanced patterns in JavaScript that enable code reuse and functional programming paradigms.</p>

<h3>Key Concepts:</h3>
<ul>
  <li>Mixins: Objects with methods that can be added to other objects</li>
  <li>Higher-Order Functions: Functions that take or return other functions</li>
  <li>Function Composition: Building complex functions from simple ones</li>
  <li>Functional Programming Patterns</li>
</ul>`,
    codeExample: `// Mixin Example
const speakerMixin = {
  speak(phrase) {
    console.log(\`\${this.name} says: \${phrase}\`);
  }
};

const walkerMixin = {
  walk(distance) {
    console.log(\`\${this.name} walked \${distance}m\`);
  }
};

class Person {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(Person.prototype, speakerMixin, walkerMixin);

// Higher-Order Functions
const withLogging = (fn) => {
  return (...args) => {
    console.log(\`Calling with args: \${args}\`);
    const result = fn(...args);
    console.log(\`Result: \${result}\`);
    return result;
  };
};

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);

// Function Composition
const compose = (...fns) => x => 
  fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = x => x + 1;
const double = x => x * 2;
const addOneAndDouble = compose(double, addOne);`,
    keyPoints: [
      "Mixins provide multiple inheritance-like behavior",
      "Higher-order functions enable function composition",
      "Useful for cross-cutting concerns like logging",
      "Enables functional programming patterns",
      "Promotes code reuse and modularity",
      "Common in React and other frameworks"
    ],
  },
}; 
import { Concept } from "../../types/concept";

export const typeCoercion: Concept = {
  id: 116,
  title: "Type Coercion",
  content: {
    explanation: `<p>Type Coercion is JavaScript's automatic conversion of values from one type to another. Understanding coercion is crucial for avoiding unexpected behavior.</p>

<h3>Types of Coercion:</h3>
<ul>
  <li>Implicit Coercion: Automatic type conversion</li>
  <li>Explicit Coercion: Manual type conversion</li>
  <li>Truthy/Falsy Values</li>
  <li>Comparison Operators</li>
</ul>`,
    codeExample: `// String Coercion
console.log(1 + '2');     // '12' (number to string)
console.log('3' + 4);     // '34' (number to string)
console.log(1 + 2 + '3'); // '33' (left to right)

// Boolean Coercion
console.log(!!'');        // false
console.log(!!0);         // false
console.log(!!'0');       // true
console.log(!!{});        // true
console.log(!![]);        // true

// Number Coercion
console.log(+'42');       // 42 (string to number)
console.log(Number('42')); // 42 (explicit conversion)
console.log(parseInt('42.9')); // 42
console.log(parseFloat('42.9')); // 42.9

// Equality Comparisons
console.log(5 == '5');    // true (loose equality)
console.log(5 === '5');   // false (strict equality)
console.log([] == false); // true
console.log([1] == true); // true

// Common Gotchas
console.log([] + {});     // "[object Object]"
console.log({} + []);     // 0 (in some browsers)
console.log([] + []);     // "" (empty string)
console.log(true + true); // 2`,
    keyPoints: [
      "Always use === for strict equality comparison",
      "String concatenation takes precedence with +",
      "Objects are converted to primitives when needed",
      "Boolean coercion follows truthy/falsy rules",
      "Number coercion can be explicit or implicit",
      "Understanding coercion prevents bugs"
    ],
  },
}; 
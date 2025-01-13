import { Concept } from "../../types/concept";

export const operators: Concept = {
  id: 117,
  title: "Operators",
  content: {
    explanation: `<p>JavaScript provides various operators for working with values, including modern operators like spread/rest, nullish coalescing, and optional chaining.</p>

<h3>Modern Operators:</h3>
<ul>
  <li>Spread/Rest: Expand or collect elements</li>
  <li>Nullish Coalescing: Handle null/undefined</li>
  <li>Optional Chaining: Safe property access</li>
  <li>Logical Assignment: Combine logical ops with assignment</li>
</ul>`,
    codeExample: `// Spread Operator
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];  // [1, 2, 3, 4, 5]
const obj = { name: 'John' };
const newObj = { ...obj, age: 30 };  // { name: 'John', age: 30 }

// Rest Parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4));  // 10

// Nullish Coalescing
const value = null;
const defaultValue = value ?? 'default';  // 'default'
const zero = 0 ?? 42;  // 0 (preserves falsy values except null/undefined)

// Optional Chaining
const user = {
  details: {
    address: null
  }
};
const street = user?.details?.address?.street;  // undefined (no error)

// Logical Assignment
let x = null;
x ??= 42;  // x = 42 (nullish coalescing assignment)
let y = 0;
y ||= 42;  // y = 42 (logical OR assignment)
let z = 1;
z &&= 42;  // z = 42 (logical AND assignment)`,
    keyPoints: [
      "Spread operator works with arrays and objects",
      "Rest parameters collect multiple arguments",
      "Nullish coalescing handles null/undefined specifically",
      "Optional chaining prevents null reference errors",
      "Logical assignment combines operators with assignment",
      "Modern operators improve code readability"
    ],
  },
}; 
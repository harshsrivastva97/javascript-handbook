import { ConceptContent } from "../../utils/types/concept";

export const arrays: ConceptContent = {
    explanation: `<p>Arrays in JavaScript are ordered collections of values that can store elements of any type. They provide numerous built-in methods for data manipulation.</p>

<h3>Key Concepts:</h3>
<ul>
  <li>Array Creation and Manipulation</li>
  <li>Array Methods (map, filter, reduce, etc.)</li>
  <li>Array Destructuring</li>
  <li>Iterating Over Arrays</li>
</ul>`,
    codeExample: `// Array Creation
const arr = [1, 2, 3];
const newArr = new Array(4, 5, 6);

// Array Methods
const mapped = arr.map(x => x * 2);        // [2, 4, 6]
const filtered = arr.filter(x => x > 1);    // [2, 3]
const sum = arr.reduce((a, b) => a + b, 0); // 6

// Array Destructuring
const [first, second, ...rest] = arr;

// Modern Array Methods
const found = arr.find(x => x > 2);        // 3
const includes = arr.includes(2);           // true
const some = arr.some(x => x > 2);         // true
const every = arr.every(x => x > 0);       // true

// Array Manipulation
arr.push(4);           // Add to end
arr.unshift(0);        // Add to start
const last = arr.pop();     // Remove from end
const first = arr.shift();  // Remove from start
arr.splice(1, 2);      // Remove elements`,
    keyPoints: [
        "Arrays are ordered collections of values",
        "Array methods can be chained",
        "Many methods return new arrays (immutable)",
        "Some methods modify the original array (mutable)",
        "Arrays have dynamic length",
        "Support various iteration methods"
    ]
}; 
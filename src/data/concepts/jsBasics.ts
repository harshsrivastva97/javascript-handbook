import { Concept } from '../../types/concept';

export const jsBasics: Concept = {
  id: 15,
  title: 'JavaScript Basics',
  content: {
    explanation: `<p>JavaScript is a dynamic, interpreted programming language that powers web interactivity. Understanding its fundamentals is crucial for web development.</p>

<strong>Data Types:</strong>
<ul>
  <li><strong>Primitive Types:</strong>
    <ul>
      <li>Number: Both integer and floating-point</li>
      <li>String: Text data in single or double quotes</li>
      <li>Boolean: true or false</li>
      <li>undefined: Variable declared but not assigned</li>
      <li>null: Intentional absence of value</li>
      <li>Symbol: Unique identifier</li>
      <li>BigInt: Large integers</li>
    </ul>
  </li>
  <li><strong>Reference Types:</strong>
    <ul>
      <li>Object: Collection of key-value pairs</li>
      <li>Array: Ordered list of values</li>
      <li>Function: Reusable code block</li>
    </ul>
  </li>
</ul>

<strong>JavaScript Engine:</strong>
<ul>
  <li><strong>Components:</strong>
    <ul>
      <li>Memory Heap: Memory allocation</li>
      <li>Call Stack: Code execution tracking</li>
      <li>Event Loop: Handles async operations</li>
      <li>Callback Queue: Manages callbacks</li>
    </ul>
  </li>
</ul>`,
    codeExample: `// Primitive types
let num = 42;           // Number
let str = "Hello";      // String
let bool = true;        // Boolean
let undef = undefined;  // undefined
let empty = null;       // null
let sym = Symbol();     // Symbol
let bigInt = 9007199254740991n; // BigInt

// Reference types
let obj = { name: "John" };  // Object
let arr = [1, 2, 3];        // Array
function fn() {             // Function
  return "Hello World";
}

// Type checking
console.log(typeof num);    // "number"
console.log(typeof obj);    // "object"
console.log(Array.isArray(arr)); // true`,
    keyPoints: [
      'JavaScript has 7 primitive and 3 reference types',
      'Primitive types are immutable and stored by value',
      'Reference types are mutable and stored by reference',
      'JS Engine includes Memory Heap, Call Stack, and Event Loop',
      'typeof operator helps identify data types',
      'Understanding types prevents common bugs',
      'JS is dynamically typed but type-aware'
    ],
  },
}; 
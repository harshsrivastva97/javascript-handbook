import { ConceptContent } from "../../utils/types/concept";

export const jsBasics: ConceptContent = {
  explanation: `<p>JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. Understanding its fundamentals is crucial for web development.</p>

<h3>Core Concepts:</h3>
<ul>
  <li>Data Types: Primitive (string, number, boolean, null, undefined, symbol, bigint) and Reference types (object, array, function)</li>
  <li>JavaScript Engine: V8 (Chrome), SpiderMonkey (Firefox), etc.</li>
  <li>Memory Management: Stack and Heap</li>
  <li>Execution Context and Call Stack</li>
</ul>`,
  codeExample: `// Primitive Data Types
let string = "Hello";
let number = 42;
let boolean = true;
let nullValue = null;
let undefinedValue;
let symbol = Symbol("description");
let bigInt = 9007199254740991n;

// Reference Types
let object = { key: "value" };
let array = [1, 2, 3];
let function = () => {};

// Type Checking
console.log(typeof string);      // "string"
console.log(typeof number);      // "number"
console.log(typeof boolean);     // "boolean"
console.log(typeof nullValue);   // "object" (known JS quirk)
console.log(typeof undefined);   // "undefined"
console.log(typeof symbol);      // "symbol"
console.log(typeof bigInt);      // "bigint"`,
  keyPoints: [
    "JavaScript is dynamically typed",
    "Has both primitive and reference types",
    "Runs in various environments (browser, Node.js)",
    "Uses JIT (Just-In-Time) compilation",
    "Single-threaded with event loop",
    "Supports both OOP and functional programming paradigms"
  ]
};

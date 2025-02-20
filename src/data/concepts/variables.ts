import { ConceptContent } from "../../utils/types/concept";

export const variables: ConceptContent = {
  explanation: `<p>JavaScript provides three ways to declare variables, each with distinct characteristics and use cases.</p>

<strong>var:</strong>
<ul>
  <li>Function-scoped or globally-scoped</li>
  <li>Can be redeclared and updated</li>
  <li>Hoisted with initial value undefined</li>
  <li>Not block-scoped</li>
</ul>

<strong>let:</strong>
<ul>
  <li>Block-scoped</li>
  <li>Can be updated but not redeclared in same scope</li>
  <li>Hoisted but not initialized (TDZ)</li>
  <li>Introduced in ES6</li>
</ul>

<strong>const:</strong>
<ul>
  <li>Block-scoped</li>
  <li>Cannot be updated or redeclared</li>
  <li>Must be initialized at declaration</li>
  <li>Objects and arrays are still mutable</li>
</ul>`,
  codeExample: `// var example
var x = 1;
if (true) {
    var x = 2;  // same variable
}
console.log(x);  // 2

// let example
let y = 1;
if (true) {
    let y = 2;  // different variable
    console.log(y);  // 2
}
console.log(y);  // 1

// const example
const obj = { count: 0 };
obj.count = 1;  // OK - object is mutable
console.log(obj.count);  // 1

// This will throw error:
// obj = { count: 2 };  // Error - reassignment not allowed`,
  keyPoints: [
    "Use const by default for better code stability",
    "Use let when variable needs to be reassigned",
    "Avoid var in modern JavaScript",
    "Block scope provides better encapsulation",
    "const prevents reassignment but not mutation",
    "Temporal Dead Zone affects let and const",
    "Understanding scope prevents unexpected behavior",
  ]
};

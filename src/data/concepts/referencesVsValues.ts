import { ConceptContent } from "../../types/concept";

export const referencesVsValues: ConceptContent = {
    explanation: `<p>Understanding how JavaScript handles primitive and reference types is crucial for writing bug-free code. Primitive types are passed by value, while objects are passed by reference.</p>

<h3>Key Differences:</h3>
<ul>
  <li>Primitive values are immutable and copied by value</li>
  <li>Reference types are mutable and copied by reference</li>
  <li>Comparison behavior differs between types</li>
  <li>Memory allocation differs for each type</li>
</ul>`,
    codeExample: `// Primitive Types (Pass by Value)
let a = 5;
let b = a;  // Copy of value
b = 10;
console.log(a);  // Still 5
console.log(b);  // 10

// Reference Types (Pass by Reference)
let obj1 = { name: 'John' };
let obj2 = obj1;  // Reference to same object
obj2.name = 'Jane';
console.log(obj1.name);  // 'Jane'
console.log(obj2.name);  // 'Jane'

// Copying Objects
// Shallow copy
const shallow = { ...obj1 };
const shallow2 = Object.assign({}, obj1);

// Deep copy
const deep = JSON.parse(JSON.stringify(obj1));

// Comparison
console.log(5 === 5);              // true
console.log({} === {});            // false
console.log(obj1 === obj2);        // true
console.log(shallow === obj1);     // false`,
    keyPoints: [
        "Primitive types: number, string, boolean, null, undefined, symbol",
        "Reference types: object, array, function",
        "Primitives are compared by value",
        "Objects are compared by reference",
        "Object copying requires special handling",
        "Understanding this prevents common bugs"
    ]
}; 
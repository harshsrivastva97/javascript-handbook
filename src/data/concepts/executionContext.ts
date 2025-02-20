import { ConceptContent } from "../../utils/types/concept";

export const executionContext: ConceptContent = {
  explanation: `<p>The Execution Context and Call Stack are fundamental concepts in JavaScript that manage code execution and scope.</p>

<h3>Key Components:</h3>
<ul>
  <li>Variable Environment: Variables, functions, and arguments</li>
  <li>Scope Chain: Access to outer variables</li>
  <li>this Binding: Value of 'this' keyword</li>
  <li>Call Stack: Tracks execution contexts</li>
</ul>`,
  codeExample: `// Global Execution Context
let globalVar = 'I am global';

function outer() {
  let outerVar = 'I am from outer';
  
  function inner() {
    let innerVar = 'I am from inner';
    console.log(innerVar);    // Local scope
    console.log(outerVar);    // From outer scope
    console.log(globalVar);   // From global scope
  }
  
  inner(); // New execution context created
}

outer(); // New execution context created

// Call Stack Example
function first() {
  console.log('Running first');
  second();
  console.log('Finished first');
}

function second() {
  console.log('Running second');
  third();
  console.log('Finished second');
}

function third() {
  console.log('Running third');
  console.log('Finished third');
}

// Call Stack: [first] -> [first, second] -> [first, second, third]
//         -> [first, second] -> [first] -> []
first();`,
  keyPoints: [
    "Every function call creates a new execution context",
    "Global execution context is created first",
    "Call stack follows LIFO (Last In, First Out)",
    "Each context has its own variable environment",
    "Contexts have access to outer scope variables",
    "Stack overflow occurs when call stack exceeds limit"
  ]
};

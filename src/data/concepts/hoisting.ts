import { ConceptContent } from "../../types/concept";

export const hoisting: ConceptContent = {
  explanation: `<p>Hoisting is JavaScript's default behavior of moving declarations to the top of the scope during the compilation phase.</p>

<h3>Key Points:</h3>
<ol>
<li><strong>Variables declared with var:</strong> Hoisted but initialized as undefined.</li>
<li><strong>Let and const variables:</strong> Hoisted but not initialized (in the Temporal Dead Zone).</li>
<li><strong>Function declarations:</strong> Fully hoisted, allowing usage before their declaration.</li>
</ol>`,
  codeExample: `console.log(myVar); // undefined
var myVar = 'Hoisted';

console.log(myFunc()); // Works
function myFunc() {
return 'Hoisted function';
}`,
  keyPoints: [
    "Function declarations are fully hoisted.",
    "Variables declared with var are partially hoisted.",
    "Let and const declarations are hoisted but inaccessible before initialization.",
  ]
};

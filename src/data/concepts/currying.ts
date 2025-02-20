import { ConceptContent } from "../../utils/types/concept";

export const currying: ConceptContent = {
  explanation: `<p>Currying is a functional programming technique where a function with multiple arguments is transformed into a series of functions, each accepting a single argument.</p>

<h3>Why Use Currying?</h3>
<ul>
<li>Allows partial application of functions.</li>
<li>Improves code readability and reusability.</li>
<li>Enables creating specialized versions of a function.</li>
</ul>

<h3>Visual Representation:</h3>
<p><code>f(a, b, c) -> f(a)(b)(c)</code></p>`,
  codeExample: `function add(a) {
return function (b) {
  return function (c) {
    return a + b + c;
  };
};
}

const result = add(2)(3)(4);
console.log(result); // 9`,
  keyPoints: [
    "Transforms a function with multiple arguments into nested functions.",
    "Each nested function accepts one argument.",
    "Useful for creating partially applied functions and improving reusability.",
  ]
};

import { Concept } from "../../types/concept";

export const eventPropagation: Concept = {
  id: 14,
  title: "Event Propagation",
  content: {
    explanation: `<p>Event propagation describes how events travel through the DOM tree, affecting how event handlers are triggered on nested elements.</p>

<h3>Phases of Event Propagation:</h3>
<ol>
<li><strong>Capturing Phase:</strong>
  <ul>
    <li>Event travels down from Window → target element</li>
    <li>Rarely used but useful for certain scenarios</li>
    <li>Captured using addEventListener's third parameter</li>
  </ul>
</li>
<li><strong>Target Phase:</strong>
  <ul>
    <li>Event reaches the target element</li>
    <li>Handlers on the target element are executed</li>
  </ul>
</li>
<li><strong>Bubbling Phase:</strong>
  <ul>
    <li>Event bubbles up from target → Window</li>
    <li>Most commonly used phase</li>
    <li>Can be stopped using stopPropagation()</li>
  </ul>
</li>
</ol>

<h3>Event Delegation:</h3>
<p>Pattern that uses event bubbling to handle events on multiple elements with a single handler on their parent.</p>

<h3>Visual Representation:</h3>
<pre>
Window
  ↓↑
Document
  ↓↑
html
  ↓↑
body
  ↓↑
parent
  ↓↑
target
</pre>`,
    codeExample: `// Event Propagation Example
document.querySelector('#parent').addEventListener('click', e => {
console.log('Parent Clicked - Capturing', e.target);
}, true); // Capturing phase

document.querySelector('#child').addEventListener('click', e => {
console.log('Child Clicked - Bubbling');
// e.stopPropagation(); // Stops bubbling
});

// Event Delegation Example
document.querySelector('#list').addEventListener('click', e => {
if (e.target.matches('li')) {
  console.log('List item clicked:', e.target.textContent);
}
});`,
    keyPoints: [
      "Events propagate in three phases: capturing, target, and bubbling",
      "Event delegation improves performance with many similar elements",
      "stopPropagation() prevents further propagation",
      "preventDefault() stops default browser behavior",
    ],
  },
};

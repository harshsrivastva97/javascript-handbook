import { ConceptContent } from "../../types/concept";

export const memoryManagement: ConceptContent = {
  explanation: `<p>JavaScript manages memory automatically through garbage collection, which reclaims memory occupied by objects that are no longer in use. Understanding this process is crucial for writing efficient applications and preventing memory leaks.</p>

<h3>Memory Life Cycle:</h3>
<ol>
<li><strong>Allocation:</strong> Memory is allocated when objects are created</li>
<li><strong>Usage:</strong> Memory is used in read/write operations</li>
<li><strong>Release:</strong> Memory is freed when no longer needed</li>
</ol>

<h3>Garbage Collection Algorithms:</h3>
<ul>
<li><strong>Mark and Sweep:</strong> 
  <ul>
    <li>Marks objects that are still reachable from the root</li>
    <li>Sweeps (removes) unmarked objects</li>
    <li>Main algorithm used in modern browsers</li>
  </ul>
</li>
<li><strong>Reference Counting:</strong>
  <ul>
    <li>Counts references to each object</li>
    <li>Removes objects with zero references</li>
    <li>Problematic with circular references</li>
  </ul>
</li>
</ul>

<h3>Common Memory Leaks:</h3>
<ol>
<li><strong>Global Variables:</strong> Accidentally creating globals</li>
<li><strong>Event Listeners:</strong> Not removing unused listeners</li>
<li><strong>Closures:</strong> Holding references to large objects</li>
<li><strong>Detached DOM:</strong> Keeping references to removed DOM elements</li>
<li><strong>Circular References:</strong> Objects referencing each other</li>
</ol>

<h3>Best Practices:</h3>
<ul>
<li>Clean up event listeners when components unmount</li>
<li>Avoid storing DOM elements in global variables</li>
<li>Be cautious with closures holding large data</li>
<li>Use Chrome DevTools Memory panel for debugging</li>
<li>Implement proper cleanup functions for resources</li>
</ul>`,
  codeExample: `// Memory Leak Example
function createMemoryLeak() {
let count = 0;
const buttons = [];

// Memory leak: event listener keeps reference to count
document.addEventListener('click', function() {
  count++;
  console.log(count);
});

// Creating detached DOM elements
for (let i = 0; i < 10000; i++) {
  const button = document.createElement('button');
  button.data = new Array(10000).join('*');
  buttons.push(button);
}
}

// Fixed Version with Cleanup
function createWithCleanup() {
let count = 0;
const buttons = [];
const handleClick = () => {
  count++;
  console.log(count);
};

document.addEventListener('click', handleClick);

// Return cleanup function
return () => {
  document.removeEventListener('click', handleClick);
  buttons.length = 0; // Clear array
  count = null;
};
}

// Example of object eligible for garbage collection
let obj = { data: 'Some data' };
obj = null; // Original object becomes eligible for GC`,
  keyPoints: [
    "JavaScript uses automatic garbage collection to manage memory",
    "Memory leaks occur when references to unused objects persist",
    "Common causes: global variables, event listeners, and closures",
    "Use cleanup functions to prevent memory leaks",
    "Monitor memory usage with browser developer tools",
  ]
};

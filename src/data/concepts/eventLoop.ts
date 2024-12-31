import { Concept } from '../../types/concept';

export const eventLoop: Concept = {
  id: 9,
  title: 'Event Loop',
  content: {
    explanation: `<p>The Event Loop is a fundamental mechanism in JavaScript that enables asynchronous programming in a single-threaded environment. Think of it as a continuous loop that coordinates the execution of code.</p>

<div class="diagram">
<pre>
┌───────────────────────┐
│      Call Stack       │
└───────────┬───────────┘
            │
            │ 
            ▼
┌───────────────────────┐     ┌───────────────┐
│      Event Loop       │ ←── │  Web APIs     │
│                       │     │  • setTimeout  │
│    (continuously      │     │  • DOM Events │
│     checking)         │     │  • fetch      │
└───────────┬───────────┘     └───────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│            Queue System              │
│  ┌────────────────────────────────┐  │
│  │      Microtask Queue           │  │
│  │   (Promises, queueMicrotask)   │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │      Macrotask Queue           │  │
│  │  (setTimeout, DOM events)       │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
</pre>
</div>

<h3>Core Components:</h3>
<ol>
<li><strong>Call Stack:</strong> 
  <ul>
    <li>The place where JavaScript executes code line by line</li>
    <li>Handles all synchronous operations</li>
    <li>Works on one task at a time (single-threaded)</li>
  </ul>
</li>

<li><strong>Web APIs:</strong>
  <ul>
    <li>Provided by the browser (or Node.js in backend)</li>
    <li>Handles time-consuming operations like:</li>
    <li>- setTimeout/setInterval</li>
    <li>- DOM events</li>
    <li>- AJAX/fetch requests</li>
  </ul>
</li>

<li><strong>Callback Queues:</strong>
  <ul>
    <li><strong>Microtask Queue:</strong>
      <ul>
        <li>Highest priority</li>
        <li>Handles Promises and queueMicrotask</li>
        <li>Processes all microtasks before moving to macrotasks</li>
      </ul>
    </li>
    <li><strong>Macrotask Queue (Task Queue):</strong>
      <ul>
        <li>Lower priority</li>
        <li>Handles setTimeout, setInterval, DOM events</li>
        <li>Processes one task per event loop iteration</li>
      </ul>
    </li>
  </ul>
</li>
</ol>

<h3>Event Loop Process:</h3>
<div class="process-diagram">
<pre>
┌─────────────┐
│   Start     │
└──────┬──────┘
       ▼
┌──────────────────┐
│ Execute Call     │
│ Stack Code       │
└──────┬───────────┘
       ▼
┌──────────────────┐    ┌─────────────────┐
│ Check Microtask  │ ── ► Execute ALL     │
│ Queue            │    │ Microtasks      │
└──────┬───────────┘    └─────────────────┘
       ▼
┌──────────────────┐    ┌─────────────────┐
│ Check Macrotask  │ ── ► Execute ONE     │
│ Queue            │    │ Macrotask       │
└──────┬───────────┘    └─────────────────┘
       │
       └─────────► Repeat
</pre>
</div>

<p>This mechanism ensures that JavaScript can handle asynchronous operations efficiently without blocking the main thread, making it possible to create responsive web applications.</p>`,
    styles: `
.diagram, .process-diagram {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  overflow-x: auto;
}

.diagram pre, .process-diagram pre {
  font-family: monospace;
  white-space: pre;
  margin: 0;
  color: #333;
}
`,
    codeExample: `console.log('1: Script starts');

setTimeout(() => console.log('2: Timeout 1'), 0);
setTimeout(() => console.log('3: Timeout 2'), 0);

Promise.resolve()
  .then(() => console.log('4: Promise 1'))
  .then(() => console.log('5: Promise 2'));

console.log('6: Script ends');

// Output:
// 1: Script starts
// 6: Script ends
// 4: Promise 1
// 5: Promise 2
// 2: Timeout 1
// 3: Timeout 2`,
    keyPoints: [
      'The Event Loop enables JavaScript to handle asynchronous operations in a single-threaded environment',
      'Microtasks (Promises) always execute before macrotasks (setTimeout, events)',
      'Web APIs handle time-consuming operations outside the main thread',
      'Understanding the Event Loop is crucial for handling asynchronous operations and avoiding blocking code',
      'The Event Loop ensures UI remains responsive while processing async tasks',
    ],
  },
};
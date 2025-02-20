import { ConceptContent } from "../../utils/types/concept";

export const timers: ConceptContent = {
  explanation: `<p>JavaScript provides timer functions for executing code after a delay or at intervals. Understanding timers is crucial for handling asynchronous operations and animations.</p>

<h3>Timer Functions:</h3>
<ul>
  <li>setTimeout: Execute code after delay</li>
  <li>setInterval: Execute code repeatedly</li>
  <li>clearTimeout: Cancel scheduled timeout</li>
  <li>clearInterval: Stop interval execution</li>
</ul>`,
  codeExample: `// setTimeout
const timeoutId = setTimeout(() => {
  console.log('Executed after 2 seconds');
}, 2000);

// Clear timeout if needed
clearTimeout(timeoutId);

// setInterval
const intervalId = setInterval(() => {
  console.log('Executes every second');
}, 1000);

// Clear interval after 5 seconds
setTimeout(() => {
  clearInterval(intervalId);
}, 5000);

// Nested setTimeout for variable intervals
function variableDelay() {
  const delay = Math.random() * 1000;
  setTimeout(() => {
    console.log(\`Executed after \${delay}ms\`);
    variableDelay();  // Schedule next execution
  }, delay);
}

// Debouncing with setTimeout
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Usage with requestAnimationFrame
function animate() {
  // Update animation
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);`,
  keyPoints: [
    "Timers are asynchronous functions",
    "setTimeout executes once after delay",
    "setInterval executes repeatedly",
    "Always clear timers when not needed",
    "Timers are not guaranteed to be precise",
    "requestAnimationFrame for smooth animations"
  ]
}; 
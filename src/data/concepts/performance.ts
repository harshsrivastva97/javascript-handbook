import { ConceptContent } from "../../types/concept";

export const performance: ConceptContent = {
    explanation: `<p>JavaScript performance optimization involves various techniques to improve code execution speed, memory usage, and overall application responsiveness.</p>

<h3>Optimization Areas:</h3>
<ul>
  <li>Code Optimization</li>
  <li>Memory Management</li>
  <li>Loading Performance</li>
  <li>Runtime Performance</li>
</ul>`,
    codeExample: `// Memoization
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

// Debouncing
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Virtual List
class VirtualList {
  constructor(items, containerHeight, itemHeight) {
    this.items = items;
    this.containerHeight = containerHeight;
    this.itemHeight = itemHeight;
    this.visibleItems = Math.ceil(containerHeight / itemHeight);
  }

  getVisibleRange(scrollTop) {
    const start = Math.floor(scrollTop / this.itemHeight);
    const end = start + this.visibleItems;
    return this.items.slice(start, end);
  }
}

// Web Workers
const worker = new Worker('worker.js');
worker.postMessage({ data: complexData });
worker.onmessage = (e) => {
  console.log('Processed:', e.data);
};`,
    keyPoints: [
        "Use memoization for expensive calculations",
        "Implement debouncing for frequent events",
        "Virtual lists for large data sets",
        "Web Workers for heavy computations",
        "Code splitting for better loading",
        "Optimize DOM operations"
    ]
}; 